# ☀️ Bytex — Marketplace de Soberanía Energética

**Hackathon Build With AI 2026 — GDG Santa Cruz, Bolivia**

Bytex es el **marketplace que conecta empresas que buscan independencia energética con proveedores solares certificados**, mediado por análisis de IA personalizado con datos locales reales.

**El problema:** Bolivia agotará sus reservas de gas antes de 2031. La tarifa eléctrica subsidiada subirá a precio internacional. Las empresas que construyan su infraestructura energética hoy pagan la mitad vs. entonces.

**La solución:** Subís tu factura CRE → en 3 minutos la IA te dice exactamente qué sistema necesitás, cuánto te cuesta, cuándo lo recuperás y quién te lo instala — verificado, con proveedores certificados.

---

## 🎥 Pitch Video

**[Ver presentación en YouTube](https://youtu.be/i2WWp4aqUr4)** — Pitch de 5–7 minutos mostrando el problema, la solución, números verificados y el equipo.

---

## 📊 Investigación Completa

Para entender la oportunidad de mercado, análisis competitivo, modelo de negocio y proyecciones financieras:

👉 **[Leer INVESTIGACION.md](INVESTIGACION.md)** — Documento completo con:
- Lean Canvas
- Modelo de Negocio (Fase 1 + Fase 2)
- Análisis de Mercado (TAM: $80M–$200M)
- Análisis Competitivo
- FODA
- PESTEL
- Análisis Financiero

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

| Documento | Contenido |
|-----------|-----------|
| **[INVESTIGACION.md](INVESTIGACION.md)** | **📊 Investigación completa consolidada** — Lean Canvas, Modelo de Negocio, Mercado, FODA, PESTEL, Financiero |
| [`docs/algoritmo-simulador.md`](docs/algoritmo-simulador.md) | 🧮 Algoritmo completo con fórmulas, cálculos financieros, diagrama de flujo |
| [`research/`](research/) | Archivos de investigación originales (detalles específicos si necesitas profundizar) |
| [`ARCHITECTURE.md`](docs/algoritmo-simulador.md#arquitectura-técnica) | 🏗️ Stack tecnológico (Angular, Express, Gemini, NASA POWER) |

---

## 👥 Equipo ByteX
Integrantes: 
Julio Cesar Severiche Orellana -
Denikin Santos Uño -
Elizabeth Peña Rivero

Proyecto desarrollado para el **Hackathon Build With AI 2026** organizado por **GDG Santa Cruz, Bolivia**.


<p align="center">☀️ <strong>Bytex</strong> — Soberanía Energética para Empresas de Santa Cruz</p>
