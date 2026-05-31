# Lean Canvas — Soberanía Energética (Marketplace)
## Hackathon Build With AI 2026 — Santa Cruz, Bolivia
## v2.0 — Modelo Marketplace actualizado

---

## 1. PROBLEMA
*Los 3 dolores más importantes del cliente*

**① CapEx eléctrico para nuevos emprendedores**
En zonas de expansión (Warnes, Cotoca, Montero), la CRE no tiene tendido cercano. El emprendedor paga transformador + postes + cableado: **$15.000–$50.000 USD de capital muerto** antes de encender una sola máquina. Ese dinero desaparece — es activo de la CRE, no del cliente.

**② Penalización por picos de demanda para empresas existentes**
La CRE cobra por **Potencia Máxima Demandada (kW)**. Una fábrica que arranca motores a las 14:00 infla toda su factura mensual. Los bajones de voltaje dañan maquinaria sensible — pérdidas de miles de dólares por hora de línea parada.

**③ Bolivia agotó su infraestructura energética — el reloj corre**
Las reservas de gas cayeron **65% en 12 años** (10.45 → 3.7 TCF). YPFB admitió (marzo 2026) que Bolivia importará gas antes de 2031. Cuando eso pase, la tarifa eléctrica subsidiada sube a precio internacional. Los apagones de 2023 (48h, 87.000 conexiones) ya muestran el colapso en curso.

**Alternativas existentes (status quo)**
- Seguir pagando a CRE sin opciones claras ni comparables
- Contactar instaladoras sin datos objetivos de ROI ni comparación de proveedores
- InnovaSol (55 instalaciones en todo Bolivia — mercado nasciente, sin plataforma digital)

---

## 2. SEGMENTOS DE CLIENTES
*Dos lados del marketplace*

### Lado Demanda — Empresas que buscan soberanía energética

**Segmento A — Nuevo Emprendedor Industrial**
- Industrias, aserraderos, agro-negocios, galpones logísticos en zonas de expansión
- Warnes, Cotoca, Montero — donde la CRE cobra el tendido
- Dolor: $15k–$50k de CapEx muerto antes de operar
- Universo: parte de las ~10.000–12.000 empresas energo-intensivas de Santa Cruz

**Segmento B — Empresa Existente con Alto Consumo**
- Manufactureras, frigoríficos, textiles, comercio grande, agroindustria
- Santa Cruz ciudad + PILAT (1.350 empresas en un solo lugar)
- Dolor: picos de demanda, apagones, factura impredecible
- Universo: 12.681 empresas manufactureras + logística + agroindustria en Santa Cruz

**Early adopters:** Empresas del PILAT (Warnes) — cuello de botella documentado (línea Warnes–Las Brechas), receptivas a generación propia (el parque planifica su propio parque eólico).

### Lado Oferta — Proveedores certificados

Empresas instaladoras activas en Bolivia que pagan para acceder a leads calificados:
- Enersol S.A. (Fronius + Victron, 40 años, 20+ MW)
- Bolpegas SRL (UKSOL, proyecto BFC 3MW)
- InnovaSol S.A. (leasing/PPA, 70+ sistemas)
- EnerLogic (agroindustrial, 50+ proyectos)
- Distribuidores Huawei FusionSolar (AMESOL, HEXACORP, DMC, SIE SA, DIGICORP)

---

## 3. PROPUESTA DE VALOR ÚNICA

### Para empresas (lado demanda):
> **"Subís tu factura. En 3 minutos sabés exactamente qué sistema necesitás, cuánto te cuesta, cuándo lo recuperás y quién te lo instala — todo verificado."**

No buscamos proveedores por vos. Tampoco te vendemos el primero que aparece. Te mostramos tus números reales y te conectamos con proveedores certificados que compiten por tu proyecto.

### Para proveedores (lado oferta):
> **"Accedés a leads calificados que ya saben lo que necesitan y ya decidieron invertir."**

Un lead que corrió la simulación, vio su ROI y solicitó contacto no es un curioso — es un comprador. Pagás por acceder a eso, no por publicidad genérica.

