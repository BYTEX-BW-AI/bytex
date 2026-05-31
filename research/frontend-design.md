# Diseño Frontend — Simulador de Soberanía Energética
## Bytex — Hackathon Build With AI 2026, Santa Cruz, Bolivia

---

## 1. Visión General

### ¿Qué estamos construyendo?

Una **PWA (Progressive Web App)** que permite a empresas de Santa Cruz comparar el costo y riesgo de seguir con la red de CRE vs instalar su propia microred solar. Todo con datos reales: factura CRE, irradiación NASA, precios reales de equipos importados.

### Stack Frontend

| Tecnología | Uso |
|---|---|
| **Angular 17+** | Framework principal |
| **@angular/pwa** | Service worker, manifest, offline |
| **AngularFire** | Firebase Auth, Firestore, Functions |
| **Tailwind CSS** | Estilos utilitarios (rápido, responsive) |
| **Chart.js / ng2-charts** | Gráficos de comparativa financiera |
| **Angular Material** | Componentes base (buttons, inputs, dialogs) |
| **Google Maps API** | Selector de ubicación para coordenadas |
| **Firebase Hosting** | Deploy CDN global |

---

## 2. Arquitectura de Navegación

```
┌─────────────────────────────────────────────────┐
│                   APP SHELL                      │
│  [Logo]  [Simulador]  [Dashboard]  [Aprender]   │
│              [Login]  [Perfil]                   │
└─────────────────────────────────────────────────┘
```

### Menú Principal

| Ruta | Página | Público | Descripción |
|---|---|---|---|
| `/` | Landing / Hero | ✅ Sí | Pitch inicial, call-to-action principal |
| `/simulador` | Simulador | ✅ Sí | Flujo principal paso a paso |
| `/simulador/tipo` | Paso 1: Tipo de usuario | ✅ Sí | ¿Empresa existente o nuevo? |
| `/simulador/entrada` | Paso 2: Ingreso de datos | ✅ Sí | Subir factura o seleccionar rubro |
| `/simulador/cargando` | Paso 3: Procesando | ✅ Sí | Animación mientras Gemini + NASA procesan |
| `/simulador/resultados` | Paso 4: Resultados | ✅ Sí | Comparativa CRE vs Microred |
| `/simulador/detalle` | Paso 5: Desglose técnico | ✅ Sí | Sizing, equipos, financiero |
| `/dashboard` | Mis simulaciones | ❌ Requiere login | Historial de simulaciones guardadas |
| `/aprender` | Centro de conocimiento | ✅ Sí | FAQ, tecnología solar, precios |
| `/aprender/paneles` | Guía de paneles solares | ✅ Sí | Comparativa de equipos |
| `/aprender/regulacion` | Marco regulatorio Bolivia | ✅ Sí | DS 4477, 4539, 5167 |
| `/login` | Inicio de sesión | ✅ Sí | Google Sign-In |
| `/perfil` | Perfil de usuario | ❌ Requiere login | Datos personales |

---

## 3. Diseño Visual

### Paleta de Colores

```
🌞 Primario:  #F59E0B  (Ambar — energía, sol, Bolivia)
   Secundario: #059669  (Esmeralda — ahorro, renovable, verde)
   Fondo:      #0F172A  (Azul profundo — confianza, tecnología)
   Superficie: #1E293B  (Azul pizarra — tarjetas, secciones)
   Texto:      #F8FAFC  (Blanco hueso)
   Acento:     #3B82F6  (Azul — links, botones secundarios)
   ⚠️ Alerta:  #EF4444  (Rojo — costo CRE, riesgo)
   ✅ Éxito:   #10B981  (Verde — ahorro solar, positivo)
```

### Tipografía

- **Títulos:** Inter (sans-serif, Google Fonts) — Bold 700 / ExtraBold 800
- **Cuerpo:** Inter Regular 400 / Medium 500
- **Números/monedas:** Tabular numbers para alinear columnas de precios

### Tono visual

| Aspecto | Decisión |
|---|---|
| **Estilo** | Moderno, limpio, profesional (B2B) |
| **Referencia** | Stripe / Linear / Vercel — dark mode first |
| **Iconos** | Lucide Icons (línea delgada, consistente) |
| **Ilustraciones** | Custom SVG o Humaaans para escenas |
| **Animaciones** | Sutiles — framer-motion o Angular animations |
| **Responsive** | Mobile-first (PWA), desktop adaptado |

