# Research de Mercado — Proyecto Soberanía Energética
## Hackathon Build With AI 2026 — Santa Cruz, Bolivia

---

## 1. Stack de Datos del Simulador

| Dato | Fuente | Acceso | Costo |
|---|---|---|---|
| Tarifas CRE | cre.com.bo/entender-mi-consumo/conoce-las-tarifas/ | Público, scraping/hardcoding | $0 |
| Irradiación solar Santa Cruz | NASA POWER API (power.larc.nasa.gov) | Free, sin registro | $0 |
| Irradiación solar (alternativa) | Global Solar Atlas — globalsolaratlas.info | Free, sin registro | $0 |
| OCR de facturas | Gemini 2.5 Flash-Lite (ai.google.dev) | Free tier: 1.000 req/día | $0 |
| OCR offline alternativo | Tesseract OCR | Open source | $0 |
| Consumo por industria | INE Bolivia — ine.gob.bo | Free, descarga manual | $0 |
| Precios de equipos | Hardcodeado — benchmark IRENA Latam | $1.00–$1.50 USD/watt instalado | $0 |

**Irradiación Santa Cruz:** 4.5–5.2 kWh/m²/día (una de las mejores de la región)

**Nota Gemini:** La hackathon es organizada por GDG Santa Cruz — usar Gemini como motor central es estratégico para el pitch y la evaluación.

---

## 2. Mercado de Empresas en Santa Cruz

### Tamaño del mercado
- **117.894 empresas registradas** en Santa Cruz (agosto 2025)
- Representa el **29.9% de toda la base empresarial de Bolivia**
- Bolivia total: 387.764 empresas
- Santa Cruz lidera nacionalmente en nuevas empresas: 33.3% de todos los registros nuevos en 2025
- Contribuye el **34.3–34.6% del PIB nacional**

### Breakdown por tipo legal
| Tipo | % en Santa Cruz |
|---|---|
| Empresas unipersonales | 73.8% |
| SRL (Sociedad de Responsabilidad Limitada) | 24.4% |
| SA (Sociedad Anónima) | 1.6% |

### Sectores dominantes (SEPREC 2025)
| Sector | Unidades | % |
|---|---|---|
| Comercio mayorista/minorista | 42.587 | 36.1% |
| Manufactura | 12.681 | 10.8% |
| Transporte y logística | 11.587 | 9.8% |
| Servicios profesionales | 10.006 | 8.5% |
| Construcción | 9.793 | 8.3% |

### Target real (B2B con consumo energético relevante)
- Eliminar unipersonales (~87.000) → quedan **~30.900 SRL y SA**
- Filtrar por rubros energo-intensivos (manufactura + agro + logística + comercio grande = ~35%)
- **Target addressable: ~10.000–12.000 empresas**

---

## 3. Distribución Geográfica

### Zona metropolitana
- **Santa Cruz de la Sierra** (capital): núcleo comercial y de servicios
- **Warnes, Cotoca, La Guardia, Montero**: cinturón industrial metropolitano, crecimiento explosivo post-2012

### Parques industriales clave

#### PILAT — Parque Industrial Latinoamericano (Warnes)
- **1.850 hectáreas**, capacidad para 1.500 industrias
- **90% ya vendido** — actualmente **1.350+ empresas** de 20 sectores
- Sectores: alimentos, logística, farmacia, acero, insumos agrícolas
- 20 min de Santa Cruz ciudad, 5 min del aeropuerto Viru Viru
- Uno de los 6 parques industriales más grandes del mundo por área
- **Tiene su propia planta termoeléctrica cercana (570 MW Warnes)**
- Planifica un parque eólico propio — señal de receptividad a generación propia
- **Beachhead perfecto**: 1.350 empresas en un solo lugar

#### Parque Industrial Ramón Darío Gutiérrez (ciudad)
- **311 empresas** dentro del perímetro urbano (4to–7mo anillo)

#### ZOFRACRUZ
- Zona franca comercial/logística cerca del aeropuerto

### Zonas con problemas documentados de suministro CRE
- **Agosto 2023**: Santa Cruz batió récord nacional con 417 MW de consumo → apagones de **48 horas** afectando 87.000 conexiones
- **2023**: 150.000 personas afectadas por fallas en Transpa (empresa de transmisión)
- CRE invirtió $83.4M en 2024 y $150.4M en 2023–2027 en expansión — confirma que hay brechas existentes
- Línea **Warnes–Las Brechas**: cuello de botella documentado para el norte industrial
- Nueva subestación abierta en 2023 específicamente para la zona del Parque Industrial

