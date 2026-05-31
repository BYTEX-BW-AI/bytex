# ☀️ Bytex — Simulador de Soberanía Energética

**Hackathon Build With AI 2026 — GDG Santa Cruz, Bolivia**

Bytex es un simulador que permite a empresas de Santa Cruz comparar el costo de su factura CRE actual vs una microred solar, con datos reales extraídos mediante IA.

---

## 🚀 Demo rápida

```bash
# 1. Backend — configurar variables de entorno
cd backend
cp .env.example .env
# Editar .env con GEMINI_API_KEY
npm install
npx tsx src/index.ts

# 2. Frontend (otra terminal)
cd frontend
npm install
npx ng serve
```

> ⚠️ **Obligatorio**: Copiar `backend/.env.example` → `backend/.env` y configurar `GEMINI_API_KEY` para OCR real.

---

## 🧠 Funcionalidades

| Funcionalidad | Descripción |
|--------------|-------------|
| 📷 **OCR con Gemini** | Subí tu factura CRE (JPG, PNG, PDF) y extraemos consumo, costo, tarifa |
| ⚡ **Dimensionamiento dinámico** | Calculamos paneles, inversor, baterías modulares y MPPT según tu consumo real |
| 📈 **Proyección 25 años** | Gráfico interactivo Chart.js mostrando el cruce CRE vs Solar |
| 📊 **3 Escenarios** | Pesimista (+3%), Base (+5.2%), Optimista (+8%) con payback, TIR y ahorro |
| 💱 **Tipo de cambio en vivo** | dolarapi.com (Binance) — actualizado cada hora |
| 🌱 **Impacto ambiental** | CO₂ evitado, árboles equivalentes, litros de agua ahorrados |
| 🔒 **Sin formularios** | Solo subí tu factura, el resto lo hace la IA |

---

## 🏗️ Stack

```
bytex/
├── frontend/        # Angular 21.2 + NgRx 21.1 + TailwindCSS 3.4 + Chart.js 4.5
├── backend/         # TypeScript + Express 4.21 + Prisma + PostgreSQL 16
├── docs/            # Documentación técnica
│   ├── algoritmo-simulador.md   # Algoritmo completo con fórmulas
│   └── ...                       # Research, arquitectura, análisis de mercado
├── research/        # Investigación de mercado y paneles solares
├── img/             # Imágenes de prueba (facturas CRE)
└── docker-compose.yml
```

---

## 📐 Algoritmo en 5 pasos

```
Factura CRE → Gemini OCR → consumoKwh, costoTotalBs
     ↓
Tipo de cambio (dolarapi.com) → Bs → USD
     ↓
MicrogridSizer → paneles, inversor, baterías modulares, MPPT
     ↓
Desglose CapEx → hardware + transporte escalable + instalación + ingeniería
     ↓
FinancialCalculator → payback, TIR, VAN, LCOE, ahorro 25 años
     ↓
3 Escenarios → pesimista (+3%), base (+5.2%), optimista (+8%)
     ↓
Impacto ambiental → CO₂, árboles, agua
```

📖 Ver [`docs/algoritmo-simulador.md`](docs/algoritmo-simulador.md) para fórmulas completas.

---

## 🖥️ Frontend (`frontend/README.md`)

- **Stack**: Angular 21.2, NgRx 21.1, TailwindCSS 3.4, Chart.js 4.5
- **Estructura**: Feature-based (simulator, auth, dashboard, learn)
- **Estado**: NgRx Store (actions, effects, reducer, selectors)
- **Pipes**: CurrencyUsdPipe, CurrencyBsPipe, NumberFormatPipe, PercentagePipe

```bash
cd frontend
npm install
npx ng serve --host 0.0.0.0 --port 4200
```

---

## ⚙️ Backend (`backend/README.md`)

- **Stack**: TypeScript, Express 4.21, Prisma 6.2, PostgreSQL 16
- **Arquitectura**: Hexagonal (core/application/infrastructure/api)
- **OCR**: Gemini 2.5 Flash-Lite
- **Tipo de cambio**: [`dolarapi.com`](https://bo.dolarapi.com/v1/dolares/binance) (cache 1h)

```bash
cd backend
npm install
cp .env.example .env  # Configurar GEMINI_API_KEY
npx tsx src/index.ts  # Puerto 3001
```

### Endpoints

| Método | Ruta | Descripción |
|--------|------|-------------|
| `GET` | `/health` | Health check |
| `GET` | `/api/panels` | Catálogo de paneles |
| `GET` | `/api/sectors` | Rubros empresariales (INE Bolivia) |
| `GET` | `/api/zones` | Zonas de Santa Cruz |
| `GET` | `/api/solar-data` | Irradiancia solar |
| `POST` | `/api/simulation/extract-bill` | OCR con Gemini |
| `POST` | `/api/simulation/calculate` | Cálculo principal |
| `POST` | `/api/simulation/estimate-consumption` | Estimación por sector |

---

## 🐳 Docker

```bash
docker compose up --build
```

Puertos: PostgreSQL 5432 | Backend 3001 | Frontend 4200

---

## 📊 Catálogo de paneles

| Panel | Tecnología | Potencia | Eficiencia | Precio landed |
|-------|-----------|----------|------------|---------------|
| Jinko Tiger NEO III 78HC | TOPCon | 670W | 24.8% | $108 |
| Aiko Stellar 3N+72 | ABC | 685W | 25.4% | $195 |
| LONGi Hi-MO X10 Scientist | HPBC | 670W | 24.8% | $135 |
| Recom Black Tiger 665W | BC | 665W | 24.8% | $161 |
| Trina Vertex S+ 54c | TOPCon | 475W | 23.8% | $70 |
| PERC Estándar 72c | PERC | 450W | 20.0% | $48 |

---

## 🔑 Variables clave

| Variable | Valor | Fuente |
|----------|-------|--------|
| Irradiancia Santa Cruz | 4.8 kWh/m²/día | NASA POWER |
| Incremento CRE anual | 5.2% | Histórico Bolivia |
| Tasa de descuento | 12% | Estándar proyectos |
| Degradación paneles | 0.5%/año | Garantía fabricante |
| Factor emisión CO₂ | 0.42 kg/kWh | Mix eléctrico Bolivia |
| Tipo de cambio | 9.96 Bs/USD (variable) | dolarapi.com (Binance) |

---

## 📁 Documentación

| Archivo | Contenido |
|---------|-----------|
| [`docs/algoritmo-simulador.md`](docs/algoritmo-simulador.md) | Algoritmo completo con fórmulas y diagrama de flujo |
| [`docs/algoritmo-simulador.md`](research/market-research.md) | Investigación de mercado y paneles |
| [`docs/algoritmo-simulador.md`](research/competitive-analysis.md) | Análisis competitivo |
| [`docs/algoritmo-simulador.md`](research/lean-canvas.md) | Modelo de negocio |
| [`docs/algoritmo-simulador.md`](research/architecture.md) | Arquitectura técnica |

---

## 👥 Equipo

Proyecto desarrollado para el **Hackathon Build With AI 2026** organizado por **GDG Santa Cruz, Bolivia**.

---
<p align="center">☀️ <strong>Bytex</strong> — Soberanía Energética para Empresas de Santa Cruz</p>