---

## 4. Landing Page — Prototipo

```
┌──────────────────────────────────────────────────────────────────┐
│  [Bytex Logo]  [⬇ Simulador]  [Dashboard]  [Aprender]  [Login] │
├──────────────────────────────────────────────────────────────────┤
│                                                                   │
│  ┌────────────────────────────────────────────────────────────┐  │
│  │  ☀️ ¿Cuánto le cuesta a tu empresa no tener paneles        │  │
│  │  solares?                                                   │  │
│  │                                                             │  │
│  │  Descubre en 2 minutos si tu negocio ahorraría cambiando    │  │
│  │  de CRE a energía solar. Con datos reales de Santa Cruz.   │  │
│  │                                                             │  │
│  │  [📸 Sube tu factura CRE]  o  [🔍 Selecciona tu rubro]     │  │
│  │                                                             │  │
│  │  *No requiere registro. Datos 100% locales de Bolivia.      │  │
│  └────────────────────────────────────────────────────────────┘  │
│                                                                   │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐              │
│  │ 📊 DATOS     │  │ 🤖 IA       │  │ ⚡ GRATIS    │              │
│  │ Reales de    │  │ Gemini      │  │ 100% free   │              │
│  │ NASA + CRE   │  │ extrae tu   │  │ sin tarjeta │              │
│  │              │  │ factura     │  │             │              │
│  └─────────────┘  └─────────────┘  └─────────────┘              │
│                                                                   │
│  ──── ──── ──── ──── ──── ──── ──── ──── ────                    │
│                                                                   │
│  📊 Así funciona:                                                 │
│                                                                   │
│  [1] Sube tu factura CRE o elige tu sector industrial            │
│       ↓                                                           │
│  [2] Gemini AI extrae tu consumo en segundos                     │
│       ↓                                                           │
│  [3] NASA calcula la irradiación solar de tu zona                │
│       ↓                                                           │
│  [4] Comparamos: CRE vs Microred Solar con números reales        │
│                                                                   │
│  ──── ──── ──── ──── ──── ──── ──── ──── ────                    │
│                                                                   │
│  🏭 Para empresas como la tuya                                   │
│                                                                   │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐         │
│  │🏭        │  │🍞        │  │📦        │  │🔩        │         │
│  │ Industrial│  │Alimentos │  │Logística │  │Manufactura│         │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘         │
│                                                                   │
│  ──── ──── ──── ──── ──── ──── ──── ──── ────                    │
│                                                                   │
│  📈 Ejemplo: Frigorífico BFC — San Ignacio de Velasco            │
│  3 MW instalados • $3M inversión • 1.350 tCO₂ evitadas           │
│                                                                   │
│  ──── ──── ──── ──── ──── ──── ──── ──── ────                    │
│                                                                   │
│  [⬇ Comienza tu simulación ahora — es gratis]                    │
│                                                                   │
└──────────────────────────────────────────────────────────────────┘
│  [Bytex]  [Términos]  [Privacidad]  [Contacto]                   │
│  Hecho en Santa Cruz 🇧🇴 para el GDG Build With AI 2026          │
└──────────────────────────────────────────────────────────────────┘
```

---

## 5. Flujo del Simulador — Paso a Paso

### Paso 1: Tipo de usuario

```
┌──────────────────────────────────────────────────────────────────┐
│  🏢 ¿Tu empresa ya existe o estás empezando?                     │
│                                                                   │
│  ┌────────────────────┐  ┌────────────────────┐                  │
│  │ 📋 YA TENGO         │  │ 💡 ESTOY           │                  │
│  │    FACTURA CRE      │  │    EMPEZANDO       │                  │
│  │                     │  │                     │                  │
│  │ Subí tu última      │  │ Elegí tu rubro y   │                  │
│  │ factura de CRE y    │  │ zona. Te estimamos │                  │
│  │ calculamos tu       │  │ el consumo según   │                  │
│  │ ahorro real.        │  │ datos del INE.     │                  │
│  │                     │  │                     │                  │
│  │ [📸 Subir factura]  │  │ [🔍 Elegir rubro]  │                  │
│  └────────────────────┘  └────────────────────┘                  │
│                                                                   │
│  < Volver                                                         │
└──────────────────────────────────────────────────────────────────┘
```

