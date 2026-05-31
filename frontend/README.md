# ☀️ Bytex — Frontend (Simulador de Soberanía Energética)

Frontend del simulador de microredes solares para empresas de Santa Cruz, Bolivia.
Construido con **Angular 21.2**, **NgRx 21.1**, **TailwindCSS 3.4** y **Chart.js 4.5**.

---

## 🚀 Stack

| Tecnología | Versión | Uso |
|-----------|---------|-----|
| Angular | 21.2 | Framework standalone components |
| NgRx | 21.1 | State management (store, effects, router-store) |
| TailwindCSS | 3.4 | UI con tema dark mode |
| TypeScript | 5.7 | Tipado estricto |
| Chart.js | 4.5 | Gráfico de proyección 25 años |
| Firebase | — | Auth (Google Sign-In) y Hosting |

## 📁 Estructura

```
src/
├── app/
│   ├── core/                    # Servicios globales (api, auth, notificaciones)
│   │   ├── services/
│   │   └── constants/
│   ├── features/
│   │   ├── landing/             # Página de inicio (hero, stats, cómo funciona)
│   │   ├── simulator/           # Flujo principal de simulación
│   │   │   ├── pages/           # input, processing, results, detail
│   │   │   ├── data-access/     # NgRx store, actions, effects, api service
│   │   │   └── components/      # ProjectionChart (Chart.js)
│   │   ├── auth/                # Autenticación con Google
│   │   ├── dashboard/           # Lista de simulaciones guardadas
│   │   └── learn/               # Guía de paneles y regulación
│   └── shared/                  # Componentes reutilizables
│       ├── components/ui/       # Button, Card, Spinner, Toast, FileUploader
│       ├── components/layout/   # Header, Footer, BottomNav, Shell
│       └── pipes/               # CurrencyUsd, CurrencyBs, NumberFormat, etc.
```

## 🔥 Funcionalidades

- **📷 OCR con Gemini**: Subí tu factura CRE (JPG, PNG o PDF) y extraemos los datos automáticamente
- **⚡ Dimensionamiento dinámico**: Calculamos paneles, inversor, baterías modulares y MPPT según tu consumo
- **📈 Proyección 25 años**: Gráfico interactivo Chart.js mostrando el cruce CRE vs Solar
- **📊 Escenarios**: Pesimista (+3%), Base (+5.2%), Optimista (+8%) con payback, TIR y ahorro
- **💱 Tipo de cambio en vivo**: dolarapi.com (Binance) — cacheado 1 hora
- **📱 Diseño responsive**: Funciona en desktop y mobile

## 🛠️ Desarrollo

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npx ng serve --host 0.0.0.0 --port 4200

# Build producción
npx ng build

# Ejecutar tests
npx ng test
```

## 🔗 Backend

El frontend se comunica con el backend en `http://localhost:3001`.

> ⚠️ **Requisito**: El backend necesita una `GEMINI_API_KEY` configurada en
> `backend/.env` para que el OCR funcione. Copiar `backend/.env.example` →
> `backend/.env` y editar.

Ver [`backend/README.md`](../backend/README.md) para más detalles.

---

*Proyecto para el Hackathon Build With AI 2026 — GDG Santa Cruz, Bolivia.*
