# 🏗️ Plan de Implementación Backend — Bytex (Soberanía Energética)
## Rol: Arquitecto de Software Senior | Backend Lead
## Stack: TypeScript + Firebase + Gemini AI + NASA POWER

---

## 📋 CONTEXTO DEL PROYECTO
Simulador de Soberanía Energética — PWA que permite a empresas de Santa Cruz, Bolivia comparar el costo de mantenerse conectados a CRE vs instalar una microred solar. Backend serverless 100% TypeScript sobre Firebase.

### Stack Tecnológico
| Capa | Tecnología |
|------|-----------|
| Runtime | Node.js 20 LTS |
| Lenguaje | TypeScript 5.4+ (strict mode) |
| Serverless | Firebase Cloud Functions (Gen 2) |
| Base de Datos | Cloud Firestore (modo nativo) |
| Auth | Firebase Authentication (Google Sign-In) |
| Storage | Firebase Cloud Storage (facturas) |
| IA | Gemini 2.5 Flash-Lite API |
| Datos Solares | NASA POWER API |
| Validación | Zod |
| Testing | Vitest + @firebase/rules-unit-testing |
| Linting | ESLint + Prettier |
| Monorepo | Turborepo + pnpm workspaces |

---

## 📁 ESTRUCTURA DE CARPETAS