### Paso 2A: Subir factura (empresa existente)

```
┌──────────────────────────────────────────────────────────────────┐
│  📸 Subí tu última factura CRE                                   │
│                                                                   │
│  ┌──────────────────────────────────────────────────────────┐    │
│  │                                                          │    │
│  │                    ┌──────────────┐                      │    │
│  │                    │              │                      │    │
│  │                    │   📸 Foto    │                      │    │
│  │                    │              │                      │    │
│  │                    └──────────────┘                      │    │
│  │                                                          │    │
│  │  Arrastrá tu factura acá o hacé clic para subir          │    │
│  │  Formatos: JPG, PNG, PDF  •  Máx: 10MB                  │    │
│  └──────────────────────────────────────────────────────────┘    │
│                                                                   │
│  📱 También podés sacarle una foto con tu celular                │
│                                                                   │
│  [⬇ Continuar]  < Volver                                         │
└──────────────────────────────────────────────────────────────────┘
```

### Paso 2B: Seleccionar rubro (nuevo emprendedor)

```
┌──────────────────────────────────────────────────────────────────┐
│  🔍 ¿Cuál es tu sector?                                          │
│                                                                   │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐         │
│  │🏭        │  │🍞        │  │📦        │  │🔩        │         │
│  │Manufactura│  │Alimentos │  │Logística │  │Metalurgia│         │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘         │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐         │
│  │🏪        │  │🏥        │  │🌾        │  │🔧        │         │
│  │Comercio  │  │Salud     │  │Agroind.  │  │Taller    │         │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘         │
│                                                                   │
│  📍 ¿En qué zona de Santa Cruz?                                  │
│                                                                   │
│  ┌──────────────────────────────────────────────────────────┐    │
│  │  [Seleccionar zona ▼]                                      │    │
│  │  ○ Warnes / PILAT                                         │    │
│  │  ○ Cotoca                                                 │    │
│  │  ○ Montero                                                │    │
│  │  ○ La Guardia                                             │    │
│  │  ○ Centro (4to-7mo anillo)                                │    │
│  │  ○ ZOFRACRUZ / Aeropuerto                                 │    │
│  └──────────────────────────────────────────────────────────┘    │
│                                                                   │
│  [⬇ Calcular]  < Volver                                          │
└──────────────────────────────────────────────────────────────────┘
```

### Paso 3: Pantalla de carga/IA

```
┌──────────────────────────────────────────────────────────────────┐
│  ⏳ Procesando tu factura...                                     │
│                                                                   │
│                    ☀️                                             │
│                 ☀️ ☀️ ☀️                                       │
│              ☀️ ☀️ ☀️ ☀️ ☀️                                     │
│                                                                   │
│  ┌──────────────────────────────────────────────────────────┐    │
│  │ ✅ Gemini AI extrajo los datos de tu factura              │    │
│  │    • Consumo: 15,230 kWh/mes                             │    │
│  │    • Potencia: 45 kW pico                                │    │
│  │    • Costo: Bs 12,450/mes                                │    │
│  │                                                          │    │
│  │ ✅ NASA POWER obtuvo irradiación de tu zona              │    │
│  │    • Ubicación: Warnes, Santa Cruz                       │    │
│  │    • Irradiación: 4.8 kWh/m²/día                        │    │
│  │                                                          │    │
│  │ ✅ Calculando tu microred solar...                        │    │
│  └──────────────────────────────────────────────────────────┘    │
│                                                                   │
│  [⬇ Ver resultados]                                              │
└──────────────────────────────────────────────────────────────────┘
```

### Paso 4: Resultados — Comparativa

