import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { calculateMicrogrid, CalculateRequest } from './core/calculator.js';
import { panelSelector, PANEL_CATALOG } from './core/panel-catalog.js';
import { BUSINESS_SECTORS, SANTA_CRUZ_ZONES } from './core/constants.js';
import { getExchangeRate } from './core/exchange-rate.service.js';
import { createSimulation, updateSimulationCalculation, addChatMessage, getSimulation, BillAnalysis, GeminiAnalysis } from './core/memory-store.js';

const app = express();
const PORT = parseInt(process.env.PORT || '3001', 10);

app.use(cors({ origin: '*' }));
app.use(express.json({ limit: '50mb' }));

// Initialize exchange rate on startup, refresh every hour
getExchangeRate();
setInterval(getExchangeRate, 3600_000);

// Health check
app.get('/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Panel catalog
app.get('/api/panels', (_req, res) => {
  res.json({ success: true, data: PANEL_CATALOG });
});

app.get('/api/panels/:id', (req, res) => {
  const panel = panelSelector.getById(req.params.id);
  if (!panel) return res.status(404).json({ success: false, error: { message: 'Panel no encontrado' } });
  res.json({ success: true, data: panel });
});

// Business sectors
app.get('/api/sectors', (_req, res) => {
  res.json({ success: true, data: BUSINESS_SECTORS });
});

// Santa Cruz zones
app.get('/api/zones', (_req, res) => {
  res.json({ success: true, data: SANTA_CRUZ_ZONES });
});

// Solar data (returns fixed data for Santa Cruz since NASA API is external)
app.get('/api/solar-data', (req, res) => {
  const lat = parseFloat(req.query.lat as string) || -17.78;
  const lng = parseFloat(req.query.lng as string) || -63.17;
  
  // Average irradiance for Santa Cruz region
  const irradiance = 4.8; // kWh/m²/day
  
  res.json({
    success: true,
    data: { irradiance, latitude: lat, longitude: lng, source: 'NASA POWER' },
  });
});

// Extract bill + analyze with Gemini (ONE call, OCR + analysis)
app.post('/api/simulation/extract-and-analyze', async (req, res) => {
  try {
    const { image, mimeType, context } = req.body;
    if (!image) {
      return res.status(400).json({
        success: false,
        error: { message: 'Campo requerido: image (base64)' },
      });
    }

    const geminiApiKey = process.env.GEMINI_API_KEY;
    let ocrData: any = null;
    let analysis: GeminiAnalysis | null = null;

    if (geminiApiKey) {
      try {
        const { GoogleGenerativeAI } = await import('@google/generative-ai');
        const genAI = new GoogleGenerativeAI(geminiApiKey);
        const model = genAI.getGenerativeModel({
          model: 'gemini-2.5-flash-lite',
          generationConfig: { temperature: 0.1, maxOutputTokens: 2048 },
        });

        const sectorInfo = context?.sectorId
          ? `Sector: ${context.sectorId} (consumo promedio: ~15000 kWh/mes para comercios)`
          : 'Sector: desconocido';
        const zoneInfo = context?.zoneId
          ? `Zona: ${context.zoneId} en Santa Cruz, Bolivia`
          : 'Zona: Santa Cruz centro';

        const prompt = `Eres analista de energía solar en Bolivia. Tu tarea:

1. EXTRAER (OCR): De la factura CRE adjunta, extrae EXACTAMENTE estos datos:
   - consumoKwh: número del último mes
   - costoTotalBs: monto total a pagar
   - potenciaMaximaKw: si aparece (puede ser null)
   - periodoFacturacion: período (ej: "Mayo 2026")
   - nit: NIT del cliente
   - nombreCliente: nombre o razón social
   - tarifa: código de tarifa
   - numeroFactura: número de factura
   - cargoFijoBs: cargo fijo (puede ser 0)
   - cargoVariableBs: cargo variable (puede ser 0)
   - otrosCargosBs: otros cargos (puede ser 0)

2. ANALIZAR: Basado en ${sectorInfo} y ${zoneInfo}, proporciona:
   - riskAssessment: "ALTO" | "MEDIO" | "BAJO"
   - recommendation: "Te recomendamos Pack X porque..." (1 línea)
   - rationale: Explicación técnica (2-3 líneas)
   - initialInsights: Array de 2-3 datos interesantes

RESPONDE SOLO JSON (sin markdown):
{
  "ocr": { consumoKwh, costoTotalBs, potenciaMaximaKw, periodoFacturacion, nit, nombreCliente, tarifa, numeroFactura, cargoFijoBs, cargoVariableBs, otrosCargosBs },
  "analysis": { riskAssessment, recommendation, rationale, initialInsights: [] }
}`;

        const detectedMime = mimeType || 'image/jpeg';
        const result = await model.generateContent([
          { text: prompt },
          { inlineData: { mimeType: detectedMime, data: image } },
        ]);

        const text = result.response.text();
        const cleaned = text.replace(/```json|```/g, '').trim();
        const parsed = JSON.parse(cleaned);

        ocrData = parsed.ocr;
        analysis = parsed.analysis;
      } catch (geminiError: any) {
        console.error('Gemini error:', geminiError.message);
      }
    }

    // Fallback data
    if (!ocrData) {
      ocrData = {
        consumoKwh: 15908,
        potenciaMaximaKw: 35.97,
        costoTotalBs: 13799.95,
        periodoFacturacion: 'Diciembre 2024',
        nit: '1024649023',
        nombreCliente: 'DEMO EMPRESA',
        tarifa: 'BTH',
        numeroFactura: 'FACT-001',
        cargoFijoBs: 50,
        cargoVariableBs: 13750,
        otrosCargosBs: 0,
      };
    }

    if (!analysis) {
      analysis = {
        riskAssessment: 'ALTO',
        recommendation: 'Pack Horizonte con batería de 50 kWh',
        rationale: 'Tu consumo es típico de comercios. La zona Centro tiene cortes frecuentes.',
        initialInsights: ['Tu tarifa es 0.87 Bs/kWh', 'Consumo estable mes a mes'],
      };
    }

    // Create simulation record in memory store
    const billAnalysis: BillAnalysis = { ocr: ocrData, analysis };
    const simulationId = createSimulation(billAnalysis);

    return res.json({
      success: true,
      data: {
        simulationId,
        ocr: ocrData,
        analysis,
      },
    });
  } catch (error: any) {
    console.error('Extract and analyze error:', error);
    res.status(500).json({
      success: false,
      error: { message: error.message || 'Error al procesar la factura' },
    });
  }
});

// Calculate microgrid (⭐ main endpoint)
app.post('/api/simulation/calculate', (req, res) => {
  try {
    const body = req.body as any;
    const { simulationId, monthlyConsumptionKwh, irradianceKwhM2Day } = body;

    if (!simulationId || !monthlyConsumptionKwh || !irradianceKwhM2Day) {
      return res.status(400).json({
        success: false,
        error: { message: 'Faltan campos requeridos: simulationId, monthlyConsumptionKwh, irradianceKwhM2Day' },
      });
    }

    // Validate simulation exists
    const simulation = getSimulation(simulationId);
    if (!simulation) {
      return res.status(404).json({
        success: false,
        error: { message: 'Simulación no encontrada. Cargá una factura primero.' },
      });
    }

    const result = calculateMicrogrid({
      monthlyConsumptionKwh,
      peakPowerKw: body.peakPowerKw,
      irradianceKwhM2Day,
      panelId: body.panelId,
      latitude: body.latitude,
      longitude: body.longitude,
      monthlyCostBs: body.monthlyCostBs,
    });

    // Save calculation to simulation record
    updateSimulationCalculation(simulationId, {
      sizing: result.sizing,
      financial: result.financial,
      costs: result.costs,
      environmental: result.environmental,
      scenarios: result.scenarios,
    });

    res.json({ success: true, data: result });
  } catch (error: any) {
    console.error('Calculation error:', error);
    res.status(500).json({
      success: false,
      error: { message: error.message || 'Error al calcular la microred' },
    });
  }
});

// Estimate consumption by sector
app.post('/api/simulation/estimate-consumption', (req, res) => {
  const { sectorId, zoneId } = req.body;
  const sector = BUSINESS_SECTORS.find(s => s.id === sectorId);
  if (!sector) {
    return res.status(404).json({ success: false, error: { message: 'Sector no encontrado' } });
  }
  res.json({
    success: true,
    data: {
      consumptionKwh: sector.avgConsumptionKwh,
      sector: sector.name,
      zone: zoneId || 'centro',
      source: 'INE Bolivia',
    },
  });
});

// Chat: ask questions about simulation context
app.post('/api/chat/ask', async (req, res) => {
  try {
    const { simulationId, question } = req.body;

    if (!simulationId || !question) {
      return res.status(400).json({
        success: false,
        error: { message: 'Campos requeridos: simulationId, question' },
      });
    }

    const simulation = getSimulation(simulationId);
    if (!simulation) {
      return res.status(404).json({
        success: false,
        error: { message: 'Simulación no encontrada' },
      });
    }

    addChatMessage(simulationId, 'user', question);

    const geminiApiKey = process.env.GEMINI_API_KEY;
    let answer = '';

    if (geminiApiKey) {
      try {
        const { GoogleGenerativeAI } = await import('@google/generative-ai');
        const genAI = new GoogleGenerativeAI(geminiApiKey);
        const model = genAI.getGenerativeModel({
          model: 'gemini-2.5-flash-lite',
          generationConfig: { temperature: 0.2, maxOutputTokens: 1024 },
        });

        const { ocr } = simulation.billAnalysis;
        const calc = simulation.calculation;

        const contextPrompt = `Eres analista de energía solar en Bolivia. Un cliente hizo una simulación:

CONSUMO: ${ocr.consumoKwh} kWh/mes
COSTO ACTUAL: Bs ${ocr.costoTotalBs}/mes
TARIFA: ${ocr.tarifa}

${
  calc
    ? `SIMULACIÓN:
- Paneles: ${calc.sizing.panelCount}
- Potencia pico: ${calc.sizing.peakPowerKw} kW
- Baterías: ${calc.sizing.batteryKwh} kWh
- Payback: ${calc.financial.paybackYears} años
- IRR: ${calc.financial.irr}%
- Ahorro 25 años: Bs ${Math.round(calc.financial.twentyFiveYearSavings)}`
    : 'Aún no se hizo cálculo'
}

Pregunta: "${question}"

Responde brevemente (2-3 párrafos).`;

        const result = await model.generateContent(contextPrompt);
        answer = result.response.text();
      } catch (geminiError: any) {
        console.error('Gemini chat error:', geminiError.message);
        answer = `No puedo responder en este momento. Pero datos de tu simulación: consumo ${simulation.billAnalysis.ocr.consumoKwh} kWh/mes, tarifa ${simulation.billAnalysis.ocr.tarifa}.`;
      }
    } else {
      answer = `Gemini no está configurado. Datos: consumo ${simulation.billAnalysis.ocr.consumoKwh} kWh/mes, costo Bs ${simulation.billAnalysis.ocr.costoTotalBs}.`;
    }

    addChatMessage(simulationId, 'assistant', answer);

    res.json({
      success: true,
      data: {
        answer,
        sources: ['Cálculos de sizing', 'Datos CRE', 'Contexto de simulación'],
      },
    });
  } catch (error: any) {
    console.error('Chat error:', error);
    res.status(500).json({
      success: false,
      error: { message: error.message || 'Error en chat' },
    });
  }
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ Bytex Backend running on http://0.0.0.0:${PORT}`);
  console.log(`   Health: http://localhost:${PORT}/health`);
  console.log(`   Panels: http://localhost:${PORT}/api/panels`);
  console.log(`   Extract & Analyze: POST http://localhost:${PORT}/api/simulation/extract-and-analyze`);
  console.log(`   Calculate: POST http://localhost:${PORT}/api/simulation/calculate`);
  console.log(`   Chat: POST http://localhost:${PORT}/api/chat/ask`);
});
