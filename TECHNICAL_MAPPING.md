# ByteX Hackathon — Mapeo Técnico Exacto (Sin Ambigüedades)

## PARTE 1: MEMORY STORE INTEGRATION (Backend)

### 1.1 Estructura del Memory Store

**Archivo**: `backend/src/core/memory-store.ts` (NUEVO)

```typescript
import { randomUUID } from 'crypto';
import { ExtractedBillData, SizingResult, FinancialResult, CostBreakdownItem, EnvironmentalData, ScenarioItem } from './types.js';

export interface GeminiAnalysis {
  riskAssessment: 'ALTO' | 'MEDIO' | 'BAJO';
  recommendation: string;
  rationale: string;
  initialInsights: string[];
}

export interface BillAnalysis {
  ocr: ExtractedBillData;
  analysis: GeminiAnalysis;
}

export interface SimulationRecord {
  id: string;
  timestamp: Date;
  billAnalysis: BillAnalysis;
  calculation: {
    sizing: SizingResult;
    financial: FinancialResult;
    costs: CostBreakdownItem[];
    environmental: EnvironmentalData;
    scenarios: ScenarioItem[];
  } | null;
  conversationHistory: Array<{ role: 'user' | 'assistant'; content: string }>;
}

// Singleton memory store
export const simulationStore = new Map<string, SimulationRecord>();

// Timeline: limpiar simulaciones después de 24 horas (opcional)
const SIMULATION_TTL_MS = 24 * 60 * 60 * 1000;

export function createSimulation(billAnalysis: BillAnalysis): string {
  const id = randomUUID();
  const record: SimulationRecord = {
    id,
    timestamp: new Date(),
    billAnalysis,
    calculation: null,
    conversationHistory: [],
  };
  simulationStore.set(id, record);

  // Auto-cleanup after 24h
  setTimeout(() => simulationStore.delete(id), SIMULATION_TTL_MS);

  return id;
}

export function updateSimulationCalculation(
  id: string,
  calculation: SimulationRecord['calculation']
): boolean {
  const record = simulationStore.get(id);
  if (!record) return false;
  record.calculation = calculation;
  return true;
}

export function addChatMessage(id: string, role: 'user' | 'assistant', content: string): boolean {
  const record = simulationStore.get(id);
  if (!record) return false;
  record.conversationHistory.push({ role, content });
  return true;
}

export function getSimulation(id: string): SimulationRecord | undefined {
  return simulationStore.get(id);
}
```

---

### 1.2 Dónde Se Integra en `backend/src/index.ts`

**CAMBIO EN**: `backend/src/index.ts` (líneas 101-185)

**VIEJO ENDPOINT** (eliminar):
```typescript
// ❌ ELIMINAR
app.post('/api/simulation/extract-bill', async (req, res) => {
  // ... código viejo que solo hace OCR
});
```

**NUEVO ENDPOINT** (agregar):
```typescript
// ✅ NUEVO: OCR + Análisis + Create Simulation Record
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

    // PASO 1: Llamar Gemini UNA SOLA VEZ para OCR + Análisis
    let ocrData: ExtractedBillData | null = null;
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
          ? `Sector: ${context.sectorId} (consumo promedio: ~15000 kWh/mes para comercio)` 
          : 'Sector: desconocido';
        
        const zoneInfo = context?.zoneId 
          ? `Zona: ${context.zoneId} en Santa Cruz, Bolivia (lat: ${context.latitude}, lng: ${context.longitude})`
          : 'Zona: Santa Cruz centro';

        const prompt = `Eres analista de energía solar en Bolivia. Tu tarea:

1. EXTRAER (OCR): De la factura CRE adjunta, extrae EXACTAMENTE estos datos:
   - consumoKwh: número del último mes
   - costoTotalBs: monto total a pagar
   - potenciaMaximaKw: si aparece (puede ser null)
   - periodoFacturacion: período (ej: "Mayo 2026")
   - nit: NIT del cliente
   - nombreCliente: nombre o razón social
   - tarifa: código de tarifa (ej: BTH, BT)
   - numeroFactura: número de factura

