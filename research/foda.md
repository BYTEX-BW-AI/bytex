# Análisis FODA — Marketplace de Soberanía Energética
## Hackathon Build With AI 2026 — Santa Cruz, Bolivia
## v2.0 — Modelo Marketplace

---

## FORTALEZAS (interno — lo que tenemos)

**F1. Único motor de análisis energético con IA en Bolivia**
Ninguna de las ~27 empresas solares activas en Bolivia tiene una herramienta de análisis con IA y datos locales reales. No es una ventaja marginal: es una categoría nueva. El espacio está completamente vacío.

**F2. Datos locales reales integrados**
Tarifas CRE reales, irradiación solar específica por zona en Santa Cruz (NASA POWER API), benchmark de consumo por rubro (INE Bolivia). Ningún proveedor del mercado usa esto — todos recurren a herramientas genéricas internacionales (PVGIS, PVSyst) sin contexto boliviano.

**F3. Stack tecnológico 100% gratuito**
Gemini 2.5 Flash-Lite (OCR + razonamiento), NASA POWER API, Firebase stack. Costo operativo del MVP: $0. Elimina la barrera de entrada para validar el producto antes de necesitar inversión.

**F4. Gemini como arquitectura central en hackathon GDG**
La hackathon es organizada por Google Developer Groups Santa Cruz. Usar Gemini como motor funcional del análisis — no como decoración — es una señal de madurez técnica que los jueces van a valorar explícitamente.

**F5. Modelo marketplace sin necesidad de capital propio**
No importamos hardware. No instalamos. No financiamos leasing. Los proveedores traen su capital, sus equipos y su experiencia. Nosotros aportamos el análisis de IA y los leads calificados. Escala sin CapEx propio.

**F6. Efectos de red en ambos lados**
Más proveedores → más opciones para clientes → más simulaciones → más leads → más proveedores quieren estar. El marketplace se auto-refuerza. Una vez que tiene masa crítica, es muy difícil de replicar.

**F7. Argumento de timing irrefutable y documentado**
El colapso del gas boliviano (–65% en reservas en 12 años) y la admisión oficial de YPFB (marzo 2026) no son especulación — son hechos con fuentes primarias. El argumento "construí tu infraestructura hoy" tiene sustento periodístico y gubernamental verificable.

**F8. Datos propietarios que crecen con el uso**
Cada simulación alimenta el benchmark de consumo por rubro y zona en Santa Cruz. Con el tiempo, las recomendaciones son más precisas que cualquier fuente pública. Ese dataset es nuestro y crece solo.

---

## OPORTUNIDADES (externo — lo que el contexto nos ofrece)

**O1. 27 empresas solares activas en Bolivia como proveedores potenciales**
Lo que antes eran "competidores" son ahora el ecosistema de proveedores de la plataforma. Enersol, InnovaSol, Bolpegas, EnerLogic, los 5 distribuidores Huawei — todos necesitan leads B2B calificados y no tienen canal digital para conseguirlos. Nosotros se los damos.

**O2. Proveedores sin canal digital B2B — brecha sin atender**
Ninguna empresa solar boliviana tiene una herramienta de captación de leads B2B digital. Todas operan por referidos, ferias o contacto directo. La plataforma les resuelve ese problema desde el día 1.

**O3. 10.000–12.000 empresas target en Santa Cruz sin análisis energético disponible**
La base de clientes potenciales está identificada, concentrada geográficamente y sin una herramienta que les explique su situación energética real. Son el lado demanda del marketplace.

**O4. PILAT como beachhead para ambos lados**
1.350 empresas de 20 sectores en un solo parque industrial (Warnes). Es el beachhead perfecto tanto para captar clientes (las empresas con el problema) como proveedores (instaladoras que ya trabajan en esa zona).

**O5. Shock tarifario inminente — ventana de timing única**
Antes de 2031, Bolivia importará gas a precio internacional. La tarifa subsidiada sube. El payback baja de 7–10 a 3–4 años. El mercado va a explotar — quien tenga la plataforma ya construida captura ese momento.

**O6. Marco regulatorio DG consolidado (DS 5549, feb 2026)**
Generación distribuida legal hasta 2 MW. Aranceles en equipos reducidos. Net metering y billing formalizados. El contexto legal nunca fue más favorable para el ecosistema que nuestra plataforma conecta.

**O7. Apagones 2023 como memoria institucional activa**
48 horas sin luz en pleno verano cruceño. 87.000 conexiones afectadas. Los gerentes de planta ya saben que el riesgo es real — no hay que convencerlos del problema, solo mostrarles la solución.

**O8. Contexto ESG para exportadores agroindustriales**
La agroindustria cruceña exporta a mercados con exigencias de sostenibilidad. El análisis de CO₂ evitado que genera nuestra plataforma es un activo de compliance internacional real.

---

## DEBILIDADES (interno — lo que nos falta)

**D1. Problema de chicken & egg — el riesgo estructural del marketplace**
Sin proveedores en la plataforma no hay valor para los clientes. Sin clientes no hay valor para los proveedores. Arrancar un marketplace de dos lados requiere resolver este problema desde el día 1. La estrategia: conseguir 3–5 proveedores ancla antes del lanzamiento público.

**D2. Sin track record ni simulaciones reales completadas**
La plataforma es nueva. No hay casos de éxito bolivianos que mostrar. En un mercado B2B conservador, la falta de referencias locales es una objeción real tanto para clientes como para proveedores.

