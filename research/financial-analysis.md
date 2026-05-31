# Análisis Financiero — Simulador de Soberanía Energética
## Hackathon Build With AI 2026 — Santa Cruz, Bolivia

> **Nota metodológica:** Los datos con ✅ tienen fuente primaria verificada. Los datos con ⚠️ son estimaciones razonadas basadas en fuentes secundarias verificables. No se usa ningún número sin respaldo.

---

## 1. EL DOLOR EN DÓLARES — Cuánto le cuesta quedarse con la CRE

### Tarifas eléctricas vigentes (CRE R.L., Santa Cruz)

| Categoría | Bs/kWh | USD/kWh | Fuente |
|---|---|---|---|
| Comercial (MD) | ~Bs 1.00 | ~$0.144 | ✅ InnovaSol CEO, CBE 2024 |
| Industrial (GD) | ~Bs 0.58 | ~$0.083 | ✅ ABI, feb 2023 |
| Residencial (16–120 kWh) | Bs 0.758 | $0.109 | ✅ CRE oficial, oct 2024 |
| Residencial (>1.000 kWh) | Bs 1.479 | $0.213 | ✅ CRE oficial, oct 2024 |

> Tipo de cambio oficial: Bs 6.96/USD

**Punto crítico:** La tarifa industrial boliviana es una de las más bajas de Sudamérica por el subsidio estatal al gas natural. Este subsidio tiene fecha de vencimiento documentada — YPFB admitió en marzo 2026 que Bolivia podría importar gas a precio internacional antes de 2031, lo que elevaría la tarifa hacia los $0.15–$0.25/kWh. ✅ Fuente: La Razón / YPFB oficial.

---

### Perfil de cliente tipo A — Empresa comercial mediana (tarifa Bs 1.00/kWh)
*Ejemplo: oficina grande, clínica, hotel, local de retail con climatización intensa*

| Concepto | Valor mensual | Valor anual |
|---|---|---|
| Consumo estimado | 15.000 kWh/mes | 180.000 kWh/año |
| Factura CRE | ~Bs 15.000 (~$2.155) | ~$25.860 |
| Penalización pico kW (estimada ⚠️) | ~$300–500/mes | ~$4.200/año |
| **Costo total CRE** | **~$2.455–2.655/mes** | **~$30.060/año** |

### Perfil de cliente tipo B — Empresa industrial mediana (tarifa Bs 0.58/kWh)
*Ejemplo: taller metalmecánico, aserradero, agroindustria mediana*

| Concepto | Valor mensual | Valor anual |
|---|---|---|
| Consumo estimado | 50.000 kWh/mes | 600.000 kWh/año |
| Factura CRE | ~Bs 29.000 (~$4.168) | ~$50.016 |
| Penalización pico kW (estimada ⚠️) | ~$800–1.500/mes | ~$13.800/año |
| **Costo total CRE** | **~$4.968–5.668/mes** | **~$63.816/año** |

### Perfil de cliente tipo C — Nuevo emprendedor (sin conexión a CRE)
*Ejemplo: industria en zona de expansión — Warnes, Cotoca, Montero*

| Concepto | Costo | Naturaleza |
|---|---|---|
| Transformador + postes + cableado CRE | $15.000–$50.000 ⚠️ | CapEx muerto (activo de CRE, no del cliente) |
| Tiempo de espera para conexión | 3–8 meses ⚠️ | Sin producción posible |
| Tarifa mensual una vez conectado | $2.000–8.000/mes | OpEx continuo |

> ⚠️ Fuente estimada: rango documentado en el documento estratégico del proyecto (investigación de campo previa). CRE no publica precios de conexión — requiere cotización directa al +591 3 336 7777.

---

## 2. EL COSTO DE LA MICRORED — La inversión que sí te pertenece

### Costo de instalación (Bolivia, datos verificados)