2. ANALIZAR: Basado en ${sectorInfo} y ${zoneInfo}, proporciona:
   - riskAssessment: "ALTO" | "MEDIO" | "BAJO" (riesgo de cortes eléctricos en esa zona)
   - recommendation: "Te recomendamos Pack X porque..." (en 1 línea)
   - rationale: Explicación técnica de por qué (2-3 líneas)
   - initialInsights: Array de 2-3 datos interesantes sobre este caso

RESPONDE SOLO JSON (sin markdown):
{
  "ocr": { consumoKwh, costoTotalBs, potenciaMaximaKw, ... },
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
        // Fall through to simulation data
      }
    }

    // FALLBACK: Datos simulados si Gemini no funciona
    if (!ocrData) {
      ocrData = {
        consumoKwh: 15908,
        potenciaMaximaKw: 35.97,
        costoTotalBs: 13799.95,
        periodoFacturacion: 'Diciembre 2024',
        nit: '1024649023',
        nombreCliente: 'DEMO EMPRESA',
        tarifa: 'BTH',
        numeroFactura: 'FACT-DEMO-001',
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

    // PASO 2: Guardar en memory store
    const billAnalysis: BillAnalysis = { ocr: ocrData, analysis };
    const simulationId = createSimulation(billAnalysis);

    // PASO 3: Retornar con simulationId para que el frontend lo use después
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
```

**CAMBIO EN ENDPOINT CALCULATE**:
```typescript
// ✅ MODIFICADO: Ahora recibe simulationId para actualizar el record
app.post('/api/simulation/calculate', (req, res) => {
  try {
    const { simulationId, monthlyConsumptionKwh, irradianceKwhM2Day, panelId, latitude, longitude, monthlyCostBs } = req.body;

    if (!simulationId || !monthlyConsumptionKwh || !irradianceKwhM2Day) {
      return res.status(400).json({
        success: false,
        error: { message: 'Campos requeridos: simulationId, monthlyConsumptionKwh, irradianceKwhM2Day' },
      });
    }

    // Validar que la simulación existe
    const simulation = getSimulation(simulationId);
    if (!simulation) {
      return res.status(404).json({
        success: false,
        error: { message: 'Simulación no encontrada. Cargá una factura primero.' },
      });
    }

    const result = calculateMicrogrid({
      monthlyConsumptionKwh,
      irradianceKwhM2Day,
      panelId,
      latitude,
      longitude,
      monthlyCostBs,
    });

    // Guardar cálculo en el record
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
```

**NUEVO ENDPOINT CHAT**:
```typescript
// ✅ NUEVO: Chat conversacional
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

    // Guardar pregunta del usuario en historial
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

        // Contexto de la simulación para Gemini
        const { ocr } = simulation.billAnalysis;
        const calc = simulation.calculation;

        const contextPrompt = `Eres analista de energía solar. Un cliente hizo una simulación con estos datos:

CONSUMO: ${ocr.consumoKwh} kWh/mes
COSTO ACTUAL: Bs ${ocr.costoTotalBs}/mes
TARIFA: ${ocr.tarifa}

${calc ? `SIMULACIÓN:
- Paneles: ${calc.sizing.panelCount}
- Potencia pico: ${calc.sizing.peakPowerKw} kW
- Baterías: ${calc.sizing.batteryKwh} kWh
- Payback: ${calc.financial.paybackYears} años
- IRR: ${calc.financial.irr}%
- Ahorro 25 años: Bs ${calc.financial.twentyFiveYearSavings}` : 'Aún no se hizo cálculo'}

Pregunta del cliente: "${question}"

Responde brevemente (2-3 párrafos), basándote en estos datos.`;

        const result = await model.generateContent(contextPrompt);
        answer = result.response.text();
      } catch (geminiError: any) {
        console.error('Gemini chat error:', geminiError.message);
        answer = 'No puedo responder en este momento. Pero sé que tu simulación muestra un payback de ' + 
                (simulation.calculation?.financial.paybackYears || '?') + ' años.';
      }
    } else {
      answer = 'Gemini no está configurado. Datos: consumo ' + ocr.consumoKwh + ' kWh/mes.';
    }

    // Guardar respuesta
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
```

---

## PARTE 2: DATA TYPES FLOWING (Exacto)

### 2.1 Flow Completo de Datos

```
FRONTEND                                BACKEND                         MEMORY
┌─────────────────────────────────────────────────────────────────────────────┐

1️⃣  User uploads factura (File)
    ↓
    FileReader.readAsDataURL()
    ↓
    base64: string

2️⃣  Dispatch extractBill({ base64 })
    ↓ [simulator.effects.ts línea 19-31]
    SimulatorApiService.extractBill(base64)
    ↓
    POST /api/simulation/extract-and-analyze
    ├─ image: string (base64, sin "data:...")
    ├─ mimeType: "image/jpeg" | "image/png"
    └─ context: {
         sectorId?: string
         zoneId?: string
         latitude?: number
         longitude?: number
       }

    ┌──────────────────────────────────────────┐
    │ BACKEND PROCESSES                        │
    ├──────────────────────────────────────────┤
    │ 1. Call Gemini (image + context)         │
    │ 2. Parse JSON: { ocr, analysis }         │
    │ 3. createSimulation(billAnalysis)        │
    │    ↓ return simulationId (uuid)          │
    │ 4. Store in simulationStore[id]          │
    └──────────────────────────────────────────┘

3️⃣  Response: 200 OK
    {
      success: true,
      data: {
        simulationId: "7a3b-4c5d-...",
        ocr: {
          consumoKwh: 15908,
          costoTotalBs: 13799.95,
          potenciaMaximaKw: 35.97,
          periodoFacturacion: "Diciembre 2024",
          nit: "1024649023",
          nombreCliente: "DEMO EMPRESA",
          tarifa: "BTH",
          numeroFactura: "FACT-001",
          cargoFijoBs: 50,
          cargoVariableBs: 13750,
          otrosCargosBs: 0
        },
        analysis: {
          riskAssessment: "ALTO",
          recommendation: "Pack Horizonte con batería 50 kWh",
          rationale: "Tu consumo 15,900 kWh/mes es típico de comercios...",
          initialInsights: ["Tarifa 0.87 Bs/kWh", "Consumo estable"]
        }
      }
    }
    ↓
    Store in NgRx: extractBillSuccess({ data })
    ↓ [reducer línea 88-93]
    Update state.billData = ocr
    ↓
    input.page displays billData extracted info

4️⃣  User clicks "Calcular mi microred"
    ↓
    Dispatch calculate()
    ↓ [effects línea 49-76]
    Llama calculateMicrogrid CON simulationId
    ↓
    POST /api/simulation/calculate
    {
      simulationId: "7a3b-4c5d-...",
      monthlyConsumptionKwh: 15908,
      peakPowerKw: 35.97,
      monthlyCostBs: 13799.95,
      irradianceKwhM2Day: 4.8,
      panelId: "jinko-tiger-neo-670w",
      latitude: -17.78,
      longitude: -63.18
    }

    ┌──────────────────────────────────────────┐
    │ BACKEND                                  │
    ├──────────────────────────────────────────┤
    │ 1. Validate simulationId in store        │
    │ 2. Calculate sizing + financial          │
    │ 3. updateSimulationCalculation(id, calc) │
    │    ↓ saves to simulationStore[id]        │
    └──────────────────────────────────────────┘

5️⃣  Response: {sizing, financial, costs, environmental}
    ↓
    calculateSuccess({ result })
    ↓ [reducer línea 154-163]
    Update state.result, state.sizing, state.financial, state.currentStep = 4
    ↓
    results.page displays calculation

6️⃣  User types "¿Por qué no puedo usar Panel X?"
    ↓
    Dispatch chatAsk({ simulationId, question })
    ↓ [NEW effect]
    POST /api/chat/ask
    {
      simulationId: "7a3b-4c5d-...",
      question: "¿Por qué no puedo usar Panel X?"
    }

    ┌──────────────────────────────────────────┐
    │ BACKEND                                  │
    ├──────────────────────────────────────────┤
    │ 1. Get simulation from store              │
    │ 2. Craft Gemini prompt with full context │
    │    (consumo, cálculo, pregunta)          │
    │ 3. Call Gemini with context              │
    │ 4. addChatMessage(id, 'assistant', ans)  │
    └──────────────────────────────────────────┘

7️⃣  Response: { answer, sources }
    ↓
    chatAskSuccess({ answer })
    ↓ [reducer - NEW]
    Add to state.conversationHistory
    ↓
    chat-widget component appends message
```

### 2.2 Tipos EXACTOS que Fluyen

**Backend → Frontend** (en cada endpoint):

```typescript
// /api/simulation/extract-and-analyze
interface ExtractAndAnalyzeResponse {
  success: true;
  data: {
    simulationId: string;                    // ← CRITICAL: Frontend stores this
    ocr: ExtractedBillData;                  // ← ya existe en simulation.model.ts
    analysis: GeminiAnalysis;                // ← NEW type
  };
}

// /api/simulation/calculate
interface CalculateResponse {
  success: true;
  data: SimulationResult;                    // ← ya existe
}

// /api/chat/ask
interface ChatAskResponse {
  success: true;
  data: {
    answer: string;
    sources: string[];
  };
}
```

**Frontend State** (NgRx):
```typescript
// Agregar a SimulatorState (simulation-state.model.ts)
interface SimulatorState {
  // ... existing fields ...
  simulationId: string | null;               // ← NEW: guardar ID para chat
  conversationHistory: Array<{               // ← NEW: historial de chat
    role: 'user' | 'assistant';
    content: string;
  }>;
  isChattingLoading: boolean;                // ← NEW: loading state para chat
  chatError: string | null;                  // ← NEW
}
```

---

## PARTE 3: FRONTEND FLOW (Exacto)

### 3.1 Cambios en Actions

**Archivo**: `frontend/src/app/features/simulator/data-access/store/simulator.actions.ts`

```typescript
// Agregar al final (antes del cierre del createActionGroup):

    // Chat
    'Chat Ask': props<{ simulationId: string; question: string }>(),
    'Chat Ask Success': props<{ answer: string }>(),
    'Chat Ask Failure': props<{ error: string }>(),
```

### 3.2 Cambios en Effects

**Archivo**: `frontend/src/app/features/simulator/data-access/store/simulator.effects.ts`

```typescript
// Agregar import
import { SimulatorApiService } from '../services/simulator-api.service';

// Agregar effect al final (antes de cierre de clase)
  chatAsk$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SimulatorActions.chatAsk),
      switchMap(({ simulationId, question }) =>
        this.api.chatAsk(simulationId, question).pipe(
          map(({ answer }) => SimulatorActions.chatAskSuccess({ answer })),
          catchError(error => of(SimulatorActions.chatAskFailure({
            error: 'Error en chat. Intentá de nuevo.'
          })))
        )
      )
    )
  );
