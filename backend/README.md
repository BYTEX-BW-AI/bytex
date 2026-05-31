# ☀️ Bytex — Backend (API REST)

Backend del simulador de microredes solares para empresas de Santa Cruz, Bolivia.
Construido con **TypeScript**, **Express.js 4.21**, **Prisma ORM** y **Gemini AI**.

---

## 🚀 Stack

| Tecnología | Versión | Uso |
|-----------|---------|-----|
| TypeScript | 5.7 | Lenguaje |
| Express.js | 4.21 | Servidor REST |
| Prisma | 6.2 | ORM PostgreSQL |
| PostgreSQL | 16 | Base de datos |
| Gemini API | 2.5 Flash-Lite | OCR de facturas CRE |
| Zod | 3.24 | Validación |
| dotenv | — | Variables de entorno |

## 📁 Estructura (Hexagonal)

```
src/
├── index.ts                    # Entry point, rutas Express
├── core/
│   ├── calculator.ts           # Orquestador: sizing + financial + scenarios
│   ├── microgrid-sizer.service.ts     # Dimensionamiento de equipos
│   ├── financial-calculator.service.ts # Payback, TIR, VAN, LCOE
│   ├── exchange-rate.service.ts       # dolarapi.com (tipo de cambio)
│   ├── panel-catalog.ts               # 6 paneles con precios landed SCZ
│   └── types.ts                       # Interfaces compartidas
```

## 🔌 Endpoints

| Método | Ruta | Descripción |
|--------|------|-------------|
| `GET` | `/health` | Health check |
| `GET` | `/api/panels` | Catálogo de 6 paneles solares |
| `GET` | `/api/panels/:id` | Detalle de un panel |
| `GET` | `/api/sectors` | Rubros empresariales (INE Bolivia) |
| `GET` | `/api/zones` | Zonas de Santa Cruz con coordenadas |
| `GET` | `/api/solar-data` | Irradiancia solar (NASA POWER) |
| `POST` | `/api/simulation/extract-bill` | OCR con Gemini — extrae datos de factura |
| `POST` | `/api/simulation/calculate` | **Cálculo principal** de la microred |
| `POST` | `/api/simulation/estimate-consumption` | Estimación por sector/ zona |

## 📐 Algoritmo de cálculo

Ver [`docs/algoritmo-simulador.md`](../docs/algoritmo-simulador.md) para la documentación completa.

### Flujo resumido

```
Factura (img/PDF)
    → Gemini OCR → consumoKwh, costoTotalBs
    → Tipo de cambio (dolarapi.com) → Bs → USD
    → MicrogridSizer → paneles, inversor, baterías, MPPT
    → Desglose CapEx → hardware + transporte + instalación + ingeniería
    → FinancialCalculator → payback, TIR, VAN, LCOE, ahorro 25a
    → 3 Escenarios → pesimista (+3%), base (+5.2%), optimista (+8%)
    → Impacto ambiental → CO₂, árboles, agua
```

## 🛠️ Desarrollo

```bash
# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env
# Editar .env con GEMINI_API_KEY y DATABASE_URL

# Iniciar servidor de desarrollo
npx tsx src/index.ts

# Compilar a JS
npx tsc
```

### Variables de entorno (`.env`)

Crear a partir del template:

```bash
cp .env.example .env
```

```env
PORT=3001
DATABASE_URL=postgresql://bytex:bytex_secret@localhost:5432/bytex
GEMINI_API_KEY=tu_key_aqui
```

## 💱 Tipo de cambio

Se obtiene en tiempo real desde [`https://bo.dolarapi.com/v1/dolares/binance`](https://bo.dolarapi.com/v1/dolares/binance) (dólar Binance — mercado paralelo Bolivia).
Cacheado por 1 hora. Fallback a 6.96 Bs/USD si la API no responde.

## 🤖 Gemini OCR

El endpoint `extract-bill` analiza imágenes JPG/PNG o archivos PDF de facturas CRE usando `gemini-2.5-flash-lite`. Extrae:
- `consumoKwh`: consumo del último mes
- `costoTotalBs`: importe total a pagar
- `periodoFacturacion`, `nombreCliente`, `nit`, `tarifa`, `numeroFactura`

## 🐳 Docker

```bash
docker compose up --build
```

---

*Proyecto para el Hackathon Build With AI 2026 — GDG Santa Cruz, Bolivia.*