```
┌──────────────────────────────────────────────────────────────────┐
│  📊 Resultados para tu empresa                                   │
│                                                                   │
│  ┌──────────────┐  ┌──────────────┐                               │
│  │  🏭 CRE       │  │  ☀️ MICRORED  │                               │
│  │  (hoy)        │  │  (propia)    │                               │
│  │               │  │              │                               │
│  │  Bs 12,450    │  │  Bs 0        │                               │
│  │  /mes         │  │  /mes 🏆     │                               │
│  │               │  │              │                               │
│  │  ⚠️ +5.2%     │  │  🔒 Fijo x   │                               │
│  │  anual        │  │  25 años     │                               │
│  └──────────────┘  └──────────────┘                               │
│                                                                   │
│  💰 Inversión necesaria: $68,000                                  │
│  📈 Payback: 4.7 años                                             │
│  💵 Ahorro 25 años: $285,000                                      │
│                                                                   │
│  ┌──────────────────────────────────────────────────────────┐    │
│  │  📈 Comparativa 25 años                                   │    │
│  │                                                          │    │
│  │  $1.5M ┤                                              ╱  │    │
│  │  $1.2M ┤                                           ╱     │    │
│  │  $900K ┤                                       ╱         │    │
│  │  $600K ┤                                  ╱              │    │
│  │  $300K ┤                            ╱                     │    │
│  │     $0 ┤╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱                      │    │
│  │        └───┬───┬───┬───┬───┬───┬───┬───                   │    │
│  │        0   5   10  15  20  25  años                       │    │
│  │                                                          │    │
│  │  ████ CRE  ████ Microred                                  │    │
│  └──────────────────────────────────────────────────────────┘    │
│                                                                   │
│  [⬇ Ver detalle técnico]  [💾 Guardar]  [📤 Compartir]          │
└──────────────────────────────────────────────────────────────────┘
```

### Paso 5: Desglose técnico

```
┌──────────────────────────────────────────────────────────────────┐
│  🔧 Detalle de tu microred solar                                │
│                                                                   │
│  ┌──────────────────────────────────────────────────────────┐    │
│  │  ☀️ Sistema de generación                                 │    │
│  │                                                          │    │
│  │  • 150 paneles Jinko Tiger NEO III 670W (TOPCon)        │    │
│  │  • Potencia total: 100.5 kWp                            │    │
│  │  • Área requerida: ~420 m² (techo o tierra)             │    │
│  │  • Generación estimada: 15,500 kWh/mes                  │    │
│  │  • 3 inversores Huawei SUN2000-30KTL                    │    │
│  │  • 2 baterías BYD HVM 22.1 kWh (respaldo nocturno)      │    │
│  └──────────────────────────────────────────────────────────┘    │
│                                                                   │
│  ┌──────────────────────────────────────────────────────────┐    │
│  │  💵 Desglose de costos                                    │    │
│  │                                                          │    │
│  │  Paneles solares           150 × $108     = $16,200     │    │
│  │  Inversores                3 × $2,500     = $7,500       │    │
│  │  Baterías                  2 × $4,500     = $9,000       │    │
│  │  Estructura + cableado     —              = $12,000      │    │
│  │  Instalación               —              = $15,000      │    │
│  │  Transporte + aduana       —              = $5,300       │    │
│  │  ─────────────────────────────────────────────────────  │    │
│  │  **TOTAL**                               **$68,000**    │    │
│  └──────────────────────────────────────────────────────────┘    │
│                                                                   │
│  ┌──────────────────────────────────────────────────────────┐    │
│  │  📊 Financiero                                            │    │
│  │                                                          │    │
│  │  • Payback simple: 4.7 años                             │    │
│  │  • TIR (10 años): 18.3%                                 │    │
│  │  • VAN (10 años, 12% desc.): $142,000                   │    │
│  │  • Ahorro neto 25 años: $285,000                        │    │
│  │  • Costo nivelado (LCOE): $0.042/kWh                   │    │
│  │  • Costo CRE actual: $0.121/kWh                        │    │
│  └──────────────────────────────────────────────────────────┘    │
│                                                                   │
│  ┌──────────────────────────────────────────────────────────┐    │
│  │  🌱 Ambiental                                             │    │
│  │                                                          │    │
│  │  • CO₂ evitado: 85 t/año                                │    │
│  │  • Equivalente a: 4,250 árboles plantados               │    │
│  │  • Agua ahorrada: 120 millones L (vs termoeléctrica)    │    │
│  └──────────────────────────────────────────────────────────┘    │
│                                                                   │
│  [💾 Guardar simulación]  [📤 Generar PDF]  [🔄 Nueva simulación]│
└──────────────────────────────────────────────────────────────────┘
```

---

## 6. Dashboard — Mis Simulaciones

