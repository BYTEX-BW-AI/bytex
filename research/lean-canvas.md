# Lean Canvas — Simulador de Soberanía Energética
## Hackathon Build With AI 2026 — Santa Cruz, Bolivia

---

## 1. PROBLEMA
*Los 3 dolores más importantes del cliente*

**① CapEx eléctrico para nuevos emprendedores**
En zonas de expansión (Warnes, Cotoca, Montero), la CRE no tiene tendido cercano. El emprendedor debe pagar de su bolsillo transformador + postes + cableado: entre **$15.000 y $50.000 USD** antes de encender una sola máquina. Capital muerto.

**② Penalización por picos de demanda para empresas existentes**
La CRE cobra por **Potencia Máxima Demandada (kW)**. Una fábrica que arranca motores pesados a las 14:00 (hora pico de calor) infla toda su factura mensual. Además, los bajones de voltaje dañan maquinaria sensible — pérdidas de miles de dólares por hora de línea parada.

**③ Incertidumbre energética nacional**
Las reservas de gas de Bolivia cayeron **65% en 12 años** (10.45 → 3.7 TCF). YPFB admitió oficialmente (marzo 2026) que Bolivia podría importar gas antes de 2031. El 70% de la electricidad del SIN viene de gas. La tarifa subsidiada no es sostenible. Los apagones de 2023 (48h, 87.000 conexiones) ya son historia documentada.

**Alternativas existentes (status quo)**
- Seguir pagando a CRE y rezar que no haya cortes
- InnovaSol S.A. (55 instalaciones en todo Bolivia — mercado nasciente)
- Enersol S.A. (foco residencial/rural, no industrial)

---

## 2. SEGMENTOS DE CLIENTES
*¿A quién le duele más?*

**Segmento A — Nuevo Emprendedor Industrial**
- Industrias, aserraderos, agro-negocios, galpones logísticos
- Ubicación: eje metropolitano (Warnes, Cotoca, Montero) o zonas rurales de Santa Cruz
- Dolor principal: $15k–$50k de CapEx muerto para conectarse a la CRE
- Universo: parte de las ~10.000–12.000 empresas energo-intensivas de Santa Cruz

**Segmento B — Empresa Existente con Alto Consumo**
- Manufactureras, frigoríficos, textiles, comercio grande, oficinas con climatización intensiva
- Ubicación: Santa Cruz ciudad + PILAT (1.350 empresas en un solo lugar)
- Dolor principal: picos de demanda, bajones de voltaje, factura variable e impredecible
- Universo: 12.681 empresas manufactureras + logística + agroindustria en Santa Cruz

**Early adopters**
Empresas del PILAT (Warnes) — tienen el dolor documentado (línea Warnes–Las Brechas como cuello de botella) y ya están receptivas a generación propia (el parque planifica un parque eólico propio).

---

## 3. PROPUESTA DE VALOR ÚNICA
*¿Por qué nosotros? ¿Por qué ahora?*

> **"En 3 minutos, tu factura de la CRE se convierte en el plano financiero de tu propia planta de energía."**

No vendemos paneles. Vendemos **independencia de un sistema que el propio Estado boliviano admite que está llegando a su límite.**

- Para el nuevo emprendedor: en lugar de pagar $30k a la CRE por un transformador (activo de ellos, no tuyo), invertís ese capital en tu propia microred — y la owns en 4–5 años.
- Para la empresa existente: eliminás los picos de demanda que inflan tu factura, estabilizás el voltaje, y te desconectás del riesgo de apagón.
- Para todos: de 0.40–0.45 kg CO2/kWh (SIN/gas) a 0.02–0.05 kg CO2/kWh (solar). 90–95% menos emisiones. Real, no un folleto verde.

---

## 4. SOLUCIÓN
*Las 3 funcionalidades core del MVP*

**① OCR + extracción con IA (Gemini)**
El usuario sube foto/PDF de su factura CRE. Gemini 2.5 Flash-Lite extrae: kWh total, pico kW, costo mensual, historial. Sin formularios manuales.

**② Motor de sizing de microred**
Con los datos extraídos (o con consumo estimado por rubro para nuevos emprendedores), la IA:
- Dimensiona paneles solares (usando irradiación NASA POWER API — 4.5–5.2 kWh/m²/día Santa Cruz)
- Dimensiona banco de baterías (autonomía nocturna)
- Dimensiona generador de respaldo
- Calcula CapEx total usando benchmark IRENA Latam ($1.00–$1.50 USD/watt)

**③ Comparativa directa CRE vs Microred**
| | CRE R.L. (Dependencia) | Microred Propia (Soberanía) |
|---|---|---|
| Costo transformador | $15k–$50k (activo de CRE) | $0 |
| Pago mensual | Variable + picos kW | Cuota fija de amortización |
| ROI | N/A | Payback 5–8 años (acortándose) |
| Riesgo de apagón | ALTO (documentado 2023) | Mínimo (batería local) |
| Emisiones | ~0.42 kg CO2/kWh | ~0.03 kg CO2/kWh |
| Dependencia del gas | 70% | 0% |

