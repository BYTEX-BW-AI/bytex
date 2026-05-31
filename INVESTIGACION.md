# 📊 INVESTIGACIÓN COMPLETA — BYTEX
## Hackathon Build With AI 2026 — GDG Santa Cruz, Bolivia

---

## 📋 Índice

1. [Contexto del Problema](#contexto-del-problema)
2. [Lean Canvas](#lean-canvas)
3. [Modelo de Negocio](#modelo-de-negocio)
4. [Análisis de Mercado](#análisis-de-mercado)
5. [Análisis Competitivo](#análisis-competitivo)
6. [Análisis FODA](#análisis-foda)
7. [Análisis PESTEL](#análisis-pestel)
8. [Análisis Financiero](#análisis-financiero)
9. [Conclusiones](#conclusiones)

---

## CONTEXTO DEL PROBLEMA

### El Problema Real de Bolivia

**Las reservas de gas de Bolivia cayeron 65% en 12 años** (10.45 TCF → 3.7 TCF).

YPFB admitió oficialmente en marzo 2026 que **Bolivia importará gas antes de 2031**. Cuando eso pase:

1. La tarifa eléctrica **deja de ser subsidiada**
2. Sube a **precio internacional**
3. Los apagones de 2023 (48 horas, 87.000 conexiones) se repiten
4. Quien construya su infraestructura hoy **paga la mitad**
5. Quien espere **paga el doble y no encuentra instalador**

### Por qué es urgente AHORA

- **Empresas nuevas en expansión**: Pagan $15k–$50k de CapEx muerto a la CRE (transformador, postes, cableado) — dinero que desaparece, no es activo de ellos
- **Empresas existentes**: Sufren penalización por picos de demanda, apagones, voltaje inestable que daña maquinaria
- **PILAT (Warnes)**: 1.350 empresas en zona con cuello de botella energético documentado en la línea Warnes–Las Brechas

### ¿Por qué no lo resuelven hoy?

❌ No saben cuántos paneles necesitan exactamente  
❌ No tienen comparativa: CRE vs solar con números reales  
❌ Contactan instaladoras, reciben 5 cotizaciones distintas  
❌ No entienden si van a recuperar la inversión en 5 años o 12  
❌ No hay plataforma digital que centralice opciones certificadas  

**Resultado:** Incertidumbre → Inacción → Se pierden años críticos.

---

## LEAN CANVAS

### 1. PROBLEMA

Los 3 dolores principales del cliente:

#### ① CapEx eléctrico para nuevos emprendedores
En Warnes, Cotoca, Montero, la CRE no tiene tendido cercano. El emprendedor paga:
- Transformador
- Postes
- Cableado
- **Total: $15.000–$50.000 USD de capital muerto** antes de producir

Ese dinero no es activo del cliente — es activo de la CRE. Se va.

#### ② Penalización por picos de demanda
La CRE cobra por **Potencia Máxima Demandada (kW)**, no solo consumo.
- Una fábrica arranca motores a las 14:00 → infla toda la factura mensual
- Bajones de voltaje dañan maquinaria sensible → pérdidas de miles USD/hora de línea parada

#### ③ Bolivia agotó su infraestructura energética
- Reservas de gas: –65% en 12 años
- YPFB: importará gas antes de 2031
- Tarifa subsidiada termina → sube a precio internacional
- Apagones de 2023: 48 horas, 87.000 conexiones afectadas
- **El problema ya llegó — solo que todavía no lo sienten todos**

### 2. SEGMENTOS DE CLIENTES

#### Lado Demanda — Empresas que buscan independencia energética

**Segmento A: Nuevo Emprendedor Industrial**
- Industrias, aserraderos, agro-negocios, galpones logísticos
- Ubicación: Warnes, Cotoca, Montero
- Dolor: $15k–$50k CapEx muerto
- Universo: ~10.000–12.000 empresas energo-intensivas en Santa Cruz

**Segmento B: Empresa Existente con Alto Consumo**
- Manufactureras, frigoríficos, textiles, comercio grande, agroindustria
- Ubicación: Santa Cruz ciudad + PILAT
- Dolor: picos de demanda, apagones, factura impredecible
- Universo: 12.681 empresas manufactureras + logística + agroindustria

**Early Adopters: PILAT (Warnes)**
- 1.350 empresas de 20 sectores en un solo parque industrial
- Cuello de botella energético documentado
- Receptivos a soluciones propias (el parque planifica su propio parque eólico)

#### Lado Oferta — Proveedores certificados

Empresas instaladoras activas en Bolivia:
- **Enersol S.A.** (40 años, 20+ MW, Fronius + Victron)
- **Bolpegas** (UKSOL, instaló el proyecto BFC 3MW)
- **InnovaSol** (leasing/PPA, 70+ sistemas)
- **EnerLogic** (agroindustrial, 50+ proyectos)
- **5 Distribuidores Huawei** (AMESOL, HEXACORP, DMC, SIE SA, DIGICORP)

### 3. PROPUESTA DE VALOR ÚNICA

#### Para empresas:
> **"Subís tu factura. En 3 minutos sabés exactamente qué sistema necesitás, cuánto te cuesta, cuándo lo recuperás y quién te lo instala — todo verificado."**

No buscamos proveedores por vos. No te vendemos el primero que aparece. Te mostramos tus números reales y te conectamos con proveedores certificados que compiten por tu proyecto.

#### Para proveedores:
> **"Accedés a leads calificados que ya saben lo que necesitan y ya decidieron invertir."**

Un lead que corrió la simulación, vio su ROI y solicitó contacto **no es un curioso — es un comprador**. Pagás por acceder a eso, no por publicidad genérica.

### 4. SOLUCIÓN

#### Modo Evaluación (Pre-instalación) — Gratuito

El cliente responde **4 preguntas** y la IA hace el trabajo:

**Inputs:**
1. ¿Qué nivel de independencia querés? → Reducir factura / Depender menos / Independencia total
2. ¿Qué ya tenés instalado? → Nada / Paneles / Inversor / Baterías
3. ¿Cuál es tu presupuesto? → Rango en USD
4. ¿Quién sos? → Sube factura CRE (existente) o selecciona rubro + zona (nuevo)

**Lo que hace la IA:**

Para empresa existente:
- Gemini OCR: extrae kWh, pico kW, costo, zona
- NASA POWER: irradiación real de la zona
- Motor de sizing: calcula paneles + baterías + inversor exactos
- Comparativa: CRE vs sistema propuesto
- Proveedores: lista certificados en tu zona

Para nuevo emprendedor:
- Estima consumo (tabla INE Bolivia)
- Calcula CapEx CRE ($15k–$50k muerto) vs microred
- Dimensiona sistema personalizado
- Muestra proveedores

**Output Personalizado (no genérico):**
> "Para 70% de independencia con tu consumo de 47.000 kWh/mes en Warnes, necesitás exactamente 182 paneles 550W + 10 baterías Pylontech + inversor Huawei 100kW. Costo: $58.000–$72.000. Payback: 4.8 años. 3 proveedores en tu zona pueden instalarlo."

#### Modo Gestión (Post-instalación) — Gratuito para clientes con sistema

- Dashboard en tiempo real: kWh generados, estado de baterías
- Inteligencia de negocio: ahorro mensual, % ROI, fecha recuperación
- CO₂ evitado acumulado
- Alertas de mantenimiento
- Upgrade simulator: "si pasás a Pack Horizonte, ahorrarías $X más"
- Integración APIs: Huawei FusionSolar, Fronius Solar, Victron VRM

### 5. CANALES

| Canal | Estrategia |
|-------|-----------|
| **App gratuita (primario)** | Sin fricción, sin tarjeta. Empresa entra → simula → ve su realidad |
| **Redes industriales B2B** | CAINCO, PILAT, asociaciones agroindustriales |
| **Los propios proveedores** | Cada proveedor tiene incentivo para recomendar (visibilidad + credibilidad) |

### 6. FLUJOS DE INGRESOS

**La app es GRATUITA para clientes. Revenue viene 100% de proveedores.**

#### ① Suscripción mensual de proveedores
| Plan | Precio | Beneficios |
|---|---|---|
| Básico | $150/mes | Perfil listado, acceso a leads de su zona |
| Profesional | $350/mes | Perfil destacado, badge verificado, analytics |
| Premium | $700/mes | Top de resultados, integración de monitoreo en app |

#### ② Comisión por deal cerrado
3–5% sobre el valor del proyecto.
- Ejemplo: Pack Horizonte $76.000 → comisión $2.280–$3.800

#### ③ Leads calificados
$50–$150 por lead que completó simulación + solicitud de contacto.

#### ④ Placement destacado
Proveedores que quieren aparecer primero en resultados pagan por posicionamiento (como Google Ads).

#### Fase 2 — Producto Propio
Con escala, Bytex lanza sus 3 packs propios bajo marca propia.
- Margen directo: 35%
- Proveedores se convierten en red de instalación subcontratada

### 7. ESTRUCTURA DE COSTOS

#### MVP — $0 operativo

| Componente | Costo |
|---|---|
| Gemini 2.5 Flash-Lite (free tier) | $0 |
| NASA POWER API | $0 |
| Firebase stack completo | $0 |
| Angular + AngularFire | $0 |

#### Operación inicial (post-hackathon)

| Concepto | Estimado |
|---|---|
| Certificación de proveedores (legal + auditoría) | $2.000–5.000 one-time |
| Marketing B2B (CAINCO, PILAT, LinkedIn) | $1.000–2.000/mes |
| Hosting + APIs a escala | $200–500/mes |
| **Break-even operativo** | **10 proveedores Básico + 5 Profesional = $3.250/mes** |

### 8. MÉTRICAS CLAVE

| Métrica | Qué mide |
|---|---|
| Simulaciones completadas / semana | Tracción del producto |
| Tasa simulación → solicitud proveedor | Conversión lado demanda |
| Proveedores activos | Salud del lado oferta |
| Tiempo simulación → contacto proveedor | Eficiencia del marketplace |
| Deals cerrados / mes | Revenue real |
| NPS empresas (post-simulación) | Calidad del producto |
| NPS proveedores (post-deal) | Calidad del marketplace |
| kWh generados acumulados (IoT) | Impacto demostrable |
| ton CO₂ evitadas acumuladas | Argumento ESG |

### 9. VENTAJA INJUSTA

① **Datos propietarios que crecen con cada simulación**  
Benchmark de consumo por rubro y zona es nuestro.

② **Primera plataforma de este tipo en Bolivia**  
No existe marketplace ni simulador de soberanía energética. Ser primero en una categoría nueva.

③ **Efectos de red en ambos lados**  
Más proveedores → más opciones → más simulaciones → más leads → más proveedores.

④ **Gemini como arquitectura central en hackathon GDG**  
No es decorativo — es el motor funcional. Abre puertas a créditos de Google.

⑤ **Timing irrepetible**  
Gas se acaba. Tarifa va a subir antes de 2031. Quien construya hoy entra protegido.

---

## MODELO DE NEGOCIO

### Fase 1 — Marketplace Puro (MVP → Escala inicial)

Somos la plataforma. Los proveedores traen sus sistemas. Los clientes traen sus facturas. Nosotros conectamos y certificamos.

#### Revenue Streams — Fase 1

| Stream | Descripción | Ejemplo |
|--------|-------------|---------|
| **Suscripción proveedores** | Tarifa mensual para estar listados | 5 prov. × $150 = $750/mes |
| **Comisión por deal** | 3–5% sobre valor del proyecto | Pack $76k → $2.280–3.800 |
| **Leads calificados** | $50–150 por lead de alta intención | 10 leads × $100 = $1.000 |
| **Placement destacado** | Posicionamiento en resultados | Similar a Google Ads |

#### Proyección de Revenue — Primeros 12 meses

| Trimestre | Proveedores | MRR Suscripciones | Comisiones | Total |
|---|---|---|---|---|
| Q1 | 5 | $750/mes = $2.250 | 2 deals × $2.500 = $5.000 | $7.250 |
| Q2 | 12 | $2.400/mes = $7.200 | 5 deals × $2.500 = $12.500 | $19.700 |
| Q3 | 20 | $5.000/mes = $15.000 | 10 deals × $2.500 = $25.000 | $40.000 |
| Q4 | 27 | $7.500/mes = $22.500 | 15 deals × $2.500 = $37.500 | $60.000 |
| **Año 1 total** | | | | **~$127.000** |

**Break-even:** 10 proveedores Plan Básico ($150/mes cada uno) = $1.500/mes. Con 5 en Plan Profesional ($350/mes) = $3.250/mes operativo. Alcanzable en Q1–Q2.

### Fase 2 — Producto Propio (Escala avanzada)

Después de procesar cientos de simulaciones, conocemos:
- Qué pack se vende más en qué zona
- Qué proveedores tienen mejor reputación
- Cuál es el precio real de mercado

Bytex lanza sus **3 packs propios bajo marca propia** (Amanecer, Horizonte, Soberanía) — como Amazon Basics.

- Los proveedores se convierten en red de instalación subcontratada
- Margen directo: 35%
- Revenue proyectado Fase 2: $2M–5M/año con 20+ proveedores activos

### Por qué gana este modelo

| Factor | Instaladora Directa | Nuestro Marketplace |
|---|---|---|
| Capital necesario | Alto (inventario + leasing) | Mínimo |
| Velocidad de escala | Lenta (equipo propio) | Alta (red de proveedores) |
| Riesgo operativo | Alto | Bajo |
| Datos generados | Limitados | Crecen con cada simulación |
| Defensibilidad | Media | Alta (datos + red + marca) |
| Evolución natural | Difícil cambiar | Fase 2 emerge sola |

---

## ANÁLISIS DE MERCADO

### Tamaño del Mercado (TAM)

#### Universo de clientes potenciales

**Santa Cruz — 10.000–12.000 empresas energo-intensivas**

Desglose:
- ~1.350 en PILAT (Warnes)
- ~3.000 en zona industrial (El Trompillo, Charcas)
- ~6.000–8.000 en expansión (Cotoca, Montero, Warnes)

#### TAM en $

Suponiendo:
- Sistema solar promedio: $60.000–80.000
- Si 10% del universo instala en los próximos 5 años:
  - 1.200 empresas × $70.000 = **$84 millones**

- Si 20% instala:
  - 2.400 empresas × $70.000 = **$168 millones**

**TAM realista: $80M–$200M en Santa Cruz (5 años)**

### Crecimiento esperado

| Año | Adopción | Empresas que instalan | Revenue esperado |
|---|---|---|---|
| 1 | 0.5% | 60 empresas | $4.2M (como sector) |
| 2 | 2% | 240 empresas | $16.8M |
| 3 | 5% | 600 empresas | $42M |
| 4 | 10% | 1.200 empresas | $84M |
| 5 | 15% | 1.800 empresas | $126M |

**Bytex capturaría:** Comisiones + suscripciones + margen Fase 2
- Año 1: $127k (MVP)
- Año 3: $2M–3M (escala inicial)
- Año 5: $8M–12M (dominancia de mercado)

### Triggers de Crecimiento

1. **Shock tarifario 2031** — la tarifa sube. Urgencia explota
2. **Primeras 10 instalaciones exitosas** — casos de éxito demuestran ROI
3. **Integración con proveedores top** (Enersol, InnovaSol) — validación de mercado
4. **PILAT como referencia** — 1.350 empresas en un lugar es la mejor publicidad

---

## ANÁLISIS COMPETITIVO

### ¿Quiénes son los competidores?

#### Directo: NINGUNO
No existe plataforma de simulación + marketplace en Bolivia.

#### Indirecto (status quo):
- **Empresas solares:** Enersol, InnovaSol, Bolpegas, EnerLogic
  - Tienen experiencia, proveedores
  - NO tienen plataforma digital de captación de leads
  - Sus clientes vienen por referidos o ferias
  - No saben cuánta demanda hay disponible

- **Portales genéricos:** Olx, Facebook Groups
  - No hay especificidad energética
  - Sin análisis de IA
  - Sin confiabilidad verificada

- **Herramientas internacionales:** PVGIS, PVSyst
  - Diseñadas para ingenieros, no para empresarios
  - Sin contexto boliviano
  - Sin catálogo local de proveedores

#### Potencial futuro (si probamos tracción):
- Enersol u otro proveedor grande podría construir su propia plataforma
  - **Nuestra defensa:** Datos propietarios + efectos de red + red de 27 proveedores (no solo 1)
  - Es más fácil meterse a nuestro marketplace que construir competencia

### Ventaja competitiva sostenible

| Dimensión | Nosotros | Competencia |
|---|---|---|
| **IA + Datos locales** | ✅ Gemini + NASA POWER + INE + CRE real | ❌ Herramientas genéricas |
| **Marketplace** | ✅ 27 proveedores potenciales | ❌ Ninguno tiene plataforma |
| **Leads digitales** | ✅ Simulación → lead calificado | ❌ Todos usan referidos |
| **Confianza** | ✅ Reviews verificados, datos reales | ❌ Incertidumbre |
| **Costo de entrada** | ✅ MVP $0, escala mínima | ❌ Alto CapEx si es instaladora |
| **Defensa** | ✅ Datos + red + marca | ❌ Mediana |

---

## ANÁLISIS FODA

### FORTALEZAS

**F1. Único motor de análisis energético con IA en Bolivia**  
Ninguna de las ~27 empresas solares activas en Bolivia tiene una herramienta de análisis con IA y datos locales reales.

**F2. Datos locales reales integrados**  
Tarifas CRE reales, irradiación solar específica por zona, benchmark de consumo por rubro (INE Bolivia). Ningún proveedor usa esto.

**F3. Stack tecnológico 100% gratuito**  
Gemini, NASA POWER, Firebase. Costo operativo del MVP: $0.

**F4. Gemini como arquitectura central en hackathon GDG**  
No es decorativo — es el motor funcional. Abre puertas a créditos de Google.

**F5. Modelo marketplace sin CapEx propio**  
Los proveedores traen su capital. Nosotros aportamos IA + leads. Escala sin dinero.

**F6. Efectos de red en ambos lados**  
Más proveedores → más opciones → más simulaciones → más leads → más proveedores.

**F7. Argumento de timing irrefutable**  
El colapso del gas boliviano es un hecho documentado, no especulación.

**F8. Datos propietarios que crecen con el uso**  
Cada simulación alimenta el benchmark de consumo. Con tiempo, nuestras recomendaciones son más precisas que cualquier fuente pública.

### OPORTUNIDADES

**O1. 27 empresas solares activas como proveedores potenciales**  
Lo que eran "competidores" son ahora el ecosistema de la plataforma.

**O2. Proveedores sin canal digital B2B**  
Ninguna empresa solar boliviana tiene herramienta de captación de leads digital.

**O3. 10.000–12.000 empresas target en Santa Cruz**  
Base de clientes potenciales identificada, concentrada, sin una herramienta que les analice su situación energética.

**O4. PILAT como beachhead**  
1.350 empresas de 20 sectores en un solo parque industrial. Perfecto para validar mercado.

**O5. Shock tarifario inminente**  
Antes de 2031, Bolivia importará gas. La tarifa subsidiada termina. Quien construya hoy paga la mitad y entra protegido.

**O6. Marco regulatorio consolidado**  
Generación distribuida legal hasta 2 MW (DS 5549, feb 2026). Aranceles reducidos. Net metering formalizado.

**O7. Apagones 2023 como memoria institucional**  
48 horas sin luz. 87.000 conexiones afectadas. Los gerentes ya saben que el riesgo es real.

**O8. Contexto ESG para exportadores agroindustriales**  
La agroindustria cruceña exporta a mercados con exigencias de sostenibilidad. El análisis de CO₂ que generamos es un activo de compliance real.

### DEBILIDADES

**D1. Problema chicken & egg del marketplace**  
Sin proveedores, no hay valor para clientes. Sin clientes, no hay valor para proveedores. Necesitamos resolver esto desde el día 1 con 3–5 proveedores ancla.

**D2. Sin track record ni simulaciones reales completadas**  
Es nuevo. No hay casos de éxito bolivianos. En un mercado B2B conservador, eso es una objeción real.

**D3. Calidad del servicio depende de terceros**  
No controlamos instalación. Un proveedor que hace mal trabajo daña nuestra reputación. El sistema de reviews es crítico.

**D4. OCR de facturas CRE sujeto a calidad de imagen**  
Gemini maneja bien documentos claros. Facturas fotografiadas con mala iluminación pueden extraer mal. Necesitamos revisión + corrección del usuario.

**D5. Estimaciones de consumo por rubro son promedios**  
Para nuevos emprendedores, estimamos con tabla INE. Una empresa real puede consumir 30% más o menos. El resultado es orientativo, no ingeniería de detalle.

**D6. Sin experiencia en sector energético boliviano**  
El equipo viene del software. No conocemos tiempos reales de instalación, trabas de aduana, complejidades técnicas. Dependemos de los proveedores para aprender.

### AMENAZAS

**A1. Tarifa subsidiada reduce urgencia hoy**  
Mientras el subsidio se mantenga, el payback de 7–10 años no genera urgencia. La propuesta es más fuerte para quienes ya sufrieron apagón.

**A2. Un proveedor grande puede construir su propia plataforma**  
Enersol (40 años, 20+ MW) tiene recursos para replicar. Nuestra defensa: los datos propietarios y el efecto de red no se replican fácilmente.

**A3. Los proveedores pueden coordinarse y saltear la plataforma**  
Si se coordinan, pueden derivarse leads directamente. Nuestra defensa: el análisis de IA y la confianza del cliente son el valor real.

**A4. Inestabilidad política**  
El marco regulatorio favorable (DS 4477, DS 5549) son decretos modificables. Un cambio de gobierno altera incentivos.

**A5. DS 5549 — límite de 2 MW**  
Proyectos mayores a 2 MW requieren proceso más largo bajo Ley 1604. Limita el tamaño máximo de proyectos en la plataforma.

**A6. Resistencia cultural en PyMEs tradicionales**  
Muchas empresas familiares de Santa Cruz son conservadoras. La fricción de adoptar una herramienta digital para una decisión de $70.000 es real.

### Matriz FODA — Estrategias

#### Estrategias FO (Fortalezas + Oportunidades) — ATACAR

- **F1 + O2:** Posicionarse como el canal de leads B2B que los proveedores no tienen. El análisis de IA es el argumento de venta.
- **F7 + O5:** Usar el argumento del shock tarifario 2031 en pitch a proveedores: "Los clientes que hoy usan nuestra plataforma son los que van a instalar cuando la urgencia explote."
- **F6 + O1:** Activar el efecto de red desde el día 1: onboardear 5 proveedores antes del lanzamiento público.
- **F8 + O4:** PILAT como piloto: primeras simulaciones + primeros proveedores. Un caso real en el parque industrial más grande de Bolivia.

#### Estrategias DA (Debilidades + Amenazas) — DEFENDER

- **D1 + A2:** Resolver chicken & egg con acuerdos de proveedor ancla antes del lanzamiento.
- **D3 + A3:** Construir sistema de reviews verificados desde el MVP. La reputación pública de cada proveedor es el incentivo para no saltear la plataforma.
- **D2 + A6:** Primer simulación = primer caso de éxito. Documentar ROI de las primeras empresas, publicar — baja resistencia cultural.

---

## ANÁLISIS PESTEL

### POLÍTICO

✅ **Marco regulatorio favorable (DS 5549, feb 2026)**
- Generación distribuida legal hasta 2 MW
- Net metering formalizado
- Aranceles reducidos en equipamiento

⚠️ **Inestabilidad política**
- Decretos pueden revertirse con cambio de gobierno
- Contexto político fragmentado

### ECONÓMICO

🔴 **Subsidio tarifario aún vigente**
- Reduce urgencia de adopción hoy
- Pero está condenado — el gas se acaba antes de 2031

✅ **Tipo de cambio estable (9.96 Bs/USD)**
- Permite proyecciones financieras fiables
- Datos en tiempo real disponibles

⚠️ **Inflación histórica 5.2% anual**
- La tarifa CRE sube con la inflación
- Favorece el argumento "instala hoy antes de que suba más"

### SOCIAL

✅ **Apagones 2023 crearon conciencia**
- 48 horas sin luz, 87.000 conexiones
- Los gerentes de planta ya saben que el riesgo es real

✅ **Agroindustria exportadora con exigencias ESG**
- Necesitan demostrar sostenibilidad
- CO₂ evitado es un activo de compliance

⚠️ **Cultura empresarial conservadora en PyMEs**
- Resistencia a adoptar herramientas digitales
- Preferencia por contacto directo

### TECNOLÓGICO

✅ **APIs disponibles y maduras**
- Gemini 2.5 Flash-Lite accesible
- NASA POWER API gratuita y confiable
- Firebase scaling sin fricción

✅ **Penetración de smartphones**
- PWA funciona en navegador — no requiere app store
- Acceso desde oficina y celular del CEO

✅ **OCR avanzado con Gemini Vision**
- Puede extraer campos específicos incluso de documentos con mala iluminación
- Mejor que Tesseract o Cloud Vision para este caso

### AMBIENTAL

✅ **Bolivia importará gas antes de 2031**
- Oportunidad de mercado = crisis energética que se puede anticipar
- Quien construya hoy se anticipa al problema

✅ **Irradiación solar en Santa Cruz**
- 4.8 kWh/m²/día — una de las mejores condiciones de América Latina
- Tecnología solar es efectiva aquí

✅ **Demanda de sostenibilidad global**
- Empresas exportadoras necesitan demostrar huella de carbono baja
- ByteX genera datos de impacto ambiental

### LEGAL

✅ **Generación distribuida formalizada**
- DS 4477 (2021): GD legal
- DS 5549 (2026): DS 5549 refuerza regulación hasta 2 MW

⚠️ **Proyectos >2 MW requieren proceso más complejo**
- Ley 1604 (proceso de licencia más largo)
- Limita el tamaño máximo de proyectos "simples" en la plataforma

✅ **Net metering legal**
- Permite inyectar excedente de generación a la red
- Mejora el caso financiero

---

## ANÁLISIS FINANCIERO

### Estructura de costos — MVP

**Total MVP: $0/mes operativo**

| Componente | Costo |
|---|---|
| Gemini 2.5 Flash-Lite (free tier: 1.000 req/día) | $0 |
| NASA POWER API (gratuita) | $0 |
| Firebase Spark (hosting + Firestore + Auth) | $0 |
| Angular + AngularFire (open source) | $0 |
| Express.js + Node.js | $0 |
| **Total** | **$0** |

### Estructura de costos — Escala inicial (post-hackathon)

| Concepto | Costo estimado |
|---|---|
| Certificación de proveedores (legal + auditoría) | $2.000–5.000 (one-time) |
| Marketing B2B (CAINCO, PILAT, LinkedIn) | $1.000–2.000/mes |
| Hosting + APIs a escala (Firebase Blaze) | $200–500/mes |
| Equipo fundador (bootstrap/equity) | TBD |
| **Total operativo inicial** | **~$3.200–7.500/mes** |

### Break-even

Scenario 1 (Plan Básico):
- 10 proveedores × $150/mes = $1.500/mes
- No alcanza break-even

Scenario 2 (Mix Plan Básico + Profesional):
- 10 proveedores Plan Básico × $150 = $1.500
- 5 proveedores Plan Profesional × $350 = $1.750
- **Total: $3.250/mes**
- **Break-even: ~$3.250/mes operativo** ✅ ALCANZABLE

Scenario 3 (Mix + comisiones + leads):
- Base: $3.250/mes
- Comisiones: 5 deals/mes × $2.500 = $12.500/mes
- Leads: 10 leads/mes × $100 = $1.000/mes
- **Total: $16.750/mes** 🚀

### Proyección de revenue — Año 1

| Trimestre | Proveedores | MRR Suscripciones | Comisiones estimadas | Total |
|---|---|---|---|---|
| Q1 | 5 | $750/mes = $2.250 | 2 deals × $2.500 = $5.000 | $7.250 |
| Q2 | 12 | $2.400/mes = $7.200 | 5 deals × $2.500 = $12.500 | $19.700 |
| Q3 | 20 | $5.000/mes = $15.000 | 10 deals × $2.500 = $25.000 | $40.000 |
| Q4 | 27 | $7.500/mes = $22.500 | 15 deals × $2.500 = $37.500 | $60.000 |
| **Año 1 total** | | | | **~$127.000** |

### Proyección Año 2–5

| Año | Proveedores | Deals/mes | Revenue estimado |
|---|---|---|---|
| Año 1 | 27 | 15 | $127k |
| Año 2 | 50 | 35 | $420k–500k |
| Año 3 | 80 | 60 | $1.2M–1.8M |
| Año 4 | 120 | 100+ | $2.5M–4M |
| Año 5 | 150+ | 150+ | $5M–8M |

### Ratios financieros clave

| Métrica | Valor | Interpretación |
|---|---|---|
| **CAC (Customer Acquisition Cost)** | $0 (orgánico) | Sin marketing pagado en MVP |
| **LTV (Lifetime Value — proveedor)** | $1.800–8.400/año | Suscripción + comisiones |
| **Payback (como startup)** | ~18 meses | Break-even operativo mes 1, inversión seed en 12–18 |
| **TAM aprovechable** | $10M–50M/año | Año 3–5 en Santa Cruz |

---

## CONCLUSIONES

### Tesis de inversión

**Bytex es una oportunidad única de mercado cuyo window es ahora (2026–2031).**

1. **Problema real verificable:** Bolivia agotó sus reservas de gas. Importará antes de 2031. Las empresas que construyan infraestructura energética hoy pagan la mitad vs. 2031.

2. **Solución que no existe:** No hay plataforma de simulación + marketplace de soberanía energética en Bolivia. Categoría nueva.

3. **Mercado identificado y concentrado:** 10.000–12.000 empresas en Santa Cruz (TAM $80M–$200M en 5 años). 1.350 en PILAT es el beachhead perfecto.

4. **Modelo sin CapEx:** Marketplace B2B que conecta demanda con 27 proveedores existentes. Nosotros aportamos IA + leads. Escala sin dinero propio.

5. **Timing irrepetible:** La tarifa eléctrica sube antes de 2031. Quien construya hoy entra protegido. Quien espere paga el doble y compite por instalador.

6. **Defensibilidad:** Datos propietarios + efectos de red + marca first-mover en categoría nueva = difícil de replicar.

### Pasos inmediatos

1. **Ganar hackathon:** Validar prototipo, refinar pitch, demostrar tracción técnica
2. **Onboardear 3–5 proveedores ancla:** Enersol, InnovaSol, Bolpegas antes de lanzamiento público
3. **PILAT como piloto:** Primeras 50–100 simulaciones en el parque industrial
4. **Documentar primeros ROIs:** Casos de éxito que demuestren valor real
5. **Escalar:** Post-hackathon, a 20+ proveedores, 500+ simulaciones, Fase 2 hacia producto propio

### Ventaja ganadora

**En 2031, cuando la tarifa sube y la urgencia explota, Bytex va a estar ahí con:**
- Millones de datos de simulaciones de 5 años
- Red de 100+ proveedores certificados
- Marca reconocida en el sector energético
- Posición de dominancia de mercado

Quien espere para entrar a ese momento **paga el costo de estar tarde.**

---

*Documento consolidado de investigación para Hackathon Build With AI 2026 — GDG Santa Cruz, Bolivia.*  
*ByteX: Soberanía Energética para Empresas de Santa Cruz.*