```
┌──────────────────────────────────────────────────────────────────┐
│  Bytex  |  Dashboard           👋 Juan Pérez  [⚙️ Perfil]       │
├──────────────────────────────────────────────────────────────────┤
│                                                                   │
│  📋 Mis simulaciones                                              │
│                                                                   │
│  ┌──────────────────────────────────────────────────────────┐    │
│  │  🏭 Frigorífico BFC       ☀️ 3.0 MW   💰 $3.0M          │    │
│  │  San Ignacio de Velasco   Payback: 4.2 años              │    │
│  │  📅 15 mayo 2026          [Ver] [PDF] [🔄] [🗑️]       │    │
│  ├──────────────────────────────────────────────────────────┤    │
│  │  🍞 Panificadora La Mejor ☀️ 52 kW    💰 $42,000        │    │
│  │  Warnes, PILAT            Payback: 5.1 años              │    │
│  │  📅 28 abril 2026         [Ver] [PDF] [🔄] [🗑️]       │    │
│  ├──────────────────────────────────────────────────────────┤    │
│  │  📦 Logística Santa Cruz  ☀️ 85 kW    💰 $58,000        │    │
│  │  ZOFRACRUZ                Payback: 4.8 años              │    │
│  │  📅 10 marzo 2026         [Ver] [PDF] [🔄] [🗑️]       │    │
│  └──────────────────────────────────────────────────────────┘    │
│                                                                   │
│  [➕ Nueva simulación]                                             │
└──────────────────────────────────────────────────────────────────┘
```

---

## 7. Centro de Aprendizaje

```
┌──────────────────────────────────────────────────────────────────┐
│  📖 Centro de Conocimiento                                       │
├──────────────────────────────────────────────────────────────────┤
│                                                                   │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐           │
│  │ ☀️            │  │ 📋            │  │ ⚖️            │           │
│  │ PANELES       │  │ REGULACIÓN   │  │ FINANZAS     │           │
│  │ SOLARES       │  │ BOLIVIANA    │  │              │           │
│  │               │  │               │  │              │           │
│  │ Tecnología,   │  │ DS 4477,     │  │ Leasing,     │           │
│  │ precios,      │  │ 4539, 5167,  │  │ PPA,         │           │
│  │ fabricantes   │  │ Net Metering │  │ créditos     │           │
│  └──────────────┘  └──────────────┘  └──────────────┘           │
│                                                                   │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐           │
│  │ 📊            │  │ ⚡            │  │ 🏭            │           │
│  │ DATOS CRE     │  │ IRRADIACIÓN  │  │ CASOS DE     │           │
│  │              │  │ SANTA CRUZ   │  │ ÉXITO        │           │
│  │ Tarifas,     │  │ NASA POWER,  │  │ BFC 3MW,     │           │
│  │ históricos,  │  │ mapas,       │  │ instalaciones│           │
│  │ proyecciones │  │ estaciones   │  │ reales       │           │
│  └──────────────┘  └──────────────┘  └──────────────┘           │
│                                                                   │
│  📖 Artículo destacado                                             │
│  ┌──────────────────────────────────────────────────────────┐    │
│  │  ¿TOPCon o BackContact? Guía de tecnología solar 2026    │    │
│  │  Comparativa completa de las 4 tecnologías del mercado   │    │
│  │  con precios actualizados para importación a Bolivia.    │    │
│  │                                                          │    │
│  │  [Leer más →]                                            │    │
│  └──────────────────────────────────────────────────────────┘    │
└──────────────────────────────────────────────────────────────────┘
```

---

## 8. Componentes Clave del Frontend

### 8A. Selector de paneles solares interactivo

