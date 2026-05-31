# Modelo de Negocio — Soberanía Energética
## Hackathon Build With AI 2026 — Santa Cruz, Bolivia

---

## Filosofía de existir

Cuatro pilares que definen por qué existimos y cómo tomamos cada decisión:

**1. Soberanía eléctrica real**
No reducimos tu factura. Te construimos tu propia infraestructura energética — tuya, no de la CRE. La diferencia entre depender de un sistema que se está rompiendo y ser dueño de tu propia fuente de energía.

**2. Lo hacemos fácil**
Subís tu factura, la IA te dice exactamente qué necesitás, elegís tu proveedor certificado, ellos instalan. Sin ingenieros independientes, sin múltiples cotizaciones, sin burocracia.

**3. Solo empresas**
No somos para hogares. Somos para quienes tienen producción que proteger, facturas que duelen y decisiones que tienen retorno medible en bolivianos.

**4. El problema ya llegó — solo que todavía no lo sentiste**
Bolivia agotó sus reservas de gas. Antes de 2031 importará energía a precio internacional. Cuando eso pase, la tarifa sube, los tiempos de espera explotan y todos van a querer instalar al mismo tiempo. Los que construyan su infraestructura hoy van a estar protegidos. Los que esperen van a pagar más, esperar más y competir por instaladores.

> *"No te estamos vendiendo paneles. Te estamos ayudando a construir la infraestructura que vas a necesitar de todas formas — con la diferencia de que hoy te cuesta la mitad y podés elegir quién la construye."*

---

## Qué somos

**El marketplace de soberanía energética.**

No somos una instaladora. No importamos equipos. No gestionamos obras.

Somos la plataforma que conecta empresas que quieren independencia energética con proveedores certificados que pueden dársela — con datos reales, simulaciones con IA y transparencia total en precios y rendimiento.

---

## El producto — La App (gratuita)

La app es gratuita para todos los clientes. El análisis de IA es el corazón — no es un directorio con filtros, es un motor que procesa los datos reales del cliente y devuelve una recomendación personalizada. Sin fricción de entrada, sin tarjeta de crédito.

### Modo Evaluación (pre-instalación)

**Los niveles de independencia son inputs del análisis, no productos que vendemos.**

El cliente no elige un "pack" — elige qué nivel de independencia quiere lograr. La IA usa eso como parámetro junto con sus datos reales para dimensionar el sistema exacto que necesita.

**4 inputs del cliente:**
1. **Nivel de independencia deseado:** reducir factura (40–60%) / depender menos (70–85%) / independencia total (100%)
2. **Equipamiento existente:** nada / ya tiene paneles / ya tiene inversor / ya tiene baterías
3. **Presupuesto disponible:** rango en USD
4. **Datos de consumo:** foto de factura CRE (empresa existente) o rubro + zona (nuevo emprendedor)

**Flujo A — Empresa existente:**
Sube foto/PDF de factura CRE → Gemini extrae kWh, pico kW, costo y historial → NASA POWER entrega irradiación real de la zona del cliente → motor de sizing calcula exactamente cuántos paneles, kWh de baterías y kW de inversor necesita para alcanzar SU nivel deseado con SU presupuesto → comparativa personalizada CRE vs sistema recomendado → lista de proveedores certificados en su zona que pueden entregar esa configuración específica.

**Flujo B — Nuevo emprendedor:**
Selecciona rubro + zona → IA estima consumo por benchmarks INE Bolivia → calcula CapEx CRE ($15k–$50k muerto) vs microred dimensionada para ese rubro → recomendación personalizada → proveedores que trabajan en esa zona.

**Output: recomendación personalizada, no genérica**
> *"Para 70% de independencia con tu consumo de 47.000 kWh/mes en Warnes, necesitás 182 paneles 550W + 10 baterías Pylontech US5000 + inversor Huawei Sun2000 100kW. Costo estimado: $58.000–$72.000. Payback: 4.8 años. 3 proveedores en tu zona pueden instalarlo."*

