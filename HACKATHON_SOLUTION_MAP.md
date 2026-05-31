# ByteX Hackathon Build — Solución Precisa (29-31 mayo 2026)

## 1. DECISIÓN FINAL: Stack y Scope

### MVP Entregable (48-72 horas)
**Usuario sube factura CRE → Gemini extrae + analiza → Backend calcula → Frontend muestra resultados + chat**

**Stack Final:**
- **Frontend**: Angular (actual, sin cambios en archivos)
- **Backend**: Express puro (sin Prisma, sin ORM) — datos en memory store
- **IA**: Gemini Flash 2.5 (una sola llamada: OCR + análisis contextual)
- **Persistencia**: NINGUNA. Sesión = in-memory. No hay login, no hay DB.
- **Hosting**: Local dev (laptop) para demo en hackathon

### ¿Qué Mockeamos?
- ✅ PostgreSQL/Prisma → Memory store (Map<simulationId, SimulationData>)
- ✅ Autenticación → Demo user hardcodeado (sin login)
- ✅ Persistencia de simulaciones → Datos mueren al refresh (OK para hackathon)

### ¿Qué NO Mockeamos?
- ❌ Gemini OCR + Análisis → REAL, una sola llamada
- ❌ Cálculos solares/financieros → REAL (lógica compleja, no se simplifica)
- ❌ Catálogo de paneles → Real (datos locales, JSON hardcodeado)

---

## 2. FLOW EXACTO DE LA APLICACIÓN

```
┌─────────────────────────────────────────────────────────────────┐
│ USUARIO EN FRONTEND (Angular)                                   │
└─────────────────────────────────────────────────────────────────┘
                              ↓
1️⃣  Upload factura CRE (image/jpeg base64)
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│ POST /api/simulation/extract-and-analyze                        │
│ Request:                                                        │
│ {                                                               │
│   "imageBase64": "...",                                         │
│   "mimeType": "image/jpeg",                                     │
│   "context": {  // NUEVO: contexto para análisis               │
│     "sectorId": "comercio",                                     │
│     "zoneId": "centro",                                         │
│     "historicalData": null                                      │
│   }                                                              │
│ }                                                               │
└─────────────────────────────────────────────────────────────────┘
                              ↓
2️⃣  Gemini Multimodal (UNA SOLA LLAMADA)
    Input a Gemini:
    - Imagen de factura (OCR)
    - Datos de contexto (sector, zona)
    
    Prompt: "Extraé OCR + analiza este caso específico"
    
    Output:
    {
      "ocr": {
        "consumoKwh": 15908,
        "costoTotalBs": 13799.95,
        "periodoFacturacion": "Diciembre 2024",
        "potenciaMaximaKw": 35.97,
        ...
      },
      "analysis": {
        "riskAssessment": "ALTO — Este sector tiene cortes frecuentes en esta zona",
        "recommendation": "Recomendamos Pack Horizonte con batería de 50 kWh",
        "rationale": "Tu consumo de 15,900 kWh/mes es típico de comercios. La zona Centro tiene 3-4 cortes/mes promedio en estación seca.",
        "initialInsights": ["Tu tarifa actual es 0.87 Bs/kWh, por encima del promedio regional"]
      }
    }
                              ↓
3️⃣  Backend calcula sizing + financiero
    POST /api/simulation/calculate
    Request: {monthlyConsumptionKwh, panelId, ...} (del OCR)
    Response: {sizing, financial, costs, environmental, scenarios}
                              ↓
4️⃣  Frontend muestra:
    - Comparativa CRE vs Solar
    - Gráfico de proyección 25 años
    - Recomendación de Gemini
    - Chat input: "Preguntá más sobre esto"
                              ↓
5️⃣  Chat con Gemini (conversacional)
    POST /api/chat/ask
    Request: {simulationId, question: "¿Por qué no puedo usar el Pack Amanecer?"}
    Response: Análisis contextual basado en la simulación previa
```

---

## 3. ENDPOINTS EXACTOS

### 3.1 OCR + Análisis Unificado (NUEVO)
**POST `/api/simulation/extract-and-analyze`**

```typescript
Request {
  imageBase64: string;                    // base64 sin prefijo "data:..."
  mimeType: "image/jpeg" | "image/png";
  context?: {
    sectorId?: string;
    zoneId?: string;
    latitude?: number;
    longitude?: number;
  }
}

Response {
  success: true,
  data: {
    ocr: {
      consumoKwh: number;
      costoTotalBs: number;
      potenciaMaximaKw: number;
      periodoFacturacion: string;
      nit: string;
      nombreCliente: string;
      tarifa: string;
      numeroFactura: string;
    },
    analysis: {
      riskAssessment: string;       // "ALTO", "MEDIO", "BAJO"
      recommendation: string;       // Qué pack recomienda
      rationale: string;            // Por qué
      initialInsights: string[];    // 2-3 datos interesantes
    }
  },
  error?: { message: string }
}
```