```
┌──────────────────────────────────────────────────────────────────┐
│  ☀️ Elige tu panel solar                                         │
│                                                                   │
│  ┌──────────────────────────────────────────────────────────┐    │
│  │  Filtros: [Tecnología: ▼] [Potencia: ▼] [Precio: ▼]    │    │
│  ├──────────────────────────────────────────────────────────┤    │
│  │  ┌──────────────────────────────────────────────────┐    │    │
│  │  │ ● Jinko Tiger NEO III 670W                  $108│    │    │
│  │  │   TOPCon | 24.8% | 670W | 239 W/m²              │    │    │
│  │  │   [Seleccionar]                                 │    │    │
│  │  ├──────────────────────────────────────────────────┤    │    │
│  │  │ ○ Aiko Stellar 685W                        $195│    │    │
│  │  │   ABC | 25.4% | 685W | 254 W/m²                  │    │    │
│  │  │   [Seleccionar]                                 │    │    │
│  │  ├──────────────────────────────────────────────────┤    │    │
│  │  │ ○ LONGi Hi-MO X10 670W                     $135│    │    │
│  │  │   HPBC 2.0 | 24.8% | 670W | 248 W/m²           │    │    │
│  │  │   [Seleccionar]                                 │    │    │
│  │  └──────────────────────────────────────────────────┘    │    │
│  └──────────────────────────────────────────────────────────┘    │
│                                                                   │
│  [Panel seleccionado: Jinko Tiger NEO III 670W — $108 c/u]      │
└──────────────────────────────────────────────────────────────────┘
```

### 8B. Comparativa lado a lado (CRE vs Solar)

```
┌──────────────────────────────────────────────────────────────────┐
│  🏭 CRE                               ☀️ MICRORED                │
│                                                                   │
│  Costo mensual                             Costo mensual          │
│  Bs 12,450                                 Bs 0 🏆               │
│                                                                   │
│  Tarifa: 0.82 Bs/kWh                      LCOE: 0.29 Bs/kWh 🏆  │
│                                                                   │
│  Incremento anual: +5.2%                  Incremento: 0% 🔒      │
│                                                                   │
│  Dependencia: gas 70% 🇧🇴                  Dependencia: sol ☀️    │
│                                                                   │
│  Riesgo de corte: ALTO 🔴                  Riesgo: MÍNIMO 🟢      │
│  (48h apagón 2023)                        (batería respaldo)      │
│                                                                   │
│  Emisiones: 0.42 kgCO₂/kWh 🔴             Emisiones: 0.03 🟢     │
└──────────────────────────────────────────────────────────────────┘
```

### 8C. Timeline de inversión (gráfico interactivo)

```
┌──────────────────────────────────────────────────────────────────┐
│  📈 Proyección 25 años                                           │
│                                                                   │
│  [🎚️ Deslizá para ver año por año]          Año: ═══●═══ 7      │
│                                                                   │
│  ┌──────────────────────────────────────────────────────────┐    │
│  │                                                          │    │
│  │  $1.5M ┤                                              ╱  │    │
│  │  $1.2M ┤                                           ╱     │    │
│  │  $900K ┤                                       ╱         │    │
│  │  $600K ┤                                  ╱              │    │
│  │  $300K ┤                            ╱                     │    │
│  │     $0 ┤╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱                      │    │
│  │        └───┬───┬───┬───┬───┬───┬───┬───                   │    │
│  │        0   5   10  15  20  25  años                       │    │
│  │                                                          │    │
│  │  ███ CRE acumulado: Bs 1,124,000 (año 13)                │    │
│  │  ███ Microred: $68,000 (inversión inicial) + $0/mes     │    │
│  │                                                          │    │
│  │  💰 Tu ahorro a este año: Bs 1,056,000                   │    │
│  └──────────────────────────────────────────────────────────┘    │
│                                                                   │
│  📊 Resumen del año 13                                            │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐           │
│  │ Gastaste      │  │ Hubieras     │  │ Ahorraste    │           │
│  │ en CRE:       │  │ gastado en   │  │ cambiando a  │           │
│  │ Bs 0         │  │ CRE:         │  │ solar:       │           │
│  │              │  │ Bs 1,124,000 │  │ Bs 1,124,000 │           │
│  └──────────────┘  └──────────────┘  └──────────────┘           │
│                                                                   │
│  [📥 Exportar gráfico]                                            │
└──────────────────────────────────────────────────────────────────┘
```

### 8D. Calculadora de paneles (interactiva)