```
backend/
├── packages/
│   ├── core/                             # Dominio puro (reglas de negocio)
│   │   ├── src/
│   │   │   ├── entities/                 # Simulation, User, BillData, MicrogridResult
│   │   │   │   ├── base.entity.ts
│   │   │   │   ├── user.entity.ts
│   │   │   │   ├── simulation.entity.ts
│   │   │   │   ├── bill-data.entity.ts
│   │   │   │   └── microgrid-result.entity.ts
│   │   │   ├── value-objects/            # Email, Money, Coordinate, Consumption, Power
│   │   │   │   ├── email.vo.ts
│   │   │   │   ├── money.vo.ts
│   │   │   │   ├── coordinate.vo.ts
│   │   │   │   ├── consumption.vo.ts
│   │   │   │   └── irradiance.vo.ts
│   │   │   ├── repositories/             # Interfaces (puertos)
│   │   │   │   ├── i-user.repository.ts
│   │   │   │   ├── i-simulation.repository.ts
│   │   │   │   └── i-bill-file.repository.ts
│   │   │   ├── services/                 # Lógica pura de dominio
│   │   │   │   ├── microgrid-sizer.service.ts    # ← CORE: dimensionamiento
│   │   │   │   ├── financial-calculator.service.ts # ← CORE: ROI, payback, LCOE
│   │   │   │   └── panel-selector.service.ts      # ← CORE: mejor panel según perfil
│   │   │   ├── enums/
│   │   │   │   ├── simulation-type.enum.ts        # existing | new
│   │   │   │   ├── panel-technology.enum.ts       # PERC | TOPCon | HJT | ABC
│   │   │   │   ├── business-sector.enum.ts        # manufactura, alimentos, logistica...
│   │   │   │   └── financing-type.enum.ts         # cash | lease | ppa
│   │   │   └── errors/                    # DomainError, SimulationError, NotFoundError
│   │   │       ├── app-error.base.ts
│   │   │       ├── domain.error.ts
│   │   │       ├── not-found.error.ts
│   │   │       └── validation.error.ts
│   │   └── package.json
│   │
│   ├── application/                       # Casos de uso (orquestación)
│   │   ├── src/
│   │   │   ├── ports/                     # Interfaces de entrada/salida
│   │   │   │   ├── i-gemini-service.ts
│   │   │   │   ├── i-nasa-service.ts
│   │   │   │   ├── i-pricing-repository.ts
│   │   │   │   └── i-notification-service.ts
│   │   │   ├── use-cases/                 # 1 archivo = 1 caso de uso
│   │   │   │   ├── extract-bill-data.use-case.ts        # Gemini OCR
│   │   │   │   ├── estimate-consumption.use-case.ts     # INE + rubro
│   │   │   │   ├── calculate-microgrid.use-case.ts      # Motor principal
│   │   │   │   ├── get-solar-data.use-case.ts           # NASA POWER
│   │   │   │   ├── create-simulation.use-case.ts
│   │   │   │   ├── get-simulation.use-case.ts
│   │   │   │   ├── list-simulations.use-case.ts
│   │   │   │   ├── delete-simulation.use-case.ts
│   │   │   │   ├── create-user.use-case.ts
│   │   │   │   └── get-user-profile.use-case.ts
│   │   │   ├── dto/                      # Zod schemas de entrada/salida
│   │   │   │   ├── extract-bill.dto.ts
│   │   │   │   ├── calculate-microgrid.dto.ts
│   │   │   │   ├── create-simulation.dto.ts
│   │   │   │   ├── simulation-response.dto.ts
│   │   │   │   └── pricing.dto.ts
│   │   │   └── mappers/                  # Entity ↔ DTO ↔ Firestore
│   │   │       ├── simulation.mapper.ts
│   │   │       ├── user.mapper.ts
│   │   │       └── bill-data.mapper.ts
│   │   └── package.json
│   │
│   ├── infrastructure/                    # Adaptadores (Firebase, APIs externas)
│   │   ├── src/
│   │   │   ├── firebase/                 # Firebase Admin SDK singleton
│   │   │   │   ├── admin-init.ts
│   │   │   │   └── firestore-utils.ts
│   │   │   ├── firestore/                # Repositorios concretos
│   │   │   │   ├── user.repository.ts
│   │   │   │   ├── simulation.repository.ts
│   │   │   │   └── pricing.repository.ts
│   │   │   ├── auth/                     # Adaptador Firebase Auth
│   │   │   │   └── auth.adapter.ts
│   │   │   ├── storage/                  # Cloud Storage para facturas
│   │   │   │   └── bill-file.repository.ts
│   │   │   ├── gemini/                   # Cliente Gemini API
│   │   │   │   ├── gemini.client.ts
│   │   │   │   ├── prompts/              # Prompts especializados
│   │   │   │   │   ├── extract-bill.prompt.ts
│   │   │   │   │   └── explain-results.prompt.ts
│   │   │   │   └── gemini.types.ts
│   │   │   ├── nasa/                     # Cliente NASA POWER API
│   │   │   │   ├── nasa-power.client.ts
│   │   │   │   └── nasa.types.ts
│   │   │   ├── http/                     # Clientes HTTP (axios/fetch)
│   │   │   │   └── http-client.ts
│   │   │   ├── logging/                  # Pino logger estructurado
│   │   │   │   └── logger.ts
│   │   │   └── config/                   # Variables de entorno (Zod)
│   │   │       └── env.ts
│   │   └── package.json
│   │
│   ├── api/                              # Capa de presentación (Cloud Functions)
│   │   ├── src/
│   │   │   ├── functions/                # Cloud Functions por dominio
│   │   │   │   ├── simulation/           # ⭐ Corazón del producto
│   │   │   │   │   ├── extract-bill.function.ts    # POST /extractBill
│   │   │   │   │   ├── calculate.function.ts       # POST /calculateMicrogrid
│   │   │   │   │   ├── create.function.ts          # POST /simulations
│   │   │   │   │   ├── get.function.ts             # GET /simulations/:id
│   │   │   │   │   ├── list.function.ts            # GET /simulations
│   │   │   │   │   └── delete.function.ts          # DELETE /simulations/:id
│   │   │   │   ├── user/
│   │   │   │   │   ├── get-profile.function.ts
│   │   │   │   │   └── update-profile.function.ts
│   │   │   │   ├── pricing/              # Datos de precios actualizados
│   │   │   │   │   └── get-panels.function.ts      # GET /panels
│   │   │   │   └── admin/               # Funciones administrativas
│   │   │   │       └── health-check.function.ts
│   │   │   ├── middleware/               # Auth, Validación, Error Handler
│   │   │   │   ├── auth.middleware.ts
│   │   │   │   ├── validation.middleware.ts
│   │   │   │   ├── error-handler.middleware.ts
│   │   │   │   ├── cors.middleware.ts
│   │   │   │   └── correlation-id.middleware.ts
│   │   │   ├── routes/                   # Definición de rutas Express
│   │   │   │   ├── simulation.routes.ts
│   │   │   │   ├── user.routes.ts
│   │   │   │   ├── pricing.routes.ts
│   │   │   │   └── admin.routes.ts
│   │   │   └── triggers/                 # Firestore triggers
│   │   │       └── on-simulation-created.trigger.ts
│   │   └── package.json
│   │
│   └── shared/                           # Utilidades transversales
│       ├── src/
│       │   ├── types/                    # Tipos globales
│       │   │   ├── api-response.ts
│       │   │   └── pagination.ts
│       │   ├── utils/                    # Funciones puras
│       │   │   ├── date.utils.ts
│       │   │   ├── math.utils.ts
│       │   │   └── validators.ts
│       │   ├── constants/                # Constantes de negocio
│       │   │   ├── panel-catalog.ts      # 🏆 CATÁLOGO COMPLETO DE PANELES
│       │   │   ├── business-sectors.ts   # Datos INE Bolivia
│       │   │   ├── import-costs.ts       # Costos de importación
│       │   │   └── cre-tariffs.ts        # Tarifas CRE
│       │   └── testing/                  # Helpers de testing
│       │       ├── fixtures/
│       │       └── mocks/
│       └── package.json
│
├── firebase.json
├── .firebaserc
├── turbo.json
├── pnpm-workspace.yaml
└── tsconfig.base.json
```