```

### 3.3 Cambios en Reducer

**Archivo**: `frontend/src/app/features/simulator/data-access/store/simulator.reducer.ts`

```typescript
// Agregar en initialSimulatorState
simulationId: null,
conversationHistory: [],
isChattingLoading: false,
chatError: null,

// Agregar handlers
on(SimulatorActions.extractBillSuccess, (state, { data }) => ({
  ...state,
  billData: data,
  simulationId: data.simulationId,     // ← GUARDAR EL ID
  extractingBill: false,
  extractionError: null,
})),

on(SimulatorActions.chatAsk, (state, { question }) => ({
  ...state,
  isChattingLoading: true,
  chatError: null,
  conversationHistory: [
    ...state.conversationHistory,
    { role: 'user' as const, content: question }
  ]
})),

on(SimulatorActions.chatAskSuccess, (state, { answer }) => ({
  ...state,
  isChattingLoading: false,
  conversationHistory: [
    ...state.conversationHistory,
    { role: 'assistant' as const, content: answer }
  ]
})),

on(SimulatorActions.chatAskFailure, (state, { error }) => ({
  ...state,
  isChattingLoading: false,
  chatError: error
})),
```

### 3.4 Cambios en API Service

**Archivo**: `frontend/src/app/features/simulator/data-access/services/simulator-api.service.ts`

```typescript
// Cambiar extractBill() → extractAndAnalyze()
extractBill(imageBase64: string): Observable<any> {
  // ... same base64 parsing ...
  return this.api.post<any>('/api/simulation/extract-and-analyze', {
    image: rawBase64,
    mimeType,
    context: {
      sectorId: null,
      zoneId: null,
      latitude: null,
      longitude: null,
    }
  }).pipe(map(res => res.data!));
}