```
┌──────────────────────────────────────────────────────────────────┐
│  ☀️ Calculá cuántos paneles necesitás                            │
│                                                                   │
│  Consumo mensual: [15,000] kWh                                   │
│                                                                   │
│  Panel seleccionado: Jinko Tiger NEO III 670W               │
│                                                                   │
│  ┌──────────────────────────────────────────────────────────┐    │
│  │  Resultado:                                                │    │
│  │                                                            │    │
│  │  • Paneles necesarios: 144                                 │    │
│  │  • Potencia total: 96.5 kWp                               │    │
│  │  • Área requerida: ~403 m²                                │    │
│  │  • Costo paneles: $15,552 (landed SCZ)                   │    │
│  │  • Costo total sistema: ~$53,000                          │    │
│  │  • Generación esperada: 15,800 kWh/mes                    │    │
│  └──────────────────────────────────────────────────────────┘    │
│                                                                   │
│  [🎛️ Ajustar parámetros]                                         │
│  ┌──────────────────────────────────────────────────────────┐    │
│  │  Inclinación: [35°]  Orientación: [Norte ═══●═══]      │    │
│  │  Pérdidas del sistema: [14% ▼]                            │    │
│  │  Precio instalación: [$0.55/W ▼]                         │    │
│  └──────────────────────────────────────────────────────────┘    │
└──────────────────────────────────────────────────────────────────┘
```

---

## 9. Mapa del Sitio — Árbol Completo

```
bytex.app
│
├── / (Landing)
│   ├── Hero con CTA principal
│   ├── Cómo funciona (3 pasos)
│   ├── Sectores (grid de industrias)
│   ├── Caso de éxito (BFC 3MW)
│   └── Footer (links, contacto)
│
├── /simulador (Flujo principal)
│   ├── /tipo (Existente vs Nuevo)
│   ├── /entrada (Subir factura o elegir rubro)
│   ├── /cargando (Procesamiento con IA)
│   ├── /resultados (Comparativa CRE vs Solar)
│   └── /detalle (Desglose técnico + financiero)
│
├── /dashboard (Requiere login)
│   ├── Lista de simulaciones guardadas
│   ├── Ver simulación individual
│   ├── Exportar PDF
│   ├── Compartir
│   └── Eliminar
│
├── /aprender
│   ├── /paneles (Guía de tecnología)
│   ├── /regulacion (Marco legal Bolivia)
│   ├── /financiamiento (Leasing, PPA, créditos)
│   ├── /datos-cre (Tarifas históricas CRE)
│   ├── /irradiacion (Mapa solar Santa Cruz)
│   └── /casos (Casos de éxito reales)
│
├── /auth
│   ├── /login (Google Sign-In)
│   └── /perfil (Datos del usuario)
│
└── /legal
    ├── /terminos
    ├── /privacidad
    └── /contacto
```

---

## 10. Interacciones Clave del Usuario

| # | Acción del usuario | Respuesta del sistema | Componente |
|---|---|---|---|
| 1 | Llega al landing | Hero animado con gradiente | `HeroSection` |
| 2 | Clica "Subir factura" | Abre file picker (cámara en mobile) | `FileUploader` |
| 3 | Selecciona foto | Preview + botón "Analizar" | `ImagePreview` |
| 4 | Clica "Analizar" | Spinner + Gemini procesa + muestra datos extraídos | `ProcessingOverlay` |
| 5 | Confirma datos | Cálculo + redirección a resultados | `ResultsPage` |
| 6 | Pasa el mouse sobre el gráfico | Tooltip con valores exactos del año | `ChartTooltip` |
| 7 | Hace clic en "Guardar" | Firebase Auth check → guarda en Firestore | `SaveSimulation` |
| 8 | Desliza el timeline | Gráfico se actualiza en tiempo real | `TimelineSlider` |
| 9 | Cambia panel solar | Recalcula sizing + precio automáticamente | `PanelSelector` |
| 10 | Clica "Compartir" | Genera link único o PDF descargable | `ShareDialog` |

---

## 11. Diseño Mobile (PWA)

### Navegación mobile (bottom nav)

```
┌────────────────────┐
│                    │
│   [CONTENIDO]      │
│                    │
│                    │
│                    │
│                    │
├────────────────────┤
│ ☀️  📊  📖  👤    │
│Sim  Dash  Apren Perf│
└────────────────────┘
```

### Flujo mobile (simplificado)

```
Pantalla 1: 📸 Sacar foto de la factura
Pantalla 2: ✅ Gemini confirma los datos leídos
Pantalla 3: 💰 Resultado: "Ahorrás Bs 12,450/mes"
Pantalla 4: 📊 Gráfico de payback (scroll vertical)
Pantalla 5: 📤 "Compartí este resultado con tu socio"
```