---

## 4. Competidores en el Mercado Solar B2B

### InnovaSol S.A. ⚠️ (competidor directo más relevante)
- Modelo: **leasing/PPA** — cliente paga $0 CapEx, paga por energía usada
- **55+ sistemas** instalados a nivel nacional
- Capital comprometido: $1M
- Respaldado por Fundación SOLYDES y Grupo Panamerican
- Servicios: diseño, ingeniería, instalación, monitoreo 24/7
- Target: B2B comercial e industrial
- **El mercado es NASCIENTE** — 55 sistemas en todo Bolivia es nada

### Enersol S.A.
- Fundada 1986, **14+ MW instalados**, 20.000+ instalaciones
- Principalmente residencial y rural/off-grid
- Modelo: venta de productos (menos enfoque en servicio/leasing)

### Otros actores menores
- Solaria Bolivia, Tecnosol SRL, SKSolar Bolivia, Energía Simple
- Santa Cruz concentra **37% de todas las empresas solares de Bolivia** (10 de 27)

---

## 5. Marco Regulatorio Bolivia — Generación Distribuida

| Instrumento | Qué habilita |
|---|---|
| **DS 4477** (marzo 2021) | Legaliza generación distribuida. Define nano (<10 kW), micro (10–50 kW), mini (50–350 kW) |
| **DS 4539** (julio 2021) | Elimina aranceles de importación en inversores, medidores bidireccionales y equipos DG |
| **DS 5167** (junio 2024) | Actualiza y amplía incentivos DG, mejora tasas de compensación |
| **Net Metering** | Para consumidores ≤500 kWh/mes: 1 kWh inyectado = 1 kWh acreditado |
| **Net Billing** | Para categorías comercial e industrial de mayor consumo |
| **Ley Departamental 177** (Santa Cruz, 2019) | Ley departamental que promueve energías renovables en Santa Cruz |

**Límite regulatorio importante:** DS 4477 cubre hasta **350 kW (mini-generación)**. Microredes industriales más grandes requieren licencia bajo Ley 1604.

---

## 6. CRE y la Fuente Real de la Electricidad

### ¿CRE genera su propia energía?
**En Santa Cruz ciudad y área metropolitana: NO.**

CRE es **distribuidora pura** en el Sistema Interconectado Nacional (SIN). Compra energía del mercado mayorista y la distribuye. Es el **mayor distribuidor individual de Bolivia**, consumiendo ~36% de la generación nacional total.

En zonas rurales aisladas: sí genera, pero con **diésel 100%** (subsidiado por el Estado).

### Composición del SIN (Sistema Interconectado Nacional) — 2026

| Fuente | % |
|---|---|
| **Termoeléctrica a gas natural** | **69.6%** |
| Hidroeléctrica | 26.1% |
| Eólica | ~2.5% |
| Solar FV | ~1.5% |
| Biomasa / otros | <1% |
| **Total renovables no convencionales** | **~4–9%** |

- Capacidad instalada total: 3.530 MW — de los cuales **2.512,5 MW (71.2%) son termoeléctricas a gas**
- Principales generadores: ENDE Guaracachi, ENDE Andina, ENDE Bulo Bulo, Entre Ríos, Del Sur, Warnes

### Factor de emisión del grid boliviano
| Fuente | kg CO2/kWh |
|---|---|
| Grid boliviano (SIN) | ~0.40–0.45 |
| Solar PV (ciclo de vida completo) | 0.02–0.05 |
| **Reducción con solar** | **~90–95%** |

---

## 7. La Crisis del Gas — El Argumento Definitivo

### Colapso de reservas
| Año | Reservas probadas (TCF) |
|---|---|
| 2013 | 10.45 |
| 2025 | **3.7** |
| **Caída** | **-65% en 12 años** |

- Producción diaria: de 62 → **~22 millones de m³/día**
- Las tres principales termoeléctricas (Entre Ríos, Del Sur, Warnes) **duplicaron su consumo de gas en 5 años**

### Lo que YPFB admitió oficialmente (marzo 2026)
- Bolivia podría necesitar **importar gas antes de 2031**
- Importar a precio internacional costaría **~$400M adicionales por año**
- Eso se traslada a la tarifa eléctrica

### Señales de quiebre del sistema
- Bolivia autorizó en 2026 al sector privado a importar y exportar electricidad — el Estado admite que no puede garantizar el suministro solo
- Artículo "Luz prestada" (El País Bolivia, mayo 2026): Bolivia ya rompió su modelo eléctrico de tres décadas
- CNDC ya gestiona restricciones de suministro de gas al nodo Carrasco