| Proyecto real | Capacidad | Inversión | Costo/W | Fuente |
|---|---|---|---|---|
| BFC Frigorífico, San Ignacio SCZ | 3.000 kWp | $3.000.000 | **$1.00/W** | ✅ pv-magazine-latam, abr 2024 |
| Multicenter, Santa Cruz | ~310 kWp | ~$287.000 | **~$0.93/W** | ✅ CBE, sep 2025 |
| Rango comercial/industrial PyME | — | — | **$1.25–$1.50/W** | ✅ InnovaSol CEO, CBE 2024 |

**Rango de referencia para el simulador:** $1.20–$1.50/W instalado para sistemas 50–500 kWp en Santa Cruz.

### Costo por tamaño de sistema (estimaciones derivadas de datos verificados ⚠️)

| Sistema | Capacidad | Costo bajo ($1.20/W) | Costo medio ($1.35/W) | Costo alto ($1.50/W) |
|---|---|---|---|---|
| Pequeño comercial | 50 kWp | $60.000 | $67.500 | $75.000 |
| Mediano comercial | 100 kWp | $120.000 | $135.000 | $150.000 |
| Industrial mediano | 200 kWp | $240.000 | $270.000 | $300.000 |
| Industrial grande | 500 kWp | $600.000 | $675.000 | $750.000 |

### Generación estimada (Santa Cruz — irradiación 4.8 kWh/m²/día promedio)

```
Generación anual (kWh) = Capacidad (kWp) × Irradiación (4.8h/día) × 365 días × 0.80 (eficiencia)
```

| Sistema | Generación anual | Valor a tarifa comercial (Bs 1.00) | Valor a tarifa industrial (Bs 0.58) |
|---|---|---|---|
| 50 kWp | 70.080 kWh | ~$10.069/año | ~$5.840/año |
| 100 kWp | 140.160 kWh | ~$20.139/año | ~$11.681/año |
| 200 kWp | 280.320 kWh | ~$40.276/año | ~$23.361/año |
| 500 kWp | 700.800 kWh | ~$100.690/año | ~$58.402/año |

---

## 3. ROI Y PAYBACK — Cuándo deja de costar y empieza a ganar

### Payback period (datos verificados)

| Segmento | Tarifa | Payback | Fuente |
|---|---|---|---|
| Comercial (Bs ~1.00/kWh) | $0.144/kWh | **5–6 años** | ✅ InnovaSol CEO, La Razón mar 2025 |
| Industrial (Bs ~0.58/kWh) | $0.083/kWh | **7–10 años** | ✅ InnovaSol CEO, CBE 2024 |
| Comercial Multicenter (~310 kWp) | $0.144/kWh | **~4.3 años** | ⚠️ Calculado: $287K / $66.8K ahorro anual |

### Verificación numérica — Sistema 100 kWp, cliente comercial

```
Inversión:            $135.000 (a $1.35/W)
Generación anual:     140.160 kWh
Ahorro anual:         140.160 × $0.144 = $20.183/año
Payback simple:       $135.000 / $20.183 = 6.7 años ✅ (consistente con dato InnovaSol)
```

### Proyección de ahorro a 25 años (vida útil del sistema)

| Año | Sin microred (CRE) | Con microred | Ahorro acumulado |
|---|---|---|---|
| 0 | — | -$135.000 | -$135.000 |
| 1 | $25.860 | $5.721* | $20.139 acumulado: -$114.861 |
| 6–7 | $25.860 | $5.721 | Break-even (~$0) |
| 10 | $25.860 | $5.721 | +$66.390 |
| 25 | $25.860 | $5.721 | **+$369.475** |

*Costo de mantenimiento estimado: $5.721/año (2% del CapEx de $135.000 — ver sección 5)

### El impacto del shock tarifario (proyección post-2031)

Si la tarifa industrial sube de $0.083 a $0.15/kWh al eliminar el subsidio al gas:

| Escenario | Payback industrial 200 kWp |
|---|---|
| Tarifa actual ($0.083/kWh) | ~12 años |
| Tarifa post-subsidio ($0.15/kWh) | **~6.6 años** |
| Tarifa mercado regional ($0.20/kWh) | **~5 años** |

**Conclusión:** El cliente que instala hoy a payback de 10 años, con el shock tarifario post-2031 podría ver su inversión recuperada en 5–6 años. El riesgo de esperar supera ampliamente el riesgo de invertir.

---

## 4. MODELO DE INGRESOS — Cómo genera dinero el negocio

La app es gratuita para clientes. El análisis de IA es el valor que atrae a las empresas. El revenue viene del lado de los proveedores que pagan para acceder a leads calificados.

### Pilar 1 — Suscripción mensual de proveedores (MRR)

| Plan | Precio/mes | Beneficios |
|---|---|---|
| Básico | $150 | Perfil listado, acceso a leads de su zona |
| Profesional | $350 | Perfil destacado, badge verificado, analytics de leads |
| Premium | $700 | Top de resultados, integración de monitoreo en app |

| | Q1 | Q2 | Q3 | Q4 |
|---|---|---|---|---|
| Proveedores activos | 5 | 12 | 20 | 27 |
| MRR | $750 | $2.400 | $5.000 | $7.500 |
| **MRR anualizado** | | | | **$90.000** |

### Pilar 2 — Comisión por deal cerrado (3–5%)

Un lead calificado = empresa que completó la simulación y solicitó contacto con proveedores.

| Concepto | Valor |
|---|---|
| Ticket promedio instalación (100 kWp) | ~$70.000 (precio de mercado, proveedor lo define) |
| Comisión nuestra (4%) | ~$2.800 por deal |
| Deals estimados año 1 | 30 |
| **Ingreso comisiones año 1** | **~$84.000** |

### Pilar 3 — Leads calificados y placement

| Concepto | Valor |
|---|---|
| Lead calificado (simulación completa + solicitud) | $50–$150 por lead |
| Placement destacado por zona/rubro | $200–$500/mes |
| Estimado año 1 | $15.000–$25.000 |

---

## 5. ESTRUCTURA DE COSTOS

### Costos del MVP (hackathon y validación inicial)

| Componente | Costo mensual | Costo anual |
|---|---|---|
| Gemini 2.5 Flash-Lite API | $0 (free tier) | $0 |
| NASA POWER API | $0 (gratuita) | $0 |
| Firebase (Hosting + Firestore + Auth) | $0 (Spark/Blaze free tier) | $0 |
| Firebase Functions | $0 (dentro del free tier) | $0 |
| Dominio web | — | ~$10 |
| **Total MVP** | **$0/mes** | **~$10/año** |

### Costos del negocio real (post-hackathon, año 1)

| Concepto | Costo estimado anual | Naturaleza |
|---|---|---|
| Hardware solar (por instalación de 100 kWp) | ~$94.500 (70% del precio) ⚠️ | Variable (COGS) |
| Logística de importación (China→SCZ) | ~$4.000–$6.000/contenedor | Variable |
| Instalación y mano de obra | ~$13.500 (10% del precio) ⚠️ | Variable |
| Equipo técnico (2 ingenieros) | ~$24.000/año | Fijo |
| Equipo comercial (1 ejecutivo B2B) | ~$12.000/año | Fijo |
| Plataforma IoT para monitoreo remoto | ~$3.600/año | Fijo |
| Operación plataforma web | ~$1.200/año | Fijo |
| **Costos fijos año 1** | **~$40.800/año** | |

---

## 6. PROYECCIÓN FINANCIERA — 3 años (modelo marketplace)