### Modo Gestión (post-instalación)

Para empresas que ya tienen su sistema instalado:

- **Dashboard en tiempo real:** kWh generados hoy, estado de baterías, dependencia residual de CRE
- **Inteligencia de negocio:** cuánto ahorré este mes en bolivianos, % de ROI alcanzado, fecha estimada de recuperación de inversión
- **CO₂ evitado:** toneladas acumuladas comparadas con el grid boliviano (0.42 kg CO₂/kWh)
- **Alertas:** mantenimiento preventivo, anomalías del sistema, rendimiento por debajo de lo proyectado
- **Upgrade simulator:** "si pasás del Pack Amanecer al Pack Horizonte, ahorrarías $X adicionales por mes"
- **Integración con inversores:** Huawei FusionSolar API, Fronius Solar API, Victron VRM API

---

## El modelo de negocio — Dos fases

### Fase 1 — Marketplace puro (MVP → escala inicial)

Somos la plataforma. Los proveedores traen sus sistemas. Los clientes traen sus facturas. Nosotros conectamos y certificamos.

**¿Quiénes son los proveedores?**
Empresas instaladoras ya operativas en Bolivia:
- Enersol S.A. (Fronius + Victron, 40 años, 20+ MW instalados)
- Bolpegas SRL (UKSOL, instaló el mayor proyecto privado de Bolivia — BFC 3MW)
- InnovaSol S.A. (modelo leasing/PPA, 70+ sistemas)
- EnerLogic (full-service agroindustrial, 50+ proyectos)
- Distribuidores oficiales Huawei (AMESOL, HEXACORP, DMC, SIE SA, DIGICORP)
- Solaria Bolivia, Tecnosol, instaladores certificados DS 4477

**¿Qué ofrecen los proveedores en la plataforma?**
Sus sistemas y capacidades de instalación. Cuando la IA recomienda una configuración específica para un cliente (X paneles + Y baterías + Z inversor), la plataforma muestra qué proveedores pueden entregar ESA configuración en ESA zona dentro de ESE presupuesto.

Los proveedores se posicionan por nivel de independencia que pueden atender:

| Nivel | Descripción | Rango de inversión típico |
|---|---|---|
| **Reducción de factura** | On-grid solar, 40–60% independencia | $25.000–$55.000 |
| **Semi-independencia** | Híbrido con almacenamiento, 70–85% independencia | $55.000–$110.000 |
| **Independencia total** | Off-grid completo, 100% independencia | $120.000–$350.000 |

Nosotros definimos estándares de calidad (marcas certificadas, garantías mínimas exigidas, experiencia comprobada). Los proveedores compiten en precio, tiempo de instalación y reputación verificada por reviews de clientes reales.

---

### Revenue streams — Fase 1

**Stream 1 — Suscripción de proveedores (MRR)**
Los proveedores pagan una tarifa mensual o anual para estar listados en la plataforma con acceso a los leads de simulación.

| Plan proveedor | Precio | Beneficios |
|---|---|---|
| Básico | $150/mes | Perfil listado, acceso a leads de su zona |
| Profesional | $350/mes | Perfil destacado, badge de proveedor verificado, analytics de leads |
| Premium | $700/mes | Posición superior en resultados, integración de monitoreo en nuestra app |

**Stream 2 — Comisión por deal cerrado**
Por cada instalación cerrada a través de la plataforma, cobramos una comisión del 3–5% sobre el valor del proyecto.

Ejemplo: Pack Horizonte $76.000 → comisión = $2.280–$3.800

**Stream 3 — Leads calificados**
Un lead calificado es una empresa que corrió la simulación completa, vio su ROI y solicitó contacto con proveedores. Los proveedores pagan por acceder a leads de alta intención.

Precio por lead: $50–$150 según el tamaño estimado del sistema.