---

## 🧠 DOMINIO: Entidades y Lógica de Negocio

### Entidad Principal: `Simulation`

```typescript
// core/src/entities/simulation.entity.ts
export class Simulation extends BaseEntity {
  constructor(
    id: string,
    public readonly userId: string,
    public readonly type: SimulationType,           // existing | new
    public readonly input: SimulationInput,          // Datos de entrada
    public readonly result: SimulationResult | null, // Resultado del cálculo
    public readonly status: SimulationStatus,        // pending | processing | completed | failed
    public readonly createdAt: Date,
    public readonly updatedAt: Date
  ) {
    super(id, createdAt, updatedAt);
  }

  static create(
    type: SimulationType,
    input: SimulationInput,
    userId?: string
  ): Simulation {
    // Crear simulación con estado "pending"
  }

  complete(result: SimulationResult): void {
    // Marcar como completada con resultado
  }

  fail(error: string): void {
    // Marcar como fallida
  }
}
```

### Value Objects Clave

```typescript
// Coordinate: latitud/longitud para NASA POWER
export class Coordinate {
  constructor(
    public readonly lat: number,   // -17.78 (Santa Cruz)
    public readonly lng: number    // -63.17
  ) {}

  static SantaCruz(): Coordinate {
    return new Coordinate(-17.78, -63.17);
  }
}

// Money: evita errores de redondeo (usa centavos)
export class Money {
  private constructor(
    public readonly amount: number,   // en centavos USD
    public readonly currency: 'USD' | 'BOB'
  ) {}

  static fromDollars(amount: number): Money { ... }
  static fromBolivianos(amount: number): Money { ... }
  static zero(): Money { return new Money(0, 'USD'); }
  add(other: Money): Money { ... }
  multiply(factor: number): Money { ... }
  toDollars(): number { return this.amount / 100; }
}

// Irradiance: dato de NASA POWER
export class Irradiance {
  constructor(
    public readonly value: number,           // kWh/m²/día
    public readonly location: Coordinate
  ) {}

  static fromAPIResponse(response: NasaPowerResponse): Irradiance { ... }
}
```

---

## 🔥 SERVICIOS DE DOMINIO (Reglas de Negocio Puras)

### MicrogridSizerService — El Corazón del Producto

```typescript
// core/src/services/microgrid-sizer.service.ts
export class MicrogridSizerService {
  /**
   * Calcula el dimensionamiento completo de la microred.
   * Basado en consumo, irradiación, y catálogo de equipos reales.
   */
  calculate(input: SizingInput): SizingResult {
    // 1. Paneles solares
    const dailyConsumption = input.monthlyConsumption / 30;
    const panelCount = Math.ceil(
      dailyConsumption /
      (input.irradiance * input.selectedPanel.wattPeak * input.systemEfficiency)
    );

    // 2. Potencia pico del sistema
    const peakPowerKw = (panelCount * input.selectedPanel.wattPeak) / 1000;

    // 3. Inversores (dimensionamiento 1.2x potencia paneles)
    const inverterPowerKw = peakPowerKw * 1.2;
    const inverterCount = Math.ceil(inverterPowerKw / input.selectedInverter.kw);

    // 4. Baterías (autonomía nocturna: 50% del consumo diario)
    const batteryKwh = dailyConsumption * 0.5;
    const batteryCount = Math.ceil(batteryKwh / input.selectedBattery.kwh);

    // 5. Área requerida
    const areaM2 = panelCount * input.selectedPanel.areaM2;

    return {
      panelCount,
      peakPowerKw,
      inverterCount,
      inverterPowerKw,
      batteryCount,
      batteryKwh,
      areaM2,
      dailyGeneration: panelCount * input.selectedPanel.wattPeak * input.irradiance * input.systemEfficiency
    };
  }
}
```

### FinancialCalculatorService — ROI, Payback, LCOE

