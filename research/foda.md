# Análisis FODA — Simulador de Soberanía Energética
## Hackathon Build With AI 2026 — Santa Cruz, Bolivia

---

## FORTALEZAS (interno — lo que tenemos)

**F1. Único simulador con IA en Bolivia — espacio completamente vacío**
Ninguna de las ~27 empresas solares activas en Bolivia tiene una herramienta de simulación con IA y datos locales reales. No es una ventaja marginal: es una categoría nueva.

**F2. Datos locales reales integrados**
Tarifas CRE reales, irradiación solar específica de Santa Cruz (NASA POWER API), benchmark de consumo por rubro (INE Bolivia). Ningún competidor usa esto — todos recurren a herramientas genéricas internacionales (PVGIS, PVSyst) que no conocen la CRE, los picos de demanda locales ni la realidad tarifaria boliviana.

**F3. Stack tecnológico 100% gratuito**
Gemini 2.5 Flash-Lite (OCR + razonamiento), NASA POWER API, hosting free tier. Costo operativo del MVP: $0. Esto elimina la barrera de entrada para validar el producto antes de necesitar inversión.

**F4. Gemini como arquitectura central en una hackathon GDG**
La hackathon es organizada por Google Developer Groups Santa Cruz. Usar Gemini no como decoración sino como motor funcional del producto es una señal de madurez técnica que los jueces van a valorar explícitamente.

**F5. Modelo EaaS elimina la objeción más grande**
El leasing energético convierte una inversión de $80k–$200k en una cuota mensual equivalente a lo que ya paga a la CRE. El cliente no necesita capital inicial — el principal freno de adopción en un mercado con tarifa subsidiada desaparece.

**F6. Doble flujo cubre dos mercados distintos**
El simulador atiende tanto a empresas existentes (suben su factura) como a nuevos emprendedores (seleccionan rubro y zona). Dos dolores distintos, una sola plataforma.

**F7. Argumento de timing irrefutable y documentado**
El colapso del gas boliviano (–65% en reservas en 12 años) y la admisión oficial de YPFB (marzo 2026) no son especulación — son hechos verificables con fuentes primarias. El argumento "instalá ahora antes del shock tarifario" tiene sustento periodístico y gubernamental.

**F8. Efecto de red en los datos**
Cada simulación que corre un usuario alimenta el benchmark de consumo por rubro en Santa Cruz. Con el tiempo, las estimaciones para nuevos emprendedores son más precisas que cualquier tabla genérica. Los datos propios son una ventaja que crece sola.

---

## OPORTUNIDADES (externo — lo que el contexto nos ofrece)

**O1. Mercado nasciente sin líder digital**
InnovaSol — el competidor más directo — tiene 55 sistemas instalados en todo Bolivia con $1M de capital. El mercado B2B solar no tiene dueño. Entrar ahora es entrar antes de que haya un líder consolidado.

**O2. 10.000–12.000 empresas target en Santa Cruz sin solución digital**
La base de clientes potenciales está identificada, concentrada geográficamente y sin una herramienta que les explique su propia situación energética.

**O3. PILAT como beachhead perfecto**
1.350 empresas de 20 sectores en un solo parque industrial (Warnes), con problemas de suministro documentados (línea Warnes–Las Brechas) y el propio parque planificando generación propia. Es el piloto ideal.

**O4. Shock tarifario inminente — ventana de timing única**
Antes de 2031, Bolivia tendrá que importar gas a precio internacional (~$400M/año adicionales). La tarifa subsidiada que hoy comprime el ROI va a subir. Las empresas que instalen microredes hoy van a tener payback de 3–4 años en lugar de 8. Quien entre ahora captura ese mercado antes de que la urgencia sea obvia para todos.

**O5. Marco regulatorio DG consolidado y reciente (DS 4477 / 4539 / 5167)**
La generación distribuida ya es legal, los aranceles en equipos son cero, y el net metering/billing está formalizado desde julio 2024. El contexto legal nunca fue más favorable.

**O6. Apagones de 2023 como memoria institucional**
Las 48 horas sin luz en pleno verano cruceño ya están grabadas en la memoria de los gerentes de planta de Santa Cruz. No hay que convencer a nadie de que el riesgo existe — ya lo vivieron.

**O7. Calor extremo de Santa Cruz = pico solar y pico de penalización coinciden**
El horario de mayor penalización por kW demandado (14:00–16:00) es exactamente cuando los paneles solares generan su máxima potencia. El sistema solar no solo genera energía — activamente elimina la penalización más cara de la factura.

**O8. Contexto ESG para exportadores**
La agroindustria cruceña exporta a mercados que exigen métricas de sostenibilidad. Una microred solar con medición de CO₂ evitado es un activo de compliance internacional.

---

## DEBILIDADES (interno — lo que nos falta)

**D1. MVP sin track record ni clientes reales**
El simulador es nuevo. No hay casos de éxito bolivianos que mostrar. En un mercado conservador, la falta de referencias locales es una objeción real en la venta B2B.

**D2. Precios de equipos hardcodeados — sin actualización dinámica**
El benchmark de $1.00–$1.50 USD/watt (IRENA Latam) es una estimación. No refleja precios reales de importadores bolivianos, variaciones por logística ni el tipo de cambio actual. Puede generar presupuestos inexactos.