---

## 5. CANALES
*¿Cómo llega el producto al cliente?*

**Canal primario — El simulador como Lead Magnet**
La plataforma web es gratuita y de acceso libre. Una empresa que corre la simulación y ve su ROI es un lead calificado que ya entendió el valor.

**Canal secundario — Redes industriales**
- CAINCO (Cámara de Industria, Comercio, Servicios y Turismo de Santa Cruz)
- Núcleos empresariales del PILAT
- Asociaciones de agroindustriales de Santa Cruz

**Canal terciario — Venta directa B2B**
Equipo comercial que acerca el simulador a empresas del PILAT y parques industriales con problemas de suministro documentados.

---

## 6. FLUJOS DE INGRESOS
*¿Dónde está el dinero real?*

El simulador es el embudo. El negocio real tiene tres pilares:

**① Venta directa de microredes**
Suministro físico de componentes (paneles Tier 1, inversores industriales, baterías de litio ciclo profundo), logística de importación y montaje certificado en terreno del cliente.

**② Leasing Energético (EaaS — Energy as a Service)**
El cliente no desembolsa capital. Nosotros financiamos el equipamiento. El cliente paga una cuota mensual equivalente (o menor) a lo que pagaba a CRE. Se convierte en dueño del sistema al cabo de 4–5 años.
*Este modelo elimina la principal objeción: "no tengo capital para la inversión inicial."*

**③ Mantenimiento Técnico Recurrente (SaaS + Hardware IoT)**
Contratos de servicio para monitoreo remoto de baterías, inversores y eficiencia de paneles vía red de sensores IoT. Garantiza que el sistema funcione 24/7.

---

## 7. ESTRUCTURA DE COSTOS
*¿Qué necesitamos para operar?*

**Costos del MVP (hackathon) — prácticamente $0**
- Gemini 2.5 Flash-Lite API: free tier (1.000 req/día)
- NASA POWER API: gratuita
- Hosting: free tier (Vercel / Railway / Render)
- Dominio: ~$10/año

**Costos del negocio real (post-hackathon)**
- Importación y logística de equipos solares (principal costo variable)
- Capital para financiar el leasing energético (principal costo de escala)
- Equipo técnico de instalación y mantenimiento
- Plataforma IoT para monitoreo remoto
- Estructura comercial B2B

---

## 8. MÉTRICAS CLAVE
*¿Cómo sabemos que funciona?*

| Métrica | Qué mide |
|---|---|
| Simulaciones completadas / semana | Activación del embudo |
| Tasa simulación → consulta comercial | Conversión del lead magnet |
| Tiempo promedio de simulación | UX y fricción del producto |
| Cotizaciones enviadas | Pipeline de ventas |
| Instalaciones completadas | Revenue real |
| NPS post-instalación | Calidad del servicio |
| kWh generados acumulados (IoT) | Impacto demostrable |
| ton CO2 evitadas acumuladas | Argumento de sostenibilidad |

---

## 9. VENTAJA INJUSTA
*Lo que no se puede copiar fácilmente*

**① Datos propietarios que crecen con el uso**
Cada simulación alimenta el benchmark de consumo por rubro en Santa Cruz. Con el tiempo, las estimaciones para nuevos emprendedores son más precisas que cualquier tabla genérica de INE.

**② Primer simulador de este tipo en Bolivia**
El mercado solar B2B en Bolivia tiene 55 instalaciones en todo el país (InnovaSol). No existe ninguna herramienta de este tipo — el simulador como lead magnet es una categoría nueva localmente.

**③ Integración Gemini en contexto GDG**
La hackathon es organizada por GDG Santa Cruz. El uso profundo de Gemini como motor de OCR + razonamiento financiero no es decorativo — es la arquitectura central del producto, y abre puertas a créditos y soporte de Google.

**④ Timing irrepetible**
El gas boliviano se está acabando. La tarifa eléctrica va a subir. El subsidio se va a eliminar. Las empresas que instalen microredes ahora van a tener payback de 3–4 años en lugar de 5–8. Quien entre ahora construye la base de clientes antes de que el mercado explote.

---

## Resumen ejecutivo para el pitch

- **Problema**: Las empresas de Santa Cruz dependen de un sistema eléctrico que el 70% alimenta con gas que se acaba.
- **Solución**: Un simulador con IA que convierte tu factura en el plano financiero de tu independencia energética.
- **Mercado**: 10.000–12.000 empresas target en Santa Cruz. TAM $80M–$200M.
- **Modelo**: El simulador es gratuito (lead magnet). El negocio es EaaS: venta, leasing y mantenimiento de microredes solares.
- **Tecnología**: Gemini 2.5 (OCR + razonamiento), NASA POWER API (irradiación solar), stack 100% gratuito para el MVP.
- **Ventaja**: Primer mover en un mercado nasciente con datos propietarios que crecen con el uso.