// Agregar método para chat
chatAsk(simulationId: string, question: string): Observable<{ answer: string; sources: string[] }> {
  return this.api.post<{ answer: string; sources: string[] }>(
    '/api/chat/ask',
    { simulationId, question }
  ).pipe(map(res => res.data!));
}

// Cambiar calculateMicrogrid() para pasar simulationId
calculateMicrogrid(request: CalculateRequest & { simulationId: string }): Observable<SimulationResult> {
  return this.api.post<SimulationResult>('/api/simulation/calculate', request)
    .pipe(map(res => res.data!));
}
```

### 3.5 Cambios en Facade

**Archivo**: `frontend/src/app/features/simulator/data-access/services/simulator-facade.ts`

```typescript
// Agregar signals
simulationId: Signal<string | null> = toSignal(
  this.store.pipe(select(selectors.selectSimulationId)), 
  { initialValue: null }
);
conversationHistory: Signal<Array<{ role: string; content: string }>> = toSignal(
  this.store.pipe(select(selectors.selectConversationHistory)), 
  { initialValue: [] }
);
isChattingLoading: Signal<boolean> = toSignal(
  this.store.pipe(select(selectors.selectIsChattingLoading)), 
  { initialValue: false }
);

// Agregar método
chatAsk(question: string): void {
  const simId = this.simulationId();
  if (!simId) {
    console.warn('No simulation ID');
    return;
  }
  this.store.dispatch(SimulatorActions.chatAsk({ 
    simulationId: simId, 
    question 
  }));
}
```

### 3.6 Cambios en Input Page

**Archivo**: `frontend/src/app/features/simulator/pages/input.page.ts`

```typescript
// En onContinue():
onContinue(): void {
  const simId = this.facade.simulationId();  // ← obtener ID
  if (!simId) {
    this.notification.error('Error: simulación no creada. Intenta de nuevo.');
    return;
  }
  // Pasar simulationId al siguiente paso
  this.facade.calculate();  // effects usa simulationId del estado
  this.router.navigate([APP_ROUTES.SIMULATOR.PROCESSING]);
}
```

### 3.7 Nuevo Componente: Chat Widget

**Archivo**: `frontend/src/app/features/simulator/components/chat-widget/chat-widget.component.ts` (NUEVO)

```typescript
import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SimulatorFacade } from '../../data-access/services/simulator-facade';
import { ButtonComponent } from '../../../../shared/components/ui/button/button.component';