```typescript
// core/src/services/financial-calculator.service.ts
export class FinancialCalculatorService {
  /**
   * Calcula métricas financieras completas para la comparativa CRE vs Microred.
   */
  calculate(input: FinancialInput): FinancialResult {
    // 1. Costo total del sistema
    const totalCapEx = input.sizing.panelCount * input.pricing.panelLandedPrice
                     + input.sizing.inverterCount * input.pricing.inverterPrice
                     + input.sizing.batteryCount * input.pricing.batteryPrice
                     + input.pricing.structureCost
                     + input.pricing.installationCost
                     + input.pricing.transportCost;

    // 2. Ahorro anual vs CRE
    const annualCreCost = input.monthlyCreBill * 12;
    const annualCreEscalated = this.projectEscalation(
      annualCreCost, 
      input.creAnnualIncrease,  // ~5.2% (histórico CRE)
      25
    );
    const annualSolarCost = 0; // Sin costo de energía

    // 3. Payback simple
    const paybackYears = totalCapEx / annualCreCost;

    // 4. Payback descontado
    const discountedPayback = this.calculateDiscountedPayback(
      totalCapEx, 
      annualCreEscalated, 
      input.discountRate // ~12%
    );

    // 5. TIR (Tasa Interna de Retorno)
    const irr = this.calculateIRR(
      [-totalCapEx, ...annualCreEscalated],
      0.1 // initial guess
    );

    // 6. VAN (Valor Actual Neto)
    const van = this.calculateNPV(
      [-totalCapEx, ...annualCreEscalated],
      input.discountRate
    );

    // 7. LCOE (Levelized Cost of Energy)
    const totalKwh25Years = input.sizing.dailyGeneration * 365 * 25 * input.systemDegradation;
    const totalCost25Years = totalCapEx + (input.pricing.annualOandM * 25);
    const lcoe = totalCost25Years / totalKwh25Years;

    // 8. CO₂ evitado
    const co2AvoidedTons = (input.sizing.dailyGeneration * 365 * 25) 
                         * input.gridEmissionFactor // 0.42 kgCO2/kWh
                         / 1000;

    return {
      totalCapEx: Money.fromDollars(totalCapEx),
      totalCapExPerWatt: totalCapEx / (input.sizing.peakPowerKw * 1000),
      paybackYears,
      discountedPaybackYears: discountedPayback,
      irr: irr * 100, // en %
      van: Money.fromDollars(van),
      lcoe: Money.fromDollars(lcoe),
      co2AvoidedTons,
      twentyFiveYearSavings: Money.fromDollars(
        annualCreEscalated.reduce((a, b) => a + b, 0) - totalCapEx
      ),
      yearlyBreakdown: this.generateYearlyBreakdown(
        totalCapEx,
        annualCreEscalated,
        25
      )
    };
  }

  private generateYearlyBreakdown(
    capex: number,
    creProjection: number[],
    years: number
  ): YearlyBreakdown[] {
    return creProjection.map((creCost, year) => ({
      year: year + 1,
      creCumulative: creProjection.slice(0, year + 1).reduce((a, b) => a + b, 0),
      solarCumulative: year === 0 ? capex : capex, // solo inversión inicial
      savings: creProjection.slice(0, year + 1).reduce((a, b) => a + b, 0) - capex,
      breakEven: creProjection.slice(0, year + 1).reduce((a, b) => a + b, 0) >= capex
    }));
  }
}
```

### PanelSelectorService — Mejor Panel según Perfil

```typescript
// core/src/services/panel-selector.service.ts
export class PanelSelectorService {
  /**
   * Recomienda el panel óptimo según el perfil del cliente.
   * Usa el catálogo de paneles reales con precios landed SCZ.
   */
  recommend(input: PanelRecommendationInput): PanelRecommendation {
    const candidates = PANEL_CATALOG.filter(p => {
      // Filtros según perfil
      if (input.spaceAvailable === 'limited') {
        return p.wattPerM2 >= 240; // Paneles de alta densidad
      }
      if (input.budget === 'low') {
        return p.pricePerWattLanded < 0.15;
      }
      return true;
    });

    // Ordenar por mejor relación costo-beneficio
    candidates.sort((a, b) => a.pricePerWattLanded - b.pricePerWattLanded);

    return {
      recommended: candidates[0],
      alternatives: candidates.slice(1, 4),
      reason: this.generateReason(candidates[0], input)
    };
  }
}
```

---

## 🤖 INTEGRACIÓN GEMINI (OCR + Razonamiento)

### Prompt Engineering para Extracción de Facturas CRE

```typescript
// infrastructure/src/gemini/prompts/extract-bill.prompt.ts
export const EXTRACT_BILL_PROMPT = `
Eres un asistente especializado en extraer datos de facturas de la empresa 
CRE (Cooperativa Rural de Electrificación) de Santa Cruz, Bolivia.

De la imagen de la factura, extraé los siguientes campos en JSON:

{
  "consumoKwh": number,           // Consumo total del mes en kWh
  "potenciaMaximaKw": number,     // Potencia Máxima Demandada (kW pico)
  "costoTotalBs": number,         // Costo total en Bolivianos (Bs)
  "periodoFacturacion": string,   // "Marzo 2026"
  "nit": string,                  // NIT del cliente
  "nombreCliente": string,        // Nombre o razón social
  "tarifa": string,               // Tipo de tarifa (ej: "TARIFARIA BTH")
  "fechaEmision": string,         // Fecha de emisión
  "numeroFactura": string,        // Número de factura
  "cargoFijoBs": number,          // Cargo fijo en Bs
  "cargoVariableBs": number,      // Cargo variable/consumo en Bs
  "otrosCargosBs": number,        // Otros cargos (alumbrado público, aseo, etc.)
  "fechaCorte": string            // Fecha de corte/vencimiento
}

IMPORTANTE:
- Devolvé SOLO el JSON, sin texto adicional.
- Si un campo no es visible, usá null.
- Los montos deben estar en Bolivianos (Bs), sin símbolos.
- El formato de fechas debe ser "DD/MM/AAAA".
- La factura puede estar rotada o con baja iluminación.
`.trim();
```

### Gemini Client

```typescript
// infrastructure/src/gemini/gemini.client.ts
export class GeminiClient implements IGeminiService {
  private readonly model: GenerativeModel;
  private readonly logger: Logger;

  constructor() {
    const apiKey = env.GEMINI_API_KEY;
    const genAI = new GoogleGenerativeAI(apiKey);
    this.model = genAI.getGenerativeModel({
      model: 'gemini-2.5-flash-lite',
      generationConfig: {
        temperature: 0.1,    // Baja temperatura = más preciso
        topP: 0.95,
        topK: 40,
        maxOutputTokens: 1024
      }
    });
    this.logger = new Logger('GeminiClient');
  }

  async extractBillData(imageBase64: string): Promise<ExtractedBillData> {
    const startTime = Date.now();
    
    try {
      const result = await this.model.generateContent([
        { text: EXTRACT_BILL_PROMPT },
        {
          inlineData: {
            mimeType: 'image/jpeg',
            data: imageBase64
          }
        }
      ]);

      const text = result.response.text();
      const parsed: ExtractedBillData = JSON.parse(text);
      
      this.logger.info('Factura extraída exitosamente', {
        durationMs: Date.now() - startTime,
        consumptionKwh: parsed.consumoKwh
      });

      return parsed;
    } catch (error) {
      this.logger.error('Error extrayendo factura', { error, durationMs: Date.now() - startTime });
      throw new DomainError('No se pudo extraer la información de la factura');
    }
  }

  async explainResults(results: SimulationResult, language: 'es' | 'en' = 'es'): Promise<string> {
    // Genera explicación en lenguaje natural de los resultados
    const prompt = `
    Explicá estos resultados de simulación solar para un empresario de Santa Cruz, Bolivia.
    Usá lenguaje claro, no técnico. Destacá el ahorro y el payback.
    Resultados: ${JSON.stringify(results)}
    `;
    
    const result = await this.model.generateContent([{ text: prompt }]);
    return result.response.text();
  }
}
```

---

## 🌐 SERVICIOS EXTERNOS

### NASA POWER API Client

```typescript
// infrastructure/src/nasa/nasa-power.client.ts
export class NasaPowerClient implements INasaService {
  private readonly baseUrl = 'https://power.larc.nasa.gov/api/temporal/monthly/point';
  private readonly logger = new Logger('NasaPowerClient');

  async getSolarIrradiance(lat: number, lng: number): Promise<Irradiance> {
    const url = new URL(this.baseUrl);
    url.searchParams.set('parameters', 'ALLSKY_SFC_SW_DWN');
    url.searchParams.set('community', 'RE');
    url.searchParams.set('longitude', lng.toString());
    url.searchParams.set('latitude', lat.toString());
    url.searchParams.set('start', '2020');
    url.searchParams.set('end', '2025');
    url.searchParams.set('format', 'JSON');

    const response = await fetch(url.toString());
    const data: NasaPowerResponse = await response.json();
    
    // Calcular promedio anual de irradiación
    const values = Object.values(data.properties.parameter.ALLSKY_SFC_SW_DWN)
      .filter((v): v is number => v !== -999.0); // -999 = fill value
    
    const average = values.reduce((a, b) => a + b, 0) / values.length;
    
    return new Irradiance(average, new Coordinate(lat, lng));
  }

  static readonly SANTA_CRUZ_COORDINATES = {
    warnes: { lat: -17.50, lng: -63.17 },
    cotoca: { lat: -17.75, lng: -62.99 },
    montero: { lat: -17.34, lng: -63.26 },
    centro: { lat: -17.78, lng: -63.18 },
    laGuardia: { lat: -17.88, lng: -63.33 },
    zofracruz: { lat: -17.80, lng: -63.13 }
  } as const;
}
```