**D3. Sin capital para financiar el modelo de leasing**
El EaaS requiere que la empresa financie el equipamiento y lo recupere en cuotas durante 4–5 años. Para escalar este modelo se necesita capital de trabajo significativo que un equipo de hackathon no tiene.

**D4. Dependencia de hardware importado**
Bolivia no fabrica paneles, inversores ni baterías. Todo el hardware depende de logística internacional, tiempos de importación variables y acceso a USD en un contexto de restricciones cambiarias.

**D5. OCR de facturas CRE sujeto a calidad de imagen**
Gemini maneja bien documentos claros, pero facturas fotografiadas con mala iluminación, formatos atípicos o imágenes borrosas pueden generar extracciones incorrectas. El usuario necesita poder revisar y corregir los datos extraídos.

**D6. Estimaciones de consumo por rubro son promedios, no mediciones**
Para nuevos emprendedores, el simulador estima consumo usando tablas de referencia (INE/promedios). Una panadería real puede consumir 30% más o menos que el promedio del rubro. El resultado del simulador es orientativo, no una ingeniería de detalle.

**D7. Equipo sin experiencia en ingeniería eléctrica industrial**
Dimensionar correctamente una microred industrial (protecciones, compatibilidad con maquinaria, factores de demanda) requiere conocimiento técnico especializado que va más allá del software.

---

## AMENAZAS (externo — lo que el contexto nos puede dañar)

**A1. Tarifa subsidiada reduce urgencia hoy**
Mientras el subsidio al gas se mantenga, el payback de 5–8 años no genera urgencia en empresas que nunca vivieron un apagón prolongado. La propuesta de valor es más fuerte para quienes ya sufrieron el problema.

**A2. Inestabilidad política — decretos pueden revertirse**
El marco regulatorio favorable (DS 4477, DS 4539, DS 5167) son decretos supremos — pueden modificarse por el ejecutivo sin proceso legislativo. Un cambio de gobierno puede alterar los incentivos.

**A3. Crisis de acceso a USD en Bolivia**
Bolivia tiene reservas internacionales en mínimos históricos y restricciones crecientes al acceso de divisas. Importar hardware solar en USD puede volverse más difícil y costoso.

**A4. Competidores establecidos pueden replicar el simulador**
Enersol (con 40 años y recursos) o S.Solar (con ambición de 1 GW) pueden desarrollar su propio simulador si ven tracción en el nuestro. La ventaja de ser primero es real pero tiene una vida útil limitada.

**A5. Límite regulatorio de 350 kW para generación distribuida**
Proyectos industriales grandes superan este límite y requieren licencia bajo Ley 1604 — proceso más largo, más burocrático y con mayor incertidumbre regulatoria.

**A6. Resistencia cultural en PyMEs tradicionales**
Muchas empresas familiares de Santa Cruz tienen mentalidad conservadora. "Llevan 20 años pagando a la CRE" y el cambio genera fricción, especialmente cuando el interlocutor no es el dueño sino un encargado administrativo.

**A7. Logística de importación impredecible**
Los tiempos de llegada de contenedores con paneles y baterías desde China o Europa pueden extenderse por meses. El negocio de instalación depende de una cadena de suministro que Bolivia no controla.

---

## Matriz FODA — Estrategias cruzadas

### Estrategias FO (Fortalezas + Oportunidades) — Atacar
| | |
|---|---|
| F1 + O1 | Posicionarse como **el** simulador solar de Bolivia antes de que exista competencia digital. Primero en el mercado = referencia de la categoría. |
| F7 + O4 | Usar el argumento del shock tarifario 2031 como urgencia de ventas. El timing documentado convierte la propuesta de valor en una decisión de riesgo, no de conveniencia. |
| F2 + O3 | Pilotear en PILAT con datos reales de tarifas CRE y consumo industrial cruceño. Un caso de éxito en el parque industrial más grande de Bolivia vale por 1.000 folletos. |
| F5 + O2 | El modelo EaaS (leasing) como puerta de entrada al mercado masivo. Sin CapEx = sin objeción de inversión = funnel de conversión más corto. |

### Estrategias DA (Debilidades + Amenazas) — Defender
| | |
|---|---|
| D1 + A6 | Construir casos de uso con datos reales lo antes posible. Un testimonio de un gerente del PILAT vale más que cualquier argumento técnico para una PyME conservadora. |
| D3 + A3 | Diseñar el modelo de leasing con cuotas en bolivianos indexadas a la tarifa CRE — no en USD — para proteger al cliente y al negocio de la volatilidad cambiaria. |
| D2 + A4 | Actualizar precios de equipos trimestralmente con cotizaciones reales de importadores locales. Esto también es una barrera de replicación para competidores: los datos dinámicos requieren relaciones comerciales reales. |

---

## Resumen visual

```
                    POSITIVO          NEGATIVO
              ┌─────────────────┬─────────────────┐
   INTERNO    │  FORTALEZAS     │  DEBILIDADES    │
              │  F1–F8          │  D1–D7          │
              │  Simulador IA   │  Sin track rec. │
              │  único en BOL   │  Sin capital    │
              │  Stack $0       │  Hardware dep.  │
              ├─────────────────┼─────────────────┤
   EXTERNO    │  OPORTUNIDADES  │  AMENAZAS       │
              │  O1–O8          │  A1–A7          │
              │  Mercado vacío  │  Tarifa subsid. │
              │  PILAT beachh.  │  Inestab. pol.  │
              │  Shock 2031     │  Copias posibles│
              └─────────────────┴─────────────────┘
```