@Component({
  selector: 'bytex-chat-widget',
  standalone: true,
  imports: [CommonModule, FormsModule, ButtonComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="bg-surface-800 border border-surface-700 rounded-xl p-4 mt-6">
      <h3 class="text-lg font-semibold text-white mb-3">💬 Preguntá sobre tu simulación</h3>
      
      <div class="space-y-3 max-h-64 overflow-y-auto mb-4 bg-surface-900 p-3 rounded">
        @for (msg of facade.conversationHistory(); track $index) {
          <div [ngClass]="msg.role === 'user' ? 'text-right' : 'text-left'">
            <div [ngClass]="[
              'inline-block px-3 py-2 rounded-lg text-sm',
              msg.role === 'user' 
                ? 'bg-primary-600 text-white' 
                : 'bg-surface-700 text-surface-200'
            ]">
              {{ msg.content }}
            </div>
          </div>
        }
      </div>

      <div class="flex gap-2">
        <input
          #input
          type="text"
          class="flex-1 bg-surface-700 border border-surface-600 rounded px-3 py-2 text-sm text-white placeholder-surface-500"
          placeholder="¿Por qué...? ¿Puedo...? ¿Qué si...?"
          (keyup.enter)="onSendMessage(input.value); input.value = ''"
          [disabled]="facade.isChattingLoading()"
        />
        <bytex-button
          size="sm"
          variant="primary"
          (clicked)="onSendMessage(input.value); input.value = ''"
          [disabled]="facade.isChattingLoading()"
        >
          {{ facade.isChattingLoading() ? '...' : 'Enviar' }}
        </bytex-button>
      </div>

      @if (facade.chatError()) {
        <p class="text-xs text-red-400 mt-2">{{ facade.chatError() }}</p>
      }
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }
  `]
})
export class ChatWidgetComponent {
  protected facade = inject(SimulatorFacade);

  onSendMessage(question: string): void {
    if (!question.trim()) return;
    this.facade.chatAsk(question);
  }
}
```

### 3.8 Cambios en Results Page

**Archivo**: `frontend/src/app/features/simulator/pages/results.page.ts`

```typescript
// En imports, agregar:
import { ChatWidgetComponent } from '../components/chat-widget/chat-widget.component';

// En template, al final del div principal (antes del cierre):
      <!-- Chat Widget -->
      <bytex-chat-widget class="mt-8" />
```

### 3.9 Cambios en Selectors

**Archivo**: `frontend/src/app/features/simulator/data-access/store/simulator.selectors.ts`

```typescript
// Agregar al final
export const selectSimulationId = (state: SimulatorState) => state.simulationId;
export const selectConversationHistory = (state: SimulatorState) => state.conversationHistory;
export const selectIsChattingLoading = (state: SimulatorState) => state.isChattingLoading;
export const selectChatError = (state: SimulatorState) => state.chatError;
```

---

## RESUMEN EXACTO DE CAMBIOS

### Backend
- ✅ `backend/src/core/memory-store.ts` (NUEVO)
- ✅ `backend/src/index.ts` → Endpoint `/extract-and-analyze` (NUEVO) + `/calculate` (MODIFICADO) + `/chat/ask` (NUEVO)

### Frontend
- ✅ `simulator.model.ts` → Agregar `GeminiAnalysis`
- ✅ `simulation-state.model.ts` → Agregar `simulationId`, `conversationHistory`, `isChattingLoading`, `chatError`
- ✅ `simulator.actions.ts` → Agregar acciones de chat
- ✅ `simulator.reducer.ts` → Agregar handlers
- ✅ `simulator.effects.ts` → Agregar `chatAsk$`
- ✅ `simulator.selectors.ts` → Agregar selectores
- ✅ `simulator-api.service.ts` → Cambiar `extractBill` a `extractAndAnalyze` + agregar `chatAsk`
- ✅ `simulator-facade.ts` → Agregar signals + método `chatAsk`
- ✅ `input.page.ts` → Actualizar `onContinue()` para validar `simulationId`
- ✅ `results.page.ts` → Importar + mostrar `<bytex-chat-widget>`
- ✅ `chat-widget.component.ts` (NUEVO)

**Archivos SIN cambios**:
- ✅ `landing pages` — No tocar
- ✅ `dashboard` — No tocar
- ✅ `learn` — No tocar
- ✅ `auth` — No tocar
- ✅ `calculator.ts`, `financial-calculator.service.ts` — No tocar (siguen igual)

---

## FLUJO FINAL (Step by Step)

```
1. Usuario sube factura
   ↓
2. extractBill(base64) → POST /extract-and-analyze
   Backend: Gemini OCR + análisis, createSimulation(), return simulationId
   Frontend: Store simulationId en estado
   ↓
3. input.page muestra datos extraídos + recomendación de Gemini
   ↓
4. Usuario hace clic "Calcular"
   ↓
5. calculate() → POST /calculate CON simulationId
   Backend: Calcula, updateSimulationCalculation(simulationId, {...})
   Frontend: Muestra resultados
   ↓
6. results.page muestra comparativa + CHAT WIDGET
   ↓
7. Usuario escribe pregunta en chat widget
   ↓
8. chatAsk(simulationId, question) → POST /chat/ask
   Backend: Obtiene simulación previa, contexto, llama Gemini CON contexto
   Frontend: Muestra respuesta en chat
   ↓
9. Loop: usuario puede seguir preguntando
```

**ESTO ES SIN AMBIGÜEDADES.**