**Stream 4 — Placement destacado**
Proveedores que quieren aparecer primero en los resultados de simulación para cierto rubro o zona pagan por ese posicionamiento. Igual que Google Ads o los "resultados patrocinados" de Amazon.

---

### Fase 2 — Producto propio (escala avanzada)

Después de procesar cientos de simulaciones, conocemos:
- Qué pack se vende más en qué zona
- Qué proveedores tienen mejor reputación
- Cuál es el precio real de mercado para cada configuración
- Qué componentes se usan más y dónde conseguirlos

Con ese conocimiento y esas relaciones, lanzamos **nuestro propio pack bajo nuestra marca** — como Amazon Basics. Los proveedores que antes eran "anunciantes" se convierten en nuestra red de instalación subcontratada bajo nuestros estándares.

En esa fase, los tres packs (Amanecer, Horizonte, Soberanía) son nuestros productos propios con margen directo del 35%.

---

## Estructura de costos

### MVP (hackathon y validación inicial)

| Componente | Costo |
|---|---|
| Gemini 2.5 Flash-Lite API | $0 (free tier 1.000 req/día) |
| NASA POWER API | $0 (gratuita) |
| Firebase (Hosting + Firestore + Auth + Functions) | $0 (Blaze free tier) |
| Angular + AngularFire | $0 (open source) |
| **Total stack tecnológico** | **$0/mes** |

### Operación inicial (post-hackathon)

| Concepto | Costo estimado |
|---|---|
| Equipo fundador (producto + ventas) | Equity / bootstrapped |
| Proceso de certificación de proveedores | $2.000–5.000 (legal + auditoría) |
| Marketing B2B (LinkedIn, eventos CAINCO/PILAT) | $1.000–2.000/mes |
| Hosting + APIs a escala | $200–500/mes |
| **Total fijo mensual inicial** | **~$3.200–7.500/mes** |

**Break-even:** Con 10 proveedores en Plan Básico ($150/mes) + 5 en Profesional ($350/mes) = $3.250/mes. Break-even operativo desde el mes 1 si se logra ese volumen de proveedores.

---

## Proyección de revenue — Fase 1 (primeros 12 meses)

| Trimestre | Proveedores activos | MRR suscripciones | Comisiones estimadas | Total trimestral |
|---|---|---|---|---|
| Q1 | 5 proveedores | $750/mes = $2.250 | 2 deals × $2.500 = $5.000 | $7.250 |
| Q2 | 12 proveedores | $2.400/mes = $7.200 | 5 deals × $2.500 = $12.500 | $19.700 |
| Q3 | 20 proveedores | $5.000/mes = $15.000 | 10 deals × $2.500 = $25.000 | $40.000 |
| Q4 | 27 proveedores | $7.500/mes = $22.500 | 15 deals × $2.500 = $37.500 | $60.000 |
| **Año 1 total** | | | | **~$127.000** |

---

## Por qué este modelo gana

| Factor | Instaladora directa | Nuestro marketplace |
|---|---|---|
| Capital necesario | Alto (inventario + leasing) | Mínimo |
| Velocidad de escala | Lenta (equipo propio) | Alta (red de proveedores) |
| Riesgo operativo | Alto | Bajo |
| Datos generados | Limitados | Crecen con cada simulación |
| Defensibilidad | Media | Alta (datos + red + marca) |
| Evolución natural | Difícil cambiar | Fase 2 emerge sola |

---

## Fuentes

- InnovaSol CEO, CBE 2024: modelo leasing Bolivia, payback 5–6 años comercial
- BFC Frigorífico: $3M instalación 3MW — Bolpegas/Cymebol, pv-magazine abr 2024
- YPFB, La Razón mar 2026: Bolivia importará gas antes de 2031
- AETN DS 5549 feb 2026: marco GD hasta 2 MW habilitado
- pvknowhow.com: técnico solar Bolivia $35/día
- OPIS benchmark may 2026: panel TOPCon FOB China $0.117/W