---

## 4. SOLUCIÓN
*App gratuita con dos modos*

### Modo Evaluación (pre-instalación) — gratuito

El análisis de IA es el corazón del producto. El cliente responde 4 preguntas y la IA hace el trabajo que hoy ninguna empresa en Bolivia hace: dimensionar el sistema exacto que necesita, con sus datos reales, y conectarlo con quién puede construirlo.

**Inputs del cliente (4 preguntas):**
1. **¿Qué nivel de independencia querés?** → Reducir mi factura / Depender menos de la CRE / Independencia total
2. **¿Qué ya tenés instalado?** → Nada / Ya tengo paneles / Ya tengo inversor
3. **¿Cuál es tu presupuesto?** → Rango en USD
4. **¿Quién sos?** → Subí tu factura CRE (empresa existente) o seleccioná rubro + zona (nuevo emprendedor)

**Lo que hace la IA con esos inputs:**

*Empresa existente:*
Factura CRE → Gemini extrae kWh, pico kW, costo → NASA POWER entrega irradiación exacta de tu zona → motor de sizing calcula paneles + baterías + inversor necesarios para alcanzar TU nivel de independencia con TU presupuesto → comparativa personalizada CRE vs sistema recomendado.

*Nuevo emprendedor:*
Rubro + zona → IA estima consumo (tabla INE Bolivia) → calcula CapEx CRE ($15k–$50k muerto) vs microred propia dimensionada para ese rubro → recomendación personalizada.

**Output personalizado (no genérico):**
> *"Para lograr 70% de independencia con tu consumo de 47.000 kWh/mes en Warnes, necesitás exactamente 182 paneles 550W + 10 baterías Pylontech + inversor Huawei 100kW. Costo estimado: $58.000–$72.000. Payback: 4.8 años. Estos 3 proveedores en tu zona pueden instalarlo dentro de tu presupuesto."*

- Componentes exactos recomendados (no tallas únicas)
- ROI y payback calculados con TUS datos reales
- Proveedores certificados en tu zona ordenados por precio, tiempo y reputación

### Modo Gestión (post-instalación) — gratuito para clientes con sistema instalado

- Dashboard en tiempo real: kWh generados, estado de baterías, dependencia CRE residual
- Inteligencia de negocio: ahorro mensual en Bs, % de ROI alcanzado, fecha de recuperación
- CO₂ evitado acumulado (vs grid boliviano 0.42 kg/kWh)
- Alertas de mantenimiento y anomalías
- Upgrade simulator: "pasarte al Pack Horizonte te ahorraría $X adicionales"
- Integración APIs: Huawei FusionSolar + Fronius Solar API + Victron VRM

---

## 5. CANALES

**Canal primario — App gratuita como punto de entrada**
Sin fricción. Sin tarjeta. La empresa llega, simula, ve su realidad en 3 minutos.

**Canal secundario — Redes industriales B2B**
- CAINCO (Cámara de Industria y Comercio Santa Cruz)
- Núcleos empresariales del PILAT (Warnes)
- Asociaciones de agroindustriales de Santa Cruz

**Canal terciario — Los propios proveedores**
Cada proveedor listado tiene incentivo para recomendar la plataforma a sus clientes — porque gestionar sus proyectos y reviews desde nuestra app les da visibilidad y credibilidad.

---

## 6. FLUJOS DE INGRESOS

La app es gratuita para clientes. El revenue viene del lado de los proveedores.

**① Suscripción mensual de proveedores**
| Plan | Precio | Beneficios |
|---|---|---|
| Básico | $150/mes | Perfil listado, acceso a leads de su zona |
| Profesional | $350/mes | Perfil destacado, badge verificado, analytics |
| Premium | $700/mes | Top de resultados, integración de monitoreo en app |

**② Comisión por deal cerrado**
3–5% sobre el valor del proyecto cerrado a través de la plataforma.
Ejemplo: Pack Horizonte $76.000 → comisión $2.280–$3.800