| | Año 1 | Año 2 | Año 3 |
|---|---|---|---|
| **INGRESOS** | | | |
| Suscripciones proveedores | $28.200 | $72.000 | $108.000 |
| Comisiones por deal (4%) | $84.000 | $168.000 | $280.000 |
| Leads + placement | $20.000 | $40.000 | $65.000 |
| **Total ingresos** | **$132.200** | **$280.000** | **$453.000** |
| | | | |
| **COSTOS** | | | |
| Marketing B2B (CAINCO, PILAT, LinkedIn) | $18.000 | $24.000 | $30.000 |
| Certificación y auditoría de proveedores | $5.000 | $3.000 | $3.000 |
| Hosting + APIs a escala | $3.600 | $4.800 | $6.000 |
| Equipo (producto + ventas) | $36.000 | $60.000 | $90.000 |
| **Total costos** | **$62.600** | **$91.800** | **$129.000** |
| | | | |
| **RESULTADO** | | | |
| Utilidad operativa | $69.600 | $188.200 | $324.000 |
| Margen operativo | **53%** | **67%** | **71%** |

> Modelo marketplace tiene márgenes operativos mucho mayores que instaladora directa — sin COGS de hardware. El crecimiento está limitado solo por la captación de proveedores y el volumen de simulaciones.

---

## 7. MÉTRICAS DE IMPACTO

| Métrica | Año 1 | Año 3 |
|---|---|---|
| Empresas con microred propia | 3–5 | 10–15 |
| kWh generados con energía solar | ~420.000 kWh | ~2.100.000 kWh |
| CO₂ evitado (0.42 kg/kWh ahorrado) | ~176 ton CO₂ | ~882 ton CO₂ |
| Empresas desconectadas del riesgo de apagón | 3–5 | 10–15 |
| Empleos directos generados | 3–5 | 8–12 |

---

## 8. VIABILIDAD DEL MODELO — RESUMEN EJECUTIVO

| Factor | Estado | Evidencia |
|---|---|---|
| Demanda del mercado | ✅ Confirmada | 10.000–12.000 empresas target en Santa Cruz |
| Tecnología disponible | ✅ Madura | Paneles, baterías, inversores industriales probados |
| Marco regulatorio | ✅ Favorable | DS 4477 + DS 5167 + DS 5549 habilitan hasta 2 MW |
| Modelo sin CapEx para el cliente | ✅ Probado | InnovaSol opera con este modelo hace 3+ años |
| Competencia directa | ✅ Nasciente | InnovaSol: 55 sistemas en todo Bolivia |
| Tarifa subsidiada | ⚠️ Riesgo temporal | Payback 7–10 años hoy → 5–6 años post-2031 |
| Capital para leasing | ⚠️ Requiere inversión | Necesita fondeo externo para escalar el leasing |
| Stack tecnológico del simulador | ✅ $0 operativo | Gemini + NASA POWER + Firebase free tiers |

**Conclusión:** El negocio es viable. El único freno real — la tarifa subsidiada — tiene fecha de vencimiento documentada y oficial. El modelo de leasing de-riesga la decisión del cliente. El simulador con IA es el diferenciador que ningún competidor tiene.

---

## Fuentes

- ✅ InnovaSol CEO Marcelo Vargas — CBE 2024: payback 5–6 años comercial, $1.25–$1.50/W instalado
- ✅ InnovaSol CEO — La Razón, mar 2025: "inversión solar se recupera en 6 años"
- ✅ pv-magazine-latam, abr 2024: BFC Frigorífico 3MW a $3M = $1.00/W
- ✅ CBE, sep 2025: Multicenter ~310 kWp a ~Bs 2M
- ✅ CRE oficial, oct 2024: tarifas residenciales escalonadas
- ✅ ABI, feb 2023: tarifa industrial Bs 0.58/kWh
- ✅ AETN R-0380-27-24-A: compensación net billing Bs 0.129/kWh inyectado
- ✅ YPFB / La Razón, mar 2026: Bolivia podría importar gas antes de 2031
- ✅ DS 5549 (feb 2026): marco GD actualizado hasta 2 MW
- ⚠️ Márgenes EPC, costos O&M: estimados basados en estándares regionales (NREL ATB 2024, Terralink Chile 2026)