**Fallback**: Si Gemini no está configurado, devuelve OCR simulado + análisis genérico.

---

### 3.2 Cálculo (EXISTENTE, sin cambios)
**POST `/api/simulation/calculate`**

Igual que ahora. Input: consumo, irradiance, panelId → Output: sizing + financial.

---

### 3.3 Chat Conversacional (NUEVO)
**POST `/api/chat/ask`**

```typescript
Request {
  simulationId: string;      // ID de la simulación previa
  question: string;          // "¿Puedo usar baterías chinas?"
}

Response {
  success: true,
  data: {
    answer: string;          // Respuesta contextual de Gemini
    sources: string[];       // ["Cálculos de sizing", "Datos CRE"]
  }
}
```

**Context para Gemini**: Se le pasa la simulación previa + question.

---

## 4. GEMINI STRATEGY (Crucial)

### Single Unified Prompt (2.5 Flash)
En `/api/simulation/extract-and-analyze`:

```
Eres analista de energía solar para empresas en Bolivia. 

Tenés una factura CRE de Santa Cruz. Tu job:
1. EXTRAER (OCR): consumo, costo, periodo, potencia máxima
2. ANALIZAR: basado en sector + zona, ¿cuál es el riesgo?, ¿qué pack recomendás?

Factura adjunta.
Sector: {sector} ({avgConsumptionKwh} kWh/mes promedio)
Zona: {zone} (lat {lat}, lng {lng})

Devolvé JSON:
{
  "ocr": { consumoKwh, costoTotalBs, ... },
  "analysis": {
    "riskAssessment": "ALTO|MEDIO|BAJO — explicá en 1 línea",
    "recommendation": "Pack X porque...",
    "rationale": "Tu caso es típico de {sector} en {zone}. Datos: {...}",
    "initialInsights": ["insight1", "insight2"]
  }
}
```

### Chat Prompt (2.5 Flash)
En `/api/chat/ask`:

```
Eres analista de energía solar. El usuario hizo una simulación.
Los resultados fueron:
- Consumo actual: {kwh}/mes
- Costo CRE: {bs}/mes
- Pack recomendado: {pack}
- Payback: {years} años
- IRR: {irr}%

Pregunta del usuario: {question}

Responde basándote en estos datos. Sé conciso (2-3 párrafos).
```

---

## 5. MEMORY STORE (In-Memory, Sin Persistencia)

### Estructura de Datos

```typescript
// Backend memory
const simulationStore = new Map<string, SimulationRecord>();

interface SimulationRecord {
  id: string;                    // uuid
  timestamp: Date;
  billAnalysis: {
    ocr: ExtractedBillData;
    analysis: GeminiAnalysis;
  };
  calculation: {
    sizing: SizingResult;
    financial: FinancialResult;
    costs: CostBreakdownItem[];
    environmental: EnvironmentalData;
  };
  conversationHistory: Message[]; // Para chat
}

interface Message {
  role: "user" | "assistant";
  content: string;
}
```

### Lifecycle
1. Usuario sube factura → genera `simulationId` (uuid) → guarda en memory
2. Frontend recibe `simulationId` → lo usa para cálculos posteriores
3. Usuario pregunta → busca `simulationId` en memory → responde
4. **Al refresh o cierre**: TODOS los datos se pierden. ESTÁ OK para hackathon.

---

## 6. FRONTEND CHANGES (Minimal)

### Pages que SE TOCAN

1. **input.page.ts** → Actualizar llamada
   - Cambiar `extractBill()` → `extractAndAnalyze()` (nuevo endpoint)
   - Mostrar `analysis.recommendation` + `analysis.riskAssessment` en la card

2. **results.page.ts** → Agregar chat
   - Nuevo componente: `<bytex-chat-widget>` al final
   - Input: "Pregunta más..."
   - Output: respuestas contextuales

3. **processing.page.ts** → Posiblemente sin cambios (spinner mientras calcula)

### Nuevo Componente
**chat-widget.component.ts**
```html
<div class="chat-container">
  <div class="messages">
    @for (msg of messages; track msg.id) {
      <div [class.user]="msg.role === 'user'" [class.assistant]="msg.role === 'assistant'">
        {{ msg.content }}
      </div>
    }
  </div>
  <input (keyup.enter)="sendMessage($event.target.value)" 
         placeholder="Preguntá sobre esta simulación...">
</div>
```

---

## 7. BACKEND CHANGES (Express Puro)

