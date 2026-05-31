# Algoritmo del Simulador de Soberanía Energética — Bytex

## Arquitectura del cálculo

```
Factura CRE (imagen/PDF)
        │
        ▼
   ┌─────────────┐
   │  Gemini OCR  │ ← Extrae consumo, costo, tarifa, cliente
   └──────┬──────┘
          │ { consumoKwh: 564, costoTotalBs: 679.60 }
          ▼
   ┌─────────────────┐
   │  Calculadora    │ ← Algoritmo principal
   │  Microred Solar │
   └──────┬──────────┘
          │
          ├──► MicrogridSizer     → Paneles, inversor, baterías, MPPT
          ├──► FinancialCalculator → Payback, TIR, VAN, LCOE, ahorro
          ├──► Escenarios          → Pesimista / Base / Optimista
          └──► ExchangeRateAPI     → Tipo de cambio en vivo
```

---

## 1. Extracción de datos (Gemini OCR)

**Endpoint:** `POST /api/simulation/extract-bill`

**Input:** Imagen o PDF en base64 + MIME type.

**Proceso:**
1. Se envía la imagen/PDF a `gemini-2.5-flash-lite` con un prompt que pide extraer campos específicos de una factura CRE.
2. Gemini devuelve JSON con:
   - `consumoKwh` — consumo del último mes en kWh
   - `costoTotalBs` — importe total a pagar en bolivianos
   - `periodoFacturacion` — período de la factura
   - `nombreCliente`, `nit`, `tarifa`, `numeroFactura`
3. El JSON se parsea y devuelve al frontend.

**Fallback:** Si no hay `GEMINI_API_KEY`, se devuelven datos simulados (solo para desarrollo).

---

## 2. Dimensionamiento del sistema (MicrogridSizer)

**Endpoint:** `POST /api/simulation/calculate`

### 2.1 Consumo diario

```
dailyConsumption = monthlyConsumptionKwh / 30
```

### 2.2 Paneles solares

Se calcula cuántos paneles se necesitan para cubrir el consumo diario:

```
dailyGenerationPerPanel = (panelWattPeak / 1000) × irradiance × efficiency
panelCount = ceil(dailyConsumption / dailyGenerationPerPanel)
```

Donde:
- `panelWattPeak`: potencia pico del panel seleccionado (ej: 670W para Jinko)
- `irradiance`: 4.8 kWh/m²/día (Santa Cruz, fuente NASA POWER)
- `efficiency`: 0.86 (pérdidas del 14% por inversor, cableado, temperatura)

### 2.3 Potencia pico del sistema

```
peakPowerKw = (panelCount × panelWattPeak) / 1000
```

### 2.4 Inversor (selección dinámica)

Se selecciona el inversor del tamaño estándar más cercano por encima de la potencia requerida:

```
requiredInverterKw = peakPowerKw × 1.2  // 20% de sobredimensionamiento
```

**Catálogo de inversores:**

| Tamaño | Precio USD | Uso típico |
|--------|-----------|------------|
| 3 kW   | $450      | 1-4 paneles |
| 5 kW   | $750      | 5-7 paneles |
| 8 kW   | $1,100    | 7-10 paneles |
| 10 kW  | $1,400    | 10-14 paneles |
| 15 kW  | $1,900    | 14-20 paneles |
| 20 kW  | $2,400    | 20-28 paneles |
| 30 kW  | $3,300    | 28-42 paneles |
| 50 kW  | $5,200    | 42-70 paneles |
| 100 kW | $9,500    | 70+ paneles |

### 2.5 Baterías (autonomía nocturna)

```
batteryKwhRequired = dailyConsumption × 0.5  // 50% del consumo diario
```

**Módulos de batería disponibles (BYD HVM):**

| Capacidad | Precio USD | Modelo |
|-----------|-----------|--------|
| 2.5 kWh   | $1,200    | BYD HVM 2.5 |
| 5 kWh     | $2,200    | BYD HVM 5.1 |
| 10 kWh    | $3,800    | BYD HVM 10.2 |
| 15 kWh    | $5,400    | BYD HVM 15.3 |

Se selecciona el módulo cuya capacidad individual más se acerque (por defecto) a la requerida:

```
batteryCount = ceil(batteryKwhRequired / selectedModule.kwh)
```

### 2.6 MPPT (Controlador de carga)

Se selecciona un MPPT del tamaño adecuado para la potencia del sistema:

```
mpptRequiredKw = peakPowerKw
// Seleccionar el MPPT estándar más cercano
mpptUnit = MPPT_OPTIONS.find(m => m.kw >= mpptRequiredKw)
mpptCount = ceil(mpptRequiredKw / mpptUnit.kw)
```

**Catálogo MPPT:**