---

## 8. Tabla Comparativa para el Pitch

| | CRE/SIN hoy | Microred solar propia |
|---|---|---|
| % renovable | ~30% | **100%** |
| Emisiones | ~0.40–0.45 kg CO2/kWh | 0.02–0.05 kg CO2/kWh |
| Dependencia del gas | **70%** | 0% |
| Riesgo de tarifa | ALTO (gas → precio intl. antes de 2031) | **Fijo por 25 años** |
| Riesgo de corte | Real (48h apagones en 2023) | Mínimo (batería local) |
| CapEx inicial empresa nueva | $15.000–$50.000 (transformador CRE) | Inversión en activo propio |

---

## 9. Estimación del Mercado (TAM)

### Bottom-up
- Universe: 117.894 empresas en Santa Cruz
- Target real (energo-intensivas): **~10.000–12.000 empresas**
- Sistema promedio: 100 kW a ~$80.000 instalado
- Penetración a 10 años al 10%: ~1.000 sistemas

**TAM instalación:** ~$80M–$200M en 10 años  
**Mercado anual en madurez:** $8M–$20M/año solo en instalaciones  
(+ ingresos recurrentes por mantenimiento/SaaS encima)

**Catalizador de expansión:** Si Bolivia elimina el subsidio al gas (fiscalmente inevitable), el payback de 5–8 años baja a 3–4 años y el TAM explota.

---

## 10. Fuentes

- [SEPREC — Base empresarial Santa Cruz 29.9%](https://www.seprec.gob.bo/index.php/nota_prensa/santa-cruz-concentra-el-299-de-las-empresas-registradas-en-la-base-empresarial-del-seprec/)
- [PILAT — Parque Industrial Latinoamericano](https://pilatsrl.com/)
- [CRE — Cobertura geográfica](https://www.cre.com.bo/acerca-de-cre/cobertura-geografica/)
- [CRE — Tarifas](https://www.cre.com.bo/entender-mi-consumo/conoce-las-tarifas/)
- [CRE invierte $83.4M en 2024 — El Deber](https://eldeber.com.bo/economia/la-cre-invertira-mas-us-834-millones-en-2024-para-atender-demanda-electrica-de-santa-cruz_363944)
- [Low Carbon Power — Bolivia 2024](https://lowcarbonpower.org/region/Bolivia)
- [Situación energética Bolivia — Generis (mayo 2025)](https://generis.com.bo/wp-content/uploads/2025/05/Situacion-Energetica-en-Bolivia.pdf)
- [Demanda gas termoeléctricas +100% en 5 años — Economy.com.bo](https://www.economy.com.bo/articulo/economia/demanda-gas-termoelectricas-bolivia-aumenta-mas-100-anos/20240904172334015003.html)
- [Luz prestada: La encrucijada energética de Bolivia — El País Bolivia (mayo 2026)](https://elpais.bo/reportajes/20260510_luz-prestada-la-encrucijada-energetica-de-bolivia.html)
- [Bolivia rompe su modelo eléctrico — CBE](https://cbe.com.bo/noticia/bolivia-rompe-su-modelo-electrico-tras-tres-decadas-de-el-pais-08-05-2026)
- [Proyecto solar BFC 3 MW — PV Magazine](https://www.pv-magazine-latam.com/2024/04/15/anuncian-en-bolivia-un-proyecto-solar-privado-de-3-mw/)
- [InnovaSol — Quiénes somos](https://innovasol.com.bo/quienes-somos/)
- [DS 4477 — Generación Distribuida](https://www.lexivox.org/norms/BO-DS-N4477.xhtml)
- [NASA POWER API](https://power.larc.nasa.gov/docs/services/api/)
- [Gemini API — Rate Limits](https://ai.google.dev/gemini-api/docs/rate-limits)
- [Bolivia gas production collapse — Gas Outlook](https://gasoutlook.com/analysis/bolivia-natural-gas-production-exports-collapse-dramatically/)
- [Bolivia: involuntary energy transition — Dialogue Earth](https://dialogue.earth/en/energy/53587-bolivia-energy-transition-gas-depleted-involuntary/)
- [CNDC — Resumen Operación MEM](https://www.cndc.bo/reporte/index_dos.php)
- [Bolivia autoriza sector privado importar/exportar electricidad — El Periódico de la Energía](https://elperiodicodelaenergia.com/bolivia-autoriza-al-sector-privado-a-importar-y-exportar-electricidad-en-fronteras)