---

## 📦 PLAN DE IMPLEMENTACIÓN (0% → 100%)

### FASE 0: Fundamentos (0% - 8%)
| # | Tarea | Archivos | Estimación |
|---|---|---|---|
| 1 | Inicializar monorepo Turborepo + pnpm | `turbo.json`, `pnpm-workspace.yaml`, `tsconfig.base.json` | 1h |
| 2 | Configurar TypeScript strict en todos los paquetes | Cada `tsconfig.json` | 0.5h |
| 3 | Configurar ESLint + Prettier | `.eslintrc.js`, `.prettierrc` | 0.5h |
| 4 | Inicializar Firebase Admin SDK + Emulator Suite | `firebase.json`, `.firebaserc` | 1h |
| 5 | Configurar variables de entorno con Zod | `infrastructure/src/config/env.ts` | 0.5h |
| 6 | Configurar logger Pino estructurado | `infrastructure/src/logging/logger.ts` | 0.5h |
| 7 | Crear jerarquía de errores (AppError, DomainError, etc.) | `core/src/errors/*.ts` | 1h |
| 8 | Configurar Firebase Emulator Suite para dev/CI | `firebase.json` (rules, emulators) | 1h |
| **Subtotal** | | | **6h** |

### FASE 1: Dominio Puro (8% - 20%)
| # | Tarea | Archivos | Estimación |
|---|---|---|---|
| 9 | Crear BaseEntity con id, createdAt, updatedAt, deletedAt | `core/src/entities/base.entity.ts` | 0.5h |
| 10 | Crear Simulation entity | `core/src/entities/simulation.entity.ts` | 1h |
| 11 | Crear User entity | `core/src/entities/user.entity.ts` | 0.5h |
| 12 | Crear BillData entity | `core/src/entities/bill-data.entity.ts` | 0.5h |
| 13 | Crear MicrogridResult entity | `core/src/entities/microgrid-result.entity.ts` | 0.5h |
| 14 | Crear Value Objects: Money, Coordinate, Consumption, Irradiance | `core/src/value-objects/*.ts` | 2h |
| 15 | Crear interfaces de repositorios (puertos) | `core/src/repositories/*.ts` | 1h |
| 16 | Crear enums: SimulationType, PanelTechnology, BusinessSector | `core/src/enums/*.ts` | 0.5h |
| **17** | **🏆 MicrogridSizerService — Lógica de dimensionamiento** | `core/src/services/microgrid-sizer.service.ts` | **4h** |
| **18** | **🏆 FinancialCalculatorService — ROI, Payback, LCOE** | `core/src/services/financial-calculator.service.ts` | **4h** |
| **19** | **🏆 PanelSelectorService — Recomendación de paneles** | `core/src/services/panel-selector.service.ts` | **2h** |
| **Subtotal** | | | **16.5h** |

### FASE 2: Casos de Uso (20% - 35%)
| # | Tarea | Archivos | Estimación |
|---|---|---|---|
| 20 | Crear DTOs con Zod schemas (entrada/salida) | `application/src/dto/*.ts` | 3h |
| 21 | Crear mappers (Entity ↔ DTO ↔ Firestore) | `application/src/mappers/*.ts` | 2h |
| 22 | **🏆 ExtractBillDataUseCase** — Gemini OCR | `application/src/use-cases/extract-bill-data.use-case.ts` | **3h** |
| 23 | **🏆 EstimateConsumptionUseCase** — INE + rubro + zona | `application/src/use-cases/estimate-consumption.use-case.ts` | **2h** |
| 24 | **🏆 GetSolarDataUseCase** — NASA POWER | `application/src/use-cases/get-solar-data.use-case.ts` | **2h** |
| 25 | **🏆 CalculateMicrogridUseCase** — Orquestación completa | `application/src/use-cases/calculate-microgrid.use-case.ts` | **4h** |
| 26 | CreateSimulationUseCase | `application/src/use-cases/create-simulation.use-case.ts` | 1.5h |
| 27 | GetSimulationUseCase | `application/src/use-cases/get-simulation.use-case.ts` | 1h |
| 28 | ListSimulationsUseCase | `application/src/use-cases/list-simulations.use-case.ts` | 1.5h |
| 29 | DeleteSimulationUseCase | `application/src/use-cases/delete-simulation.use-case.ts` | 1h |
| 30 | CreateUserUseCase | `application/src/use-cases/create-user.use-case.ts` | 1h |
| 31 | GetUserProfileUseCase | `application/src/use-cases/get-user-profile.use-case.ts` | 0.5h |
| **Subtotal** | | | **22.5h** |