---

## 12. Temas y Estados de la UI

### Estados de carga

```
┌──────────────────────────────────────┐
│  ⏳ Procesando tu factura...         │
│                                      │
│  ┌──────────────────────────────┐    │
│  │  ████████████░░░░░░░ 60%    │    │
│  │  Gemini analizando imagen... │    │
│  └──────────────────────────────┘    │
│                                      │
│  Mientras tanto:                     │
│  📌 Santa Cruz tiene 4.8 kWh/m²/día │
│     de irradiación solar —           │
│     una de las mejores de la región  │
└──────────────────────────────────────┘
```

### Estados vacíos

```
┌──────────────────────────────────────┐
│  📋 No tenés simulaciones aún        │
│                                      │
│  ┌──────────────────────────────┐    │
│  │                              │    │
│  │       ☀️  (ilustración)      │    │
│  │                              │    │
│  └──────────────────────────────┘    │
│                                      │
│  Simulá tu primera empresa para      │
│  descubrir cuánto podés ahorrar.     │
│                                      │
│  [⬇ Comenzar simulación]             │
└──────────────────────────────────────┘
```

### Estados de error

```
┌──────────────────────────────────────┐
│  ⚠️ No pudimos leer tu factura       │
│                                      │
│  Posibles causas:                    │
│  • La foto está borrosa              │
│  • No es una factura CRE             │
│  • El archivo es demasiado grande    │
│                                      │
│  [📸 Intentar de nuevo]  [🔍 Elegir │
│                        rubro manual] │
│                                      │
│  Si el problema persiste,            │
│  contactanos a soporte@bytex.bo      │
└──────────────────────────────────────┘
```

---

## 13. Resumen de Pantallas (MVP)

| # | Pantalla | Prioridad | Complejidad | Tiempo estimado |
|---|---|---|---|---|
| 1 | Landing page | 🔴 Alta | 🟢 Baja | 4h |
| 2 | Simulador paso 1 (tipo) | 🔴 Alta | 🟢 Baja | 2h |
| 3 | Simulador paso 2A (subir factura) | 🔴 Alta | 🟡 Media | 6h |
| 4 | Simulador paso 2B (rubro + zona) | 🔴 Alta | 🟢 Baja | 3h |
| 5 | Simulador paso 3 (carga con IA) | 🔴 Alta | 🟡 Media | 4h |
| 6 | Simulador paso 4 (resultados) | 🔴 Alta | 🔴 Alta | 10h |
| 7 | Simulador paso 5 (detalle técnico) | 🟡 Media | 🔴 Alta | 8h |
| 8 | Dashboard (simulaciones guardadas) | 🟡 Media | 🟡 Media | 6h |
| 9 | Autenticación (Google Sign-In) | 🟡 Media | 🟢 Baja | 3h |
| 10 | Centro de aprendizaje | 🟢 Baja | 🟡 Media | 6h |
| 11 | Guía de paneles solares | 🟢 Baja | 🟢 Baja | 2h |
| 12 | PDF export | 🟢 Baja | 🔴 Alta | 8h |
| | **Total MVP** | | | **~62h** |

---

## 14. Notas de UX

1. **Sin registro obligatorio.** El usuario puede simular sin loguearse. Solo pedimos login si quiere guardar.
2. **Mobile-first.** La PWA se instala en el celular. El dueño de la empresa puede recibir el link del gerente de planta y abrirlo desde su iPhone.
3. **Números grandes y claros.** El decisor empresario no quiere leer párrafos. Quiere ver: "Ahorrás Bs 12,000/mes — Payback 4.7 años".
4. **Comparativa visual.** Los gráficos deben mostrar la divergencia CRE vs Solar año a año. La brecha se agranda con el tiempo.
5. **Compartible.** Cada simulación genera un link único. El instalador puede mandarle el link al cliente.
6. **Idioma local.** "Factura", "rubro", "zona", "CRE" — vocabulario boliviano. Precios en Bs y USD según corresponda.
7. **Confianza.** Mostrar fuentes: NASA, INE Bolivia, CRE. Mostrar casos reales (BFC 3MW).
8. **Velocidad.** La simulación completa debe tomar <10 segundos. Si Gemini tarda, mostrar datos parciales mientras se completan los cálculos.