| Tamaño | Precio USD |
|--------|-----------|
| 3 kW   | $200      |
| 5 kW   | $350      |
| 8 kW   | $500      |
| 10 kW  | $650      |
| 15 kW  | $950      |
| 20 kW  | $1,200    |
| 30 kW  | $1,700    |
| 50 kW  | $2,600    |

### 2.7 Área requerida

```
areaM2 = panelCount × panel.areaM2
```

### 2.8 Generación estimada

```
dailyGenerationKwh = panelCount × dailyGenerationPerPanel
monthlyGenerationKwh = dailyGenerationKwh × 30
```

---

## 3. Desglose de costos (CapEx)

Todos los costos están en USD. Se calculan así:

### 3.1 Costos de hardware

| Componente | Fórmula |
|-----------|---------|
| Paneles | `panelCount × panel.priceLanded` |
| Inversor | `inverterCount × inverterUnitPrice` |
| Baterías | `batteryCount × batteryModulePrice` |
| MPPT | `mpptCount × mpptUnitPrice` |
| Estructura + cableado | `areaM2 × $15/m²` |
| Instalación | `totalWattPeak × $0.30/W` |

### 3.2 Transporte escalable

Ya no es un costo fijo. Escala según la cantidad de equipos:

```
transportCost = $800 (base)
              + panelCount × $8/panel
              + inverterCount × $50/inversor
              + batteryCount × $80/batería
              + mpptCount × $30/MPPT
```

### 3.3 Ingeniería y permisos

```
engineeringCost = hardwareCost × 0.08  // 8% del hardware
```

### 3.4 CapEx total

```
totalCapEx = hardwareCost + installCost + transportCost + engineeringCost
```

### 3.5 O&M (Operación y Mantenimiento)

El costo anual de O&M varía según la complejidad del sistema:

```
oamRate = batteryCount > 0 ? 0.015 : 0.008  // 1.5% con baterías, 0.8% sin
annualOandM = totalCapEx × oamRate
```

---

## 4. Cálculos financieros (FinancialCalculator)

### 4.1 Tipo de cambio

Se obtiene en tiempo real desde `https://bo.dolarapi.com/v1/dolares/binance`.
Cacheado por 1 hora. Fallback a 6.96 Bs/USD si la API no responde.

```
monthlyCreBill = monthlyCostBs / exchangeRate  // Convierte Bs → USD
annualCreCost = monthlyCreBill × 12
```

### 4.2 Proyección de costos CRE (25 años)

Se asume un incremento anual del **5.2%** (histórico Bolivia):

```
creProjection[y] = annualCreCost × (1 + creIncrease)^y  // y = 0..24
```

### 4.3 Proyección de O&M (25 años)

Se asume un incremento anual del **3%** (inflación):

```
oamProjection[y] = annualOandM × (1.03)^y  // y = 0..24
```

### 4.4 Flujo de caja neto

```
netCashflows[0] = -totalCapEx  // Año 0: inversión inicial
netCashflows[y+1] = creProjection[y] - oamProjection[y]  // Años 1..25
```

### 4.5 Payback simple

```
paybackYears = totalCapEx / (annualCreCost - annualOandM)
```

### 4.6 TIR (Tasa Interna de Retorno)

Se calcula resolviendo la ecuación donde el VAN = 0 usando Newton-Raphson:

```
VAN = Σ netCashflows[t] / (1 + TIR)^t = 0
```

Se itera hasta convergencia (máx 1000 iteraciones).

### 4.7 VAN (Valor Actual Neto)

```
VAN = -totalCapEx + Σ creProjection[t] / (1 + discountRate)^t
```

Donde `discountRate = 12%`.

### 4.8 LCOE (Costo Nivelado de Energía)

```
totalKwh25Years = dailyGenerationKwh × 365 × 25 × (1 - degradación)^(25/2)
totalCost25Years = totalCapEx + annualOandM × 25
lcoe = totalCost25Years / totalKwh25Years
```

Donde `degradación = 0.5%` anual.

### 4.9 Ahorro a 25 años

```
totalCre25Years = Σ creProjection[y]  // y = 0..24
totalOam25Years = Σ oamProjection[y]  // y = 0..24
savings = totalCre25Years - totalCapEx - totalOam25Years
```

### 4.10 Yearly Breakdown (año por año)

Se genera un array con 25 elementos, cada uno con:

```
year: y+1
creCumulative: Σ creProjection[0..y]
solarCumulative: totalCapEx + Σ oamProjection[0..y]
savings: creCumulative - solarCumulative
breakEven: creCumulative >= solarCumulative
```

---

## 5. Escenarios

Se calculan 3 escenarios variando el incremento anual de CRE:

| Escenario | Aumento CRE | Interpretación |
|-----------|-------------|----------------|
| Pesimista | +3% anual | Crecimiento económico lento |
| Base | +5.2% anual | Histórico Bolivia |
| Optimista | +8% anual | Crisis energética / inflación alta |

Cada escenario ejecuta el mismo `FinancialCalculator` con distinto `creAnnualIncrease`.

---

## 6. Impacto ambiental

```
co2AvoidedTons = dailyGenerationKwh × 365 × 25 × 0.42 / 1000
treeEquivalent = co2AvoidedTons × 50
waterSavedLiters = dailyGenerationKwh × 365 × 25 × 1.5
```

Donde:
- `0.42 kg CO₂/kWh`: factor de emisión de la red boliviana (mix térmico + gas)
- `50 árboles/ton CO₂`: equivalencia estándar
- `1.5 litros/kWh`: agua ahorrada vs generación térmica

---

## 7. Diagrama de flujo completo

```
                    ╔═══════════════════════╗
                    ║   Usuario sube       ║
                    ║   factura (img/PDF)  ║
                    ╚═══════╦═══════════════╝
                            ▼
            ┌───────────────────────────────┐
            │   Gemini OCR extrae datos     │
            │   consumoKwh, costoTotalBs,   │
            │   nombreCliente, tarifa, NIT  │
            └───────────────┬───────────────┘
                            ▼
            ┌───────────────────────────────┐
            │   Calcula tipo de cambio      │
            │   dolarapi.com (Binance)      │
            │   Cache: 1 hora               │
            └───────────────┬───────────────┘
                            ▼
            ┌───────────────────────────────┐
            │   MicrogridSizer              │
            │   ┌─────────────────────┐     │
            │   │ 1. Paneles necesarios│     │
            │   │ 2. Inversor óptimo  │     │
            │   │ 3. Baterías modulares│    │
            │   │ 4. MPPT requerido   │     │
            │   │ 5. Área y generación│     │
            │   └─────────────────────┘     │
            └───────────────┬───────────────┘
                            ▼
            ┌───────────────────────────────┐
            │   Desglose de costos (CapEx)  │
            │   + Transporte escalable      │
            │   + Ingeniería y permisos     │
            │   + O&M variable              │
            └───────────────┬───────────────┘
                            ▼
            ┌───────────────────────────────┐
            │   FinancialCalculator         │
            │   ┌─────────────────────┐     │
            │   │ Payback simple      │     │
            │   │ Payback descontado  │     │
            │   │ TIR (Newton-Raphson)│     │
            │   │ VAN (12% descuento)│     │
            │   │ LCOE               │     │
            │   │ Ahorro 25 años     │     │
            │   └─────────────────────┘     │
            └───────────────┬───────────────┘
                            ▼
            ┌───────────────────────────────┐
            │   3 Escenarios               │
            │   Pesimista (+3%)            │
            │   Base (+5.2%) ← seleccionado│
            │   Optimista (+8%)            │
            └───────────────┬───────────────┘
                            ▼
            ┌───────────────────────────────┐
            │   Impacto ambiental          │
            │   CO₂, árboles, agua         │
            └───────────────┬───────────────┘
                            ▼
            ╔═══════════════════════════════╗
            ║   Resultados mostrados en     ║
            ║   frontend (Angular + NgRx)   ║
            ║   + Gráfico Chart.js          ║
            ║   + Escenarios comparativos   ║
            ╚═══════════════════════════════╝
```

---

## 8. Stack tecnológico

| Componente | Tecnología |
|-----------|-----------|
| Frontend | Angular 21.2, NgRx, TailwindCSS |
| Backend | TypeScript, Express.js 4.21 |
| OCR | Gemini 2.5 Flash-Lite |
| Base de datos | PostgreSQL 16 + Prisma ORM |
| Charts | Chart.js 4.5 |
| API externa | dolarapi.com (tipo de cambio) |
| Contenedores | Docker + Docker Compose |

---

## 9. Variables clave y sus fuentes

| Variable | Valor | Fuente |
|----------|-------|--------|
| Irradiancia SCZ | 4.8 kWh/m²/día | NASA POWER |
| Incremento CRE anual | 5.2% | Histórico Bolivia |
| Tasa de descuento | 12% | Estándar proyectos Bolivia |
| Degradación anual paneles | 0.5% | Garantía fabricante |
| Factor emisión CO₂ | 0.42 kg/kWh | Mix eléctrico Bolivia |
| Tipo de cambio | 9.96 Bs/USD (variable) | dolarapi.com (Binance) |
| Eficiencia sistema | 86% | Pérdidas estándar |

---

*Documento generado para el Hackathon Build With AI 2026 — GDG Santa Cruz, Bolivia.*
*Bytex: Simulador de Soberanía Energética.*