### FASE 3: Infraestructura (35% - 52%)
| # | Tarea | Archivos | Estimación |
|---|---|---|---|
| 32 | **🏆 GeminiClient** — Integración Google AI API | `infrastructure/src/gemini/*.ts` | **4h** |
| 33 | **🏆 NASA POWER Client** — API de irradiación | `infrastructure/src/nasa/nasa-power.client.ts` | **2h** |
| 34 | UserRepository (Firestore) | `infrastructure/src/firestore/user.repository.ts` | 2h |
| 35 | SimulationRepository (Firestore) | `infrastructure/src/firestore/simulation.repository.ts` | 3h |
| 36 | PricingRepository (datos de precios) | `infrastructure/src/firestore/pricing.repository.ts` | 1.5h |
| 37 | AuthAdapter (Firebase Auth) | `infrastructure/src/auth/auth.adapter.ts` | 2h |
| 38 | BillFileRepository (Cloud Storage) | `infrastructure/src/storage/bill-file.repository.ts` | 1.5h |
| 39 | HTTP Client (axios/fetch wrapper) | `infrastructure/src/http/http-client.ts` | 1h |
| **Subtotal** | | | **17h** |

### FASE 4: API / Cloud Functions (52% - 68%)
| # | Tarea | Archivos | Estimación |
|---|---|---|---|
| 40 | AuthMiddleware — Verificar Firebase ID Token | `api/src/middleware/auth.middleware.ts` | 2h |
| 41 | ValidationMiddleware — Zod schemas en requests | `api/src/middleware/validation.middleware.ts` | 1.5h |
| 42 | ErrorHandlerMiddleware — Respuestas estandarizadas | `api/src/middleware/error-handler.middleware.ts` | 1.5h |
| 43 | CorrelationIdMiddleware | `api/src/middleware/correlation-id.middleware.ts` | 0.5h |
| 44 | **🏆 extractBill function** | `api/src/functions/simulation/extract-bill.function.ts` | **3h** |
| 45 | **🏆 calculate function** | `api/src/functions/simulation/calculate.function.ts` | **3h** |
| 46 | create simulation function | `api/src/functions/simulation/create.function.ts` | 2h |
| 47 | get simulation function | `api/src/functions/simulation/get.function.ts` | 1.5h |
| 48 | list simulations function | `api/src/functions/simulation/list.function.ts` | 2h |
| 49 | delete simulation function | `api/src/functions/simulation/delete.function.ts` | 1h |
| 50 | user profile function | `api/src/functions/user/get-profile.function.ts` | 1.5h |
| 51 | getPanels function (catálogo actualizado) | `api/src/functions/pricing/get-panels.function.ts` | 1h |
| 52 | healthCheck function | `api/src/functions/admin/health-check.function.ts` | 0.5h |
| 53 | Firestore trigger: onSimulationCreated | `api/src/triggers/on-simulation-created.trigger.ts` | 1h |
| **Subtotal** | | | **22h** |

### FASE 5: Catálogo de Datos (68% - 75%)
| # | Tarea | Archivos | Estimación |
|---|---|---|---|
| **54** | **🏆 PANEL_CATALOG — Catálogo completo de 30+ paneles** | `shared/src/constants/panel-catalog.ts` | **4h** |
| 55 | Business sectors + consumos INE Bolivia | `shared/src/constants/business-sectors.ts` | 2h |
| 56 | Import costs matrix (FOB + flete + GA + IVA) | `shared/src/constants/import-costs.ts` | 1.5h |
| 57 | CRE tariffs data | `shared/src/constants/cre-tariffs.ts` | 1h |
| 58 | Math utils (TIR, VAN, NPV calc) | `shared/src/utils/math.utils.ts` | 2h |
| **Subtotal** | | | **10.5h** |

