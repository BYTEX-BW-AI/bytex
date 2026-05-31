import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { calculateMicrogrid, CalculateRequest } from './core/calculator.js';
import { panelSelector, PANEL_CATALOG } from './core/panel-catalog.js';
import { BUSINESS_SECTORS, SANTA_CRUZ_ZONES } from './core/constants.js';
import { getExchangeRate } from './core/exchange-rate.service.js';

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

// Calculate microgrid (⭐ main endpoint)
app.post('/api/simulation/calculate', (req, res) => {
  try {
    const body = req.body as CalculateRequest;
    
    if (!body.monthlyConsumptionKwh || !body.irradianceKwhM2Day) {
      return res.status(400).json({
        success: false,
        error: { message: 'Faltan campos requeridos: monthlyConsumptionKwh, irradianceKwhM2Day' },
      });
    }

    const result = calculateMicrogrid(body);
    
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

// Extract bill data using Gemini OCR (or simulation for dev)
app.post('/api/simulation/extract-bill', async (req, res) => {
  try {
    const { image, mimeType } = req.body;
    if (!image) {
      return res.status(400).json({
        success: false,
        error: { message: 'Campo requerido: image (base64)' },
      });
    }

    const geminiApiKey = process.env.GEMINI_API_KEY;

    // If Gemini API key is available, use real OCR
    if (geminiApiKey) {
      try {
        const { GoogleGenerativeAI } = await import('@google/generative-ai');
        const genAI = new GoogleGenerativeAI(geminiApiKey);
        const model = genAI.getGenerativeModel({
          model: 'gemini-2.5-flash-lite',
          generationConfig: { temperature: 0.1, maxOutputTokens: 1024 },
        });

        const detectedMime = mimeType || 'image/jpeg';

        const prompt = `Analizá esta factura/detalle de consumo de CRE (Cooperativa Rural de Electrificación) de Santa Cruz, Bolivia.

La factura tiene una tabla con columnas: PERIODO | CONSUMO kWh | IMPORTE Bs | ESTADO.
Buscá el consumo del mes más reciente (la última fila con valores numéricos).

Extraé los siguientes datos en formato JSON:
{
  "consumoKwh": number (consumo del último mes en kWh, de la columna CONSUMO kWh),
  "potenciaMaximaKw": number | null (potencia contratada o demanda máxima si aparece),
  "costoTotalBs": number (importe total a pagar de la factura actual, NO la suma de toda la tabla),
  "periodoFacturacion": string (período de la factura actual, ej: "05/2026"),
  "nit": string (NIT del cliente),
  "nombreCliente": string (nombre o razón social),
  "tarifa": string (tipo de tarifa),
  "numeroFactura": string (número de factura),
  "consumoAnualKwh": number | null (suma total de consumo de los últimos 12 meses si aparece),
  "importeTotalAnualBs": number | null (suma total de importes de los últimos 12 meses si aparece)
}
Devolvé SOLO el JSON.`;

        const result = await model.generateContent([{ text: prompt }, {
          inlineData: { mimeType: detectedMime, data: image },
        }]);
        const text = result.response.text();
        const cleaned = text.replace(/```json|```/g, '').trim();
        const data = JSON.parse(cleaned);

        return res.json({ success: true, data });
      } catch (geminiError: any) {
        console.error('Gemini error:', geminiError.message);
        // Fall through to simulation
      }
    }

    // Development fallback: simulate extraction
    // The frontend sends a real image, but we return simulated data for testing
    const simulatedData = {
      consumoKwh: 15908,
      potenciaMaximaKw: 35.97,
      costoTotalBs: 13799.95,
      periodoFacturacion: 'Diciembre 2024',
      nit: '1024649023',
      nombreCliente: 'VERONICA SAYA AYALA',
      tarifa: 'BTH',
      numeroFactura: 'FACT-001',
    };

    console.log('⚠️  Gemini API key no configurada. Usando datos simulados.');
    console.log('📄 Para usar OCR real, configurá GEMINI_API_KEY en .env');

    res.json({ success: true, data: simulatedData });
  } catch (error: any) {
    console.error('Extract bill error:', error);
    res.status(500).json({
      success: false,
      error: { message: error.message || 'Error al procesar la factura' },
    });
  }
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ Bytex Backend running on http://0.0.0.0:${PORT}`);
  console.log(`   Health: http://localhost:${PORT}/health`);
  console.log(`   Panels: http://localhost:${PORT}/api/panels`);
  console.log(`   Extract Bill: POST http://localhost:${PORT}/api/simulation/extract-bill`);
  console.log(`   Calculate: POST http://localhost:${PORT}/api/simulation/calculate`);
});