**D3. Calidad del servicio depende de terceros**
No controlamos la ejecución de las instalaciones. Un proveedor que hace mal trabajo daña la reputación de la plataforma. El sistema de certificación y reviews es crítico para mitigar este riesgo — pero toma tiempo construirlo.

**D4. OCR de facturas CRE sujeto a calidad de imagen**
Gemini maneja bien documentos claros, pero facturas fotografiadas con mala iluminación o formatos atípicos pueden generar extracciones incorrectas. El usuario necesita poder revisar y corregir los datos extraídos.

**D5. Estimaciones de consumo por rubro son promedios**
Para nuevos emprendedores, el simulador estima consumo usando tablas de referencia (INE/benchmarks). Una empresa real puede consumir 30% más o menos que el promedio del rubro. El resultado es orientativo, no una ingeniería de detalle.

**D6. Sin experiencia en el sector energético boliviano**
El equipo viene del software. No conoce los tiempos reales de instalación, las trabas de aduana, las complejidades técnicas de cada proyecto. Eso hace que dependamos de los proveedores también para aprender el negocio.

---

## AMENAZAS (externo — lo que el contexto nos puede dañar)

**A1. Tarifa subsidiada reduce urgencia hoy**
Mientras el subsidio al gas se mantenga, el payback de 7–10 años no genera urgencia en empresas que nunca vivieron un apagón prolongado. La propuesta de valor es más fuerte para quienes ya sufrieron el problema.

**A2. Un proveedor grande puede construir su propia plataforma**
Enersol (40 años, 20+ MW) tiene los recursos para desarrollar su propio simulador y directorio. Si ven tracción en la nuestra, podrían replicarla. Nuestra defensa: los datos propietarios y el efecto de red no se replican fácilmente.

**A3. Los proveedores pueden coordinarse entre ellos y saltear la plataforma**
Si los proveedores se conocen entre sí (y se conocen — el mercado solar boliviano es pequeño), podrían acordar derivarse leads directamente sin pasar por la plataforma. La defensa: el análisis de IA y la confianza del cliente son el valor que ningún proveedor puede dar por separado.

**A4. Inestabilidad política — decretos pueden revertirse**
El marco regulatorio favorable (DS 4477, DS 5167, DS 5549) son decretos supremos modificables por el ejecutivo. Un cambio de gobierno puede alterar los incentivos para el sector.

**A5. DS 5549 — límite de 2 MW puede no ser suficiente para grandes industriales**
Proyectos mayores a 2 MW requieren proceso de licencia bajo Ley 1604 — más largo y complejo. Limita el tamaño máximo de proyectos que los proveedores pueden ofrecer en la plataforma.

**A6. Resistencia cultural en PyMEs tradicionales**
Muchas empresas familiares de Santa Cruz tienen mentalidad conservadora. La fricción de adoptar una herramienta digital para una decisión de $70.000+ es real, especialmente cuando el interlocutor no es el dueño.

---

## Matriz FODA — Estrategias cruzadas

### Estrategias FO (Fortalezas + Oportunidades) — Atacar
| | |
|---|---|
| F1 + O2 | Posicionarse como el canal de leads B2B que los proveedores no tienen. El análisis de IA es el argumento de venta para que los proveedores paguen la suscripción. |
| F7 + O5 | Usar el argumento del shock tarifario 2031 en el pitch a proveedores: "los clientes que hoy usan nuestra plataforma son los que van a instalar cuando la urgencia explote — vos querés estar ahí." |
| F6 + O1 | Activar el efecto de red desde el día 1: onboardear los 5 proveedores más relevantes antes del lanzamiento para que los primeros clientes ya tengan opciones reales. |
| F8 + O4 | PILAT como piloto: primeras simulaciones + primeros proveedores activos en Warnes. Un caso real en el parque industrial más grande de Bolivia es el mejor argumento para escalar. |

### Estrategias DA (Debilidades + Amenazas) — Defender
| | |
|---|---|
| D1 + A2 | Resolver el chicken & egg antes del lanzamiento con acuerdos de proveedor ancla. Enersol o InnovaSol como primer partner validado le da credibilidad a ambos lados. |
| D3 + A3 | Construir el sistema de reviews verificados desde el MVP. La reputación pública de cada proveedor es el incentivo para no saltear la plataforma — los clientes confían en ella. |
| D2 + A6 | Primer simulación = primer caso de éxito. Documentar el ROI de las primeras empresas que usan la plataforma y lo publican — eso baja la resistencia cultural de las PyMEs conservadoras. |

---

## Resumen visual

```
                    POSITIVO              NEGATIVO
              ┌───────────────────┬───────────────────┐
   INTERNO    │  FORTALEZAS       │  DEBILIDADES      │
              │  F1–F8            │  D1–D6            │
              │  IA única en BOL  │  Chicken & egg    │
              │  Marketplace sin  │  Calidad depende  │
              │  capital propio   │  de terceros      │
              │  Stack $0         │  Sin track record │
              ├───────────────────┼───────────────────┤
   EXTERNO    │  OPORTUNIDADES    │  AMENAZAS         │
              │  O1–O8            │  A1–A6            │
              │  27 proveedores   │  Tarifa subsid.   │
              │  potenciales      │  Replicación por  │
              │  Sin canal leads  │  proveedor grande │
              │  Shock 2031       │  Inestab. pol.    │
              └───────────────────┴───────────────────┘
```
