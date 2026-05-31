# 🌞 Soberanía Energética — Marketplace de IA para independencia energética en Bolivia

> **Bolivia agotó el gas que alimenta el 70% de su electricidad. Antes de 2031 la tarifa sube. Las empresas que construyan su infraestructura hoy van a estar protegidas. Las que esperen van a pagar el doble.**

[![Hackathon](https://img.shields.io/badge/hackathon-Build%20With%20AI%202026-blue)](https://gdg.community.dev/events/details/google-developer-groups-santa-cruz-presents-build-with-ai-hackathon-2026/)
[![Tech Stack](https://img.shields.io/badge/stack-Angular%2B%2BFirebase%2B%2BGemini-orange)](https://firebase.google.com/)
[![License](https://img.shields.io/badge/license-MIT-green)](#licencia)

---

## 🎯 El Problema

**Bolivia tiene un problema energético con fecha de vencimiento.**

- 🔴 **Reservas de gas:** cayeron 65% en 12 años (10.45 → 3.7 TCF)
- 🔴 **Importación de gas:** YPFB admitió (marzo 2026) que Bolivia importará antes de 2031
- 🔴 **Costo:** ~$400M/año adicionales → tarifa eléctrica sube de $0.084 a $0.15–$0.20/kWh
- 🔴 **Empresas afectadas:** 10.000–12.000 empresas B2B en Santa Cruz sin solución clara

**Status quo:** Las empresas consultan a instaladoras de forma aislada, sin datos reales, sin ROI personalizado, sin comparación objetiva entre proveedores.

---

## ✅ Nuestra Solución

**Un marketplace de IA que analiza tu situación energética real y te conecta con proveedores certificados.**

### Flujo del cliente en 3 pasos

**1. Subís tu factura CRE (o seleccionás tu rubro)**
```
Foto de factura → Gemini 2.5 extrae kWh, kW pico, costo real
                → NASA POWER API entrega irradiación solar de tu zona
                → Calculadora de IA dimensiona el sistema exacto que necesitás
```

**2. La IA te analiza y recomienda**
```
"Para lograr 70% de independencia con tu consumo de 47.000 kWh/mes en Warnes:
 • 182 paneles 550W + 10 baterías Pylontech + inversor Huawei 100kW
 • Costo: $58.000–$72.000 | Payback: 4.8 años
 • CO₂ evitado: 59 ton/año"
```

**3. Elegís tu proveedor**
```
3 proveedores certificados en tu zona
↓
Ordenados por precio, tiempo de instalación, reputación
↓
Cotización directa, instalación verificada, monitoreo en tiempo real
```

### Por qué esto gana la hackathon

✅ **Gemini es el motor central** — no decorativo. Extrae datos, razona sobre sizing, personaliza.  
✅ **Problema validado** — 10.000+ empresas, datos reales.  
✅ **Solución viable** — MVP en 36h, stack 100% gratuito.  
✅ **Impacto medible** — marketplace de dos lados, escala sin capital.

---

## 🚀 Quick Start (2 minutos)

```bash
git clone https://github.com/BYTEX-BW-AI/bytex.git
cd bytex
npm install
npm run dev
```

La app abre en `http://localhost:5173`

---

## 🏗️ Arquitectura Técnica

| Capa | Tecnología |
|---|---|
| Frontend | Angular 18 + PWA |
| Backend | Firebase Cloud Functions |
| Database | Cloud Firestore |
| **IA + OCR** | **Gemini 2.5 Flash-Lite** |
| Solar Data | **NASA POWER API** |
| Hosting | Firebase Hosting |

---

## 📊 Mercado

- **117.894 empresas en Santa Cruz** (29.9% de Bolivia)
- **10.000–12.000 energo-intensivas** (target real)
- **27 empresas solares activas** (proveedores potenciales)
- **0 simuladores con IA en Bolivia** (espacio vacío)

---

## 📈 Modelo de Negocio

Marketplace de dos lados:
- **Clientes:** App gratuita + análisis IA
- **Proveedores:** Suscripción $150–$700/mes + comisión 3–5%

**Revenue año 1:** $132K (margen 53%)

---

## 📁 Estructura del Repo

```
bytex/
├── src/app/
├── functions/
├── research/
└── README.md
```

---

## 📜 Licencia

MIT License

---

**Hecho con ❤️ para la soberanía energética de Bolivia.**