**③ Leads calificados**
Empresas que completaron simulación y solicitaron contacto: $50–$150 por lead según tamaño estimado del sistema.

**④ Placement destacado**
Proveedores que quieren aparecer primero para cierto rubro o zona pagan por posicionamiento. Similar a Google Ads o resultados patrocinados de Amazon.

**Fase 2 — Producto propio**
Con escala y conocimiento del mercado, lanzamos nuestros propios packs bajo marca propia. Los proveedores se convierten en red de instalación subcontratada. Margen directo del 35%.

---

## 7. ESTRUCTURA DE COSTOS

**MVP — $0 operativo**
| Componente | Costo |
|---|---|
| Gemini 2.5 Flash-Lite | $0 (free tier) |
| NASA POWER API | $0 (gratuita) |
| Firebase stack completo | $0 (Blaze free tier) |
| Angular + AngularFire | $0 (open source) |

**Operación inicial post-hackathon**
| Concepto | Estimado |
|---|---|
| Certificación de proveedores (legal + auditoría) | $2.000–5.000 one-time |
| Marketing B2B (CAINCO, PILAT, LinkedIn) | $1.000–2.000/mes |
| Hosting + APIs a escala | $200–500/mes |
| **Break-even operativo** | **10 proveedores Básico + 5 Profesional = $3.250/mes** |

---

## 8. MÉTRICAS CLAVE

| Métrica | Qué mide |
|---|---|
| Simulaciones completadas / semana | Tracción del producto |
| Tasa simulación → solicitud de proveedor | Conversión lado demanda |
| Proveedores activos en plataforma | Salud del lado oferta |
| Tiempo simulación → contacto proveedor | Eficiencia del marketplace |
| Deals cerrados / mes | Revenue real |
| NPS empresas (post-simulación) | Calidad del producto |
| NPS proveedores (post-deal) | Calidad del marketplace |
| kWh generados acumulados (IoT) | Impacto demostrable |
| ton CO₂ evitadas acumuladas | Argumento ESG |

---

## 9. VENTAJA INJUSTA

**① Datos propietarios que crecen con cada simulación**
Cada simulación construye el benchmark de consumo por rubro y zona en Santa Cruz. Con el tiempo, las estimaciones son más precisas que cualquier fuente pública — y ese dataset es nuestro.

**② Primera plataforma de este tipo en Bolivia**
No existe ningún marketplace ni simulador de soberanía energética en Bolivia. Ser primero en una categoría nueva es la ventaja más difícil de replicar.

**③ Efectos de red en ambos lados**
Más proveedores → más opciones para empresas → más simulaciones → más leads → más proveedores quieren estar. El marketplace se auto-refuerza.

**④ Gemini como motor central en contexto GDG**
Hackathon organizada por GDG Santa Cruz. Gemini no es decorativo — es la arquitectura central del producto. Eso abre puertas a créditos de Google y soporte técnico preferencial.

**⑤ Timing irrepetible**
El gas boliviano se acaba. La tarifa va a subir antes de 2031. Quien construya su infraestructura hoy paga la mitad y entra protegido. Nosotros somos la plataforma que hace eso posible hoy.

---

## Resumen ejecutivo para el pitch

- **Problema**: Bolivia agotó su soberanía energética. Antes de 2031 la tarifa eléctrica subsidiada termina. Las empresas que no construyan su infraestructura hoy van a pagar el doble después.
- **Solución**: El marketplace de soberanía energética de Bolivia. App gratuita con IA que convierte tu factura en un plan de independencia energética y te conecta con proveedores certificados.
- **Modelo**: Gratuito para empresas. Revenue de proveedores (suscripción + comisión + leads). Fase 2: producto propio.
- **Mercado**: 10.000–12.000 empresas target + 27 empresas solares activas como proveedores potenciales. TAM $80M–$200M.
- **Tecnología**: Gemini 2.5 (OCR + razonamiento), NASA POWER API, Angular PWA + Firebase. Stack $0.
- **Ventaja**: Primera plataforma de este tipo en Bolivia, datos que crecen con el uso, efectos de red en ambos lados, timing irrepetible.
