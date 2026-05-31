# 🌞 Soberanía Energética — Marketplace de IA para independencia energética en Bolivia

> **Bolivia agotó el gas que genera el 66% de su electricidad. En 2031 tendrá que importar gas a precio internacional. Las empresas que construyan infraestructura propia hoy pagarán 50–60% menos que las que esperen.**

**Status:** Negocio real en validación. Compite en hackathon Build With AI 2026.

---

## 🎯 El Problema Real (Verificable)

### Colapso de reservas de gas en Bolivia
- **2013:** 10.45 TCF de reservas probadas
- **2026 (hoy):** 3.7 TCF (caída del 65%)
- **2031:** Bolivia importará gas a precio internacional

**Fuente:** [YPFB advierte que Bolivia podría importar gas desde 2031](https://prensamercosur.org/2026/04/01/reservas-de-gas-caen-a-37-tcf-y-ypfb-advierte-que-bolivia-podria-importar-gas-desde-2031/)

### Electricidad = Gas quemado
- **66% de la electricidad viene de termoeléctricas a gas natural**
- Cuando Bolivia importe gas, el costo sube de $0.084 a $0.15–$0.20/kWh

**Fuente:** [World Bank: Electricity generation from gas in Bolivia](https://datos.bancomundial.org/indicador/EG.ELC.NGAS.ZS?locations=BO)

### Mercado cautivo: 10.000–12.000 empresas B2B en Santa Cruz
- **117.894 empresas registradas en Santa Cruz** (29.9% de Bolivia)
- **Energo-intensivas:** 10.000–12.000 empresas

**Fuente:** [SEPREC Base Empresarial 2025](https://www.seprec.gob.bo/)

### No existe simulador con IA en Bolivia
**Hallazgo crítico:** Ninguna empresa ofrece análisis de IA + marketplace integrado.

---

## ✅ Nuestra Solución

Marketplace de IA que analiza la energía real de una empresa y la conecta con proveedores certificados.



**Output:** Recomendación personalizada con ROI exacto.

---

## 💰 Modelo de Negocio

Marketplace de dos lados. **NO somos instaladores.**

### Revenue Streams (Año 1)

| Stream | Precio | Volumen | Revenue anual |
|---|---|---|---|
| Suscripción proveedores | $150–$700/mes | 5 proveedores promedio | $28.000 |
| Comisión por deal | 3–5% proyecto | 30 deals × $2.500 | $84.000 |
| Leads calificados | $50–$150 | 200 leads × $75 | $15.000 |
| **TOTAL** | — | — | **$132.000** |

**Margen operativo: 53%** (vs. 20–32% instaladora directa)

---

## 🏗️ Tech Stack (MVP)

| Componente | Tecnología |
|---|---|
| Frontend | Angular 18 + PWA |
| Backend | Firebase Cloud Functions |
| Database | Cloud Firestore |
| **IA Central** | **Gemini 2.5 Flash-Lite** |
| **Datos solares** | **NASA POWER API** |
| Hosting | Firebase Hosting |

**Costo:** $0 (free tiers)

---

## 🚀 Quick Start

```bash
# 1. Backend — configurar variables de entorno
cd backend
cp .env.example .env
# Editar .env con GEMINI_API_KEY
npm install
npm run dev

# 2. Frontend (otra terminal)
cd frontend
npm install
npm start
```

Demo en vivo: https://bytex-demo.web.app

---

## 🧠 Cómo funciona el simulador

### Flujo de análisis en 5 pasos

```
Empresa sube factura CRE (JPG/PNG/PDF)
         ↓
   Gemini OCR extrae: consumo (kWh), pico (kW), costo (Bs)
         ↓
NASA POWER API entrega irradiación solar real (4.8 kWh/m²/día Santa Cruz)
         ↓
Motor de sizing calcula: paneles, inversor, baterías, MPPT necesarios
         ↓
FinancialCalculator devuelve: payback, TIR, VAN, ahorro 25 años
         ↓
Salida: "Necesitás X paneles + Y baterías + Z inversor. Payback: 4.5 años. 3 proveedores en tu zona pueden instalarlo."
```

### Funcionalidades principales

| Feature | Descripción |
|---------|-------------|
| 📷 **OCR con Gemini 2.5** | Extrae consumo, costo, tarifa de facturas CRE automáticamente |
| ⚡ **Dimensionamiento dinámico** | Calcula paneles, inversor, baterías modulares y MPPT según consumo real |
| 📈 **Proyección 25 años** | Gráfico interactivo Chart.js: CRE vs Solar, break-even visual |
| 📊 **3 Escenarios** | Pesimista (+3%), Base (+5.2%), Optimista (+8%) con ROI en cada uno |
| 💰 **Análisis financiero** | Payback, TIR (Newton-Raphson), VAN, LCOE, ahorro acumulado |
| 🌍 **Impacto ambiental** | CO₂ evitado, árboles equivalentes, litros de agua ahorrados vs grid boliviano |
| 🔐 **Datos reales** | NASA POWER API (irradiación verificada), tarifas CRE oficiales |

---

## 🛠️ Stack Técnico Completo

```
Frontend:
├─ Angular 21.2 (standalone components)
├─ NgRx 21.1 (state management)
├─ TailwindCSS 3.4 (styling)
├─ Chart.js 4.5 (gráficos)
├─ AngularFire (Firebase integration)
└─ PWA (offline-ready)

Backend:
├─ TypeScript 5.7 (type-safe)
├─ Express 4.21 (HTTP routing)
├─ Gemini 2.5 Flash-Lite API (IA core)
├─ NASA POWER API (solar data)
├─ Prisma 6.2 (data layer)
└─ PostgreSQL 16 (persistence)

Infrastructure:
├─ Docker (containerization)
├─ Firebase Hosting (frontend)
└─ Cloud Firestore (post-MVP)

Free Tier Services:
├─ Gemini API: 1.000 req/día free
├─ NASA POWER: gratuita sin límite
├─ Firebase: Spark plan + Blaze for growth
└─ Costo MVP: $0/mes
```

**Arquitectura:** Core domain (calculadora pura) → Application layer (orquestación) → Infrastructure (APIs externas + persistencia)

---

## 📊 Análisis de mercado incluido

El repositorio contiene análisis completo:
- **research/lean-canvas.md** — 9 bloques: problema, solución, TAM $80–$200M
- **research/business-model.md** — Modelo marketplace + Fase 2 (instaladora propia)
- **research/financial-analysis.md** — Proyección 3 años, margen 53–71%, break-even Q1
- **research/competitive-analysis.md** — 27 competidores solares analizados, FODA, PESTEL
- **research/market-research.md** — Santa Cruz: 117k empresas, 10-12k target, PILAT beachhead

---

## 🎯 Roadmap

**Fase 1 (ahora):** Marketplace MVP
- Clientes corren simulaciones gratis
- Proveedores pagan suscripción + comisión por deals
- Revenue: $132k año 1

**Fase 2 (año 2):** Instaladora propia
- Con datos + relaciones de Fase 1
- Bytex importa equipos y ofrece EaaS
- Márgenes: 35–40% en instalaciones

**Fase 3 (año 3+):** Plataforma IoT completa
- Monitoreo remoto de sistemas 24/7
- Mantenimiento predictivo con IA
- SaaS recurrente para operación

---

## 🔗 Todas las Fuentes

- [YPFB: Bolivia importará gas desde 2031](https://prensamercosur.org/2026/04/01/)
- [World Bank: Electricity from gas](https://datos.bancomundial.org/indicador/EG.ELC.NGAS.ZS?locations=BO)
- [SEPREC: Empresas registradas](https://www.seprec.gob.bo/)
- [CRE: Tarifas oficiales](https://www.cre.com.bo/)
- [PILAT](https://pilatsrl.com/)
- [Enersol](https://www.enersol-sa.com/)
- [InnovaSol](https://innovasol.com.bo/)

---

**Negocio real. La hackathon es solo la primera etapa.**

Hecho con ❤️ para la soberanía energética de Bolivia.