### FASE 6: Testing (75% - 90%)
| # | Tarea | Archivos | Estimación |
|---|---|---|---|
| 59 | Tests unitarios: MicrogridSizerService | `core/src/services/microgrid-sizer.service.spec.ts` | 3h |
| 60 | Tests unitarios: FinancialCalculatorService | `core/src/services/financial-calculator.service.spec.ts` | 3h |
| 61 | Tests unitarios: PanelSelectorService | `core/src/services/panel-selector.service.spec.ts` | 1.5h |
| 62 | Tests unitarios: todos los Value Objects | `core/src/value-objects/*.spec.ts` | 1.5h |
| 63 | Tests unitarios: todos los Use Cases | `application/src/use-cases/*.spec.ts` | 4h |
| 64 | Tests integración: SimulationRepository (emulador) | `infrastructure/src/firestore/simulation.repository.spec.ts` | 2h |
| 65 | Tests integración: GeminiClient (mock) | `infrastructure/src/gemini/gemini.client.spec.ts` | 1.5h |
| 66 | Tests integración: NASA Client (mock) | `infrastructure/src/nasa/nasa-power.client.spec.ts` | 1h |
| 67 | Tests E2E: flujo completo de simulación | `api/src/functions/simulation/*.e2e.spec.ts` | 3h |
| 68 | Firebase Security Rules tests | `firestore.rules.spec.ts` | 1.5h |
| 69 | CI/CD: GitHub Actions (lint → test → build → deploy) | `.github/workflows/backend-ci.yml` | 2h |
| **Subtotal** | | | **24h** |

### FASE 7: Producción (90% - 100%)
| # | Tarea | Archivos | Estimación |
|---|---|---|---|
| 70 | Cloud Monitoring dashboards + alertas | Firebase Console | 1.5h |
| 71 | Cloud Trace distributed tracing | `infrastructure/src/logging/tracer.ts` | 1h |
| 72 | Optimización cold starts (minInstances) | Cada function config | 1h |
| 73 | Backup strategy Firestore | `firebase.json` + cron | 1h |
| 74 | Documentación técnica + ADRs | `docs/`, `README.md` | 2h |
| 75 | Runbook (procedimientos de incidentes) | `docs/runbook.md` | 1.5h |
| 76 | Final security review | — | 2h |
| **Subtotal** | | | **10h** |

---

## 📊 RESUMEN DE ESFUERZO

| Fase | Horas | % |
|---|---|---|
| FASE 0: Fundamentos | 6h | 5% |
| FASE 1: Dominio puro | 16.5h | 13% |
| FASE 2: Casos de Uso | 22.5h | 18% |
| FASE 3: Infraestructura | 17h | 14% |
| FASE 4: API / Functions | 22h | 18% |
| FASE 5: Catálogo de Datos | 10.5h | 9% |
| FASE 6: Testing | 24h | 19% |
| FASE 7: Producción | 10h | 8% |
| **TOTAL** | **128.5h** | **100%** |

---

## 🏆 ARCHIVOS CRÍTICOS (Prioridad Alta)

| Prioridad | Archivo | Por qué |
|---|---|---|
| 🔴 #1 | `shared/src/constants/panel-catalog.ts` | Catálogo de paneles con precios landed SCZ — sin esto el simulador no funciona |
| 🔴 #2 | `core/src/services/microgrid-sizer.service.ts` | Motor de dimensionamiento — corazón del producto |
| 🔴 #3 | `core/src/services/financial-calculator.service.ts` | ROI, payback, LCOE — lo que ve el decisor |
| 🔴 #4 | `infrastructure/src/gemini/gemini.client.ts` | OCR de facturas — Gemini es el diferenciador |
| 🔴 #5 | `application/src/use-cases/calculate-microgrid.use-case.ts` | Orquestación del flujo completo |
| 🔴 #6 | `api/src/functions/simulation/extract-bill.function.ts` | Endpoint que llama el frontend para subir factura |
| 🔴 #7 | `api/src/functions/simulation/calculate.function.ts` | Endpoint que llama el frontend para calcular |

---

## ✅ CHECKLIST DE ENTREGA

- [ ] `pnpm install` y `pnpm dev` funcionan
- [ ] Firebase Emulator Suite corre localmente con datos seed
- [ ] Todos los paquetes compilan (`tsc --noEmit`) sin errores
- [ ] Tests pasan (`pnpm test`) con >80% coverage en core + application
- [ ] Gemini extrae datos de factura CRE real correctamente
- [ ] NASA POWER devuelve irradiación para coordenadas de Santa Cruz
- [ ] MicrogridSizerService dimensiona correctamente (validado con casos reales)
- [ ] FinancialCalculatorService produce payback, ROI, LCOE coherentes
- [ ] Endpoints HTTP responden con formato estandarizado
- [ ] Autenticación funciona (Google Sign-In → token → verified)
- [ ] Firestore Security Rules pasan tests de emulador
- [ ] CI/CD pipeline verde en GitHub Actions
- [ ] README con instrucciones de setup, arquitectura y contribución
- [ ] Deploy a Firebase sin errores (`firebase deploy --only functions`)