### 7.1 Eliminar Prisma
```bash
npm uninstall @prisma/client prisma
rm -r prisma/
```

### 7.2 Agregar Memory Store
```typescript
// src/core/memory-store.ts
export const simulationStore = new Map<string, SimulationRecord>();

export function createSimulation(data: any): string {
  const id = crypto.randomUUID();
  simulationStore.set(id, {
    id,
    timestamp: new Date(),
    billAnalysis: data.billAnalysis,
    calculation: null,
    conversationHistory: [],
  });
  return id;
}
```

### 7.3 Nuevos Endpoints
```typescript
// src/routes/simulation.ts
app.post('/api/simulation/extract-and-analyze', async (req, res) => {
  // 1. Extraer imagen + contexto
  // 2. Llamar Gemini (OCR + análisis en un prompt)
  // 3. Crear registro en memory store
  // 4. Devolver {ocr, analysis, simulationId}
});

app.post('/api/chat/ask', (req, res) => {
  const { simulationId, question } = req.body;
  const simulation = simulationStore.get(simulationId);
  // 1. Pasar contexto de simulación a Gemini
  // 2. Gemini responde
  // 3. Guardar en conversationHistory
  // 4. Devolver respuesta
});
```

---

## 8. SCOPE FINAL (HACKATHON)

### ✅ IN SCOPE
- [x] Upload factura CRE
- [x] Gemini OCR (extrae consumo, costo, período)
- [x] Gemini análisis (riesgo, recomendación, insights)
- [x] Backend calcula sizing + financial
- [x] Frontend muestra resultados + comparativa
- [x] Chat conversacional sobre la simulación
- [x] Dark theme (ya existe)
- [x] Mobile responsive (Angular ya hace)

### ❌ OUT OF SCOPE
- [ ] Persistencia en DB (no hay login)
- [ ] Dashboard de simulaciones previas
- [ ] Autenticación Google
- [ ] Exportar PDF
- [ ] Múltiples usuarios simultáneos
- [ ] WebSocket para real-time
- [ ] Integración con APIs externas (CRE, NASA)

---

## 9. DECISIONES ARQUITECTÓNICAS

| Decisión | Por qué |
|----------|---------|
| Una sola llamada Gemini (OCR + análisis) | Reduce latencia, usa multimodalidad, usa menos tokens |
| Memory store (sin persistencia) | Hackathon = demo, no necesita data real; reduce complejidad |
| Express puro (sin ORM) | Más rápido para build, menos dependencias |
| Gemini 2.5 Flash (no Sonnet) | Suficiente para OCR + análisis contextual, más barato |
| Sin login | Simplifica, demo = single user |

---

## 10. RIESGOS Y MITIGACIONES

| Riesgo | Mitigación |
|--------|-----------|
| Gemini OCR no reconoce factura | Tiene fallback a datos simulados |
| Gemini tariffs caídas | Cache del prompt, respuestas genéricas |
| Cálculos financieros incorrectos | Validación unitaria, datos test reales |
| Chat sin contexto | Siempre se pasa simulationId + datos previos |
| Performance lenta | Caché de resultados Gemini (si se repiten) |

---

## 11. TIMELINE (48-72 horas)

**Viernes 29 mayo (12h)**
- [ ] Refactor backend: remover Prisma, crear memory store
- [ ] Nuevo endpoint `/extract-and-analyze` con Gemini unificado
- [ ] Probar OCR + análisis con factura real

**Sábado 30 mayo (12h)**
- [ ] Integrar en frontend: cambiar `extractBill()` → `extractAndAnalyze()`
- [ ] Mostrar `analysis.recommendation` en results
- [ ] Agregar chat-widget component

**Domingo 31 mayo (6h antes de presentación)**
- [ ] Testing end-to-end: upload → cálculo → chat
- [ ] Fix bugs críticos
- [ ] Demo listo

---

## 12. DEFINICIONES PRECISAS

**"Sin ambigüedades"** significa:

✅ **Gemini hace una sola llamada**: OCR + análisis (no dos)
✅ **Datos no persisten**: Al refresh, se pierden. Es OK.
✅ **Express sin ORM**: Map en memoria, no PostgreSQL
✅ **No hay login**: Demo user hardcodeado
✅ **Chat usa contexto previo**: Siempre conoce la simulación
✅ **Fallback sin IA**: Si Gemini falla, datos simulados + respuestas genéricas

---

## 13. COMANDOS PARA EMPEZAR

```bash
# Backend
cd backend
npm uninstall @prisma/client prisma
npm install                          # actualiza package.json
npm run dev

# Frontend
cd frontend
npm install
npm start
```

---

**ESTA ES LA SOLUCIÓN FINAL. Sin cambios hasta que validemos en apply.**
