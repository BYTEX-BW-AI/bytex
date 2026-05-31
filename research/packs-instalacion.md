# Niveles de Independencia Energética — Referencia de Costos
## Soberanía Energética — Santa Cruz, Bolivia

> **Importante:** Estos no son productos que vendemos. Son los tres niveles de independencia que el cliente puede elegir como INPUT del análisis de IA. La IA usa estos rangos de referencia para dimensionar el sistema exacto del cliente y estimar costos. Los proveedores certificados de la plataforma son quienes ejecutan la instalación.

> Tipo de cambio paralelo real: Bs 9.90/USD (mayo 2026)
> Costos calculados desde componentes reales importados a Santa Cruz

---

## Base de costos por componente (verificada)

| Componente | Costo puesto en Santa Cruz | Fuente |
|---|---|---|
| Panel 550W TOPCon Tier 1 | **$84.79/panel** ($0.154/W) | OPIS FOB + cálculo importación |
| Huawei Sun2000 30kW | **~$2.580** | FOB China + IVA + GA |
| Huawei Sun2000 100kW | **~$3.950** | FOB China + IVA + GA |
| Pylontech US5000 (4.8 kWh) | **$780/unidad** ($163/kWh) | FOB China + IVA + GA |
| Estructura de montaje | **$100/kWp** | Estimado mercado ⚠️ |
| Cableado DC + AC | **$50/kWp** | Estimado mercado ⚠️ |
| Protecciones eléctricas | **$40/kWp** | Estimado mercado ⚠️ |
| Mano de obra técnico | **$35/técnico/día** | pvknowhow.com Bolivia |
| Generador diésel 100kVA | **~$18.000** | Estimado Cummins LatAm ⚠️ |

---

## NIVEL 1 — REDUCCIÓN DE FACTURA (On-Grid Solar)

**Input del cliente:** "Quiero reducir mi factura — sigo conectado a la CRE"

### ¿Qué implica este nivel?
Paneles solares con inversor on-grid. Durante el día la empresa usa energía solar; cuando no alcanza o es de noche, la CRE entra automáticamente. Sin baterías. La IA recomienda este nivel cuando el cliente prioriza mínima inversión sobre máxima independencia.

### ¿Cuándo la IA lo recomienda?
Empresas con presupuesto ajustado, producción que tolera cortes breves, o que están explorando la soberanía energética por primera vez.

### Lo que resuelve
- Elimina el pago por kWh durante las horas solares (13–17h = el pico de calor y de consumo)
- Elimina las penalizaciones por Potencia Máxima Demandada en horario solar
- Reduce la factura CRE en un 40–60%

### Sistema: 50 kWp on-grid

| Componente | Cantidad | Costo unitario | Subtotal |
|---|---|---|---|
| Panel 550W TOPCon | 92 unidades | $84.79 | $7.801 |
| Huawei Sun2000 50kW* | 1 unidad | $3.200 | $3.200 |
| Estructura de montaje | 50 kWp | $100/kWp | $5.000 |
| Cableado DC + AC | 50 kWp | $50/kWp | $2.500 |
| Protecciones eléctricas | 50 kWp | $40/kWp | $2.000 |
| Medidor bidireccional | 1 unidad | $200 | $200 |
| Mano de obra (5 días × 4 técnicos) | 20 jornales | $35 | $700 |
| Puesta en marcha + documentación | — | — | $400 |
| **COSTO TOTAL** | | | **$21.801** |

*Interpolado entre Sun2000-30KTL ($2.580) y Sun2000-100KTL ($3.950)

**Precio de venta (margen 36%):** **$34.000 USD**
**Equivalente en leasing:** ~$680/mes durante 50 meses (4.2 años)

### Generación estimada (Santa Cruz, 4.8 horas pico solar)
```
50 kWp × 4.8h × 365 días × 0.80 eficiencia = 70.080 kWh/año
```
Ahorro anual a tarifa comercial Bs 1.00/kWh: **~$10.069/año**
Ahorro anual a tarifa industrial Bs 0.58/kWh: **~$5.840/año**

### Payback del cliente
- Tarifa comercial: $34.000 / $10.069 = **~3.4 años**
- Tarifa industrial: $34.000 / $5.840 = **~5.8 años**

---

## NIVEL 2 — SEMI-INDEPENDENCIA (Híbrido con Almacenamiento)

**Input del cliente:** "Quiero depender menos de la CRE — necesito respaldo propio"

### ¿Qué implica este nivel?
Paneles solares + banco de baterías LiFePO4 + inversor híbrido. El sistema genera de día, almacena excedente en baterías y las usa de noche. La CRE queda como respaldo de emergencia solamente. La IA dimensiona el banco de baterías según las horas nocturnas de consumo del cliente específico.

### ¿Cuándo la IA lo recomienda?
Empresas con producción que no puede parar, historial de apagones, o que quieren 70–85% de independencia real con inversión moderada.

### Lo que resuelve
- 70–85% de independencia energética real
- Baterías cubren 6–8 horas de consumo nocturno
- Elimina el riesgo de apagones CRE en horario de producción
- Factura CRE reducida al 15–30% de lo actual

### Sistema: 100 kWp + 48 kWh de almacenamiento

| Componente | Cantidad | Costo unitario | Subtotal |
|---|---|---|---|
| Panel 550W TOPCon | 182 unidades | $84.79 | $15.432 |
| Huawei Sun2000 100kW | 1 unidad | $3.950 | $3.950 |
| Pylontech US5000 (4.8kWh) | 10 unidades | $780 | $7.800 |
| Estructura de montaje | 100 kWp | $100/kWp | $10.000 |
| Cableado DC + AC | 100 kWp | $50/kWp | $5.000 |
| Protecciones eléctricas | 100 kWp | $40/kWp | $4.000 |
| Gabinete de baterías + BMS | 1 unidad | $1.000 | $1.000 |
| Medidor bidireccional | 1 unidad | $200 | $200 |
| Mano de obra (9 días × 4 técnicos) | 36 jornales | $35 | $1.260 |
| Puesta en marcha + documentación | — | — | $600 |
| **COSTO TOTAL** | | | **$49.242** |

**Precio de venta (margen 35%):** **$76.000 USD**
**Equivalente en leasing:** ~$1.520/mes durante 50 meses (4.2 años)

### Generación estimada
```
100 kWp × 4.8h × 365 días × 0.80 eficiencia = 140.160 kWh/año
```
Ahorro anual tarifa comercial: **~$20.139/año**
Ahorro anual tarifa industrial: **~$11.681/año**

### Payback del cliente
- Tarifa comercial: $76.000 / $20.139 = **~3.8 años**
- Tarifa industrial: $76.000 / $11.681 = **~6.5 años**

---

## NIVEL 3 — INDEPENDENCIA TOTAL (Off-Grid Completo)

**Input del cliente:** "Quiero independencia total — me desconecto de la CRE"

### ¿Qué implica este nivel?
Sistema completamente autónomo: paneles + gran banco de baterías + generador diésel de respaldo automático. La IA dimensiona el banco de baterías para cubrir los días sin sol y el generador solo como último respaldo. La CRE deja de existir para el cliente.

### ¿Cuándo la IA lo recomienda?
Dos perfiles:
1. **Nuevo emprendedor** en zona de expansión — evita $15.000–$50.000 de CapEx muerto a CRE e invierte ese capital en infraestructura propia.
2. **Gran industrial** con producción crítica o ubicación donde la CRE es inestable o inexistente.

### Lo que resuelve
- 100% de independencia energética
- Elimina el riesgo de apagones, bajones de voltaje y penalizaciones por pico
- Para el nuevo emprendedor: elimina el CapEx muerto a la CRE y lo convierte en activo propio
- Costo de energía fijo para los próximos 25 años

### Sistema: 200 kWp + 192 kWh de almacenamiento + generador

| Componente | Cantidad | Costo unitario | Subtotal |
|---|---|---|---|
| Panel 550W TOPCon | 364 unidades | $84.79 | $30.864 |
| Huawei Sun2000 100kW | 2 unidades | $3.950 | $7.900 |
| Pylontech US5000 (4.8kWh) | 40 unidades | $780 | $31.200 |
| Generador diésel 100kVA (backup) | 1 unidad | $18.000 | $18.000 |
| ATS (Transferencia Automática) | 1 unidad | $2.000 | $2.000 |
| Estructura de montaje | 200 kWp | $100/kWp | $20.000 |
| Cableado DC + AC | 200 kWp | $50/kWp | $10.000 |
| Protecciones + tablero eléctrico | 200 kWp | $40/kWp | $8.000 |
| Sala de baterías + gabinetes | — | — | $3.000 |
| Medidor + sistema de monitoreo IoT | 1 unidad | $500 | $500 |
| Mano de obra (18 días × 5 técnicos) | 90 jornales | $35 | $3.150 |
| Puesta en marcha + pruebas + documentación | — | — | $1.500 |
| **COSTO TOTAL** | | | **$136.114** |

**Precio de venta (margen 35%):** **$210.000 USD**
**Equivalente en leasing:** ~$4.200/mes durante 50 meses (4.2 años)

### Generación estimada
```
200 kWp × 4.8h × 365 días × 0.80 eficiencia = 280.320 kWh/año
```
Valor generado a tarifa comercial: **~$40.278/año**
Valor generado a tarifa industrial: **~$23.363/año**

### Payback del cliente
- Comparado con tarifa comercial: $210.000 / $40.278 = **~5.2 años**
- Comparado con tarifa industrial: $210.000 / $23.363 = **~9 años**
- Para nuevo emprendedor (evita $30.000 CapEx CRE + tarifa): **~4.5 años efectivos**

---

## Tabla comparativa de los tres niveles

> Estos rangos son la referencia que usa el motor de sizing. El sistema exacto recomendado para cada cliente varía según su consumo real, zona e irradiación.

| | Nivel 1 — Reducción | Nivel 2 — Semi-independencia | Nivel 3 — Independencia total |
|---|---|---|---|
| **Sistema** | 50 kWp on-grid | 100 kWp + 48 kWh | 200 kWp + 192 kWh + generador |
| **Independencia** | 40–60% | 70–85% | 100% |
| **Baterías** | No | 10 unidades (48 kWh) | 40 unidades (192 kWh) |
| **Generador backup** | No | No | Sí (100 kVA diésel) |
| **Costo nuestro** | $21.801 | $49.242 | $136.114 |
| **Precio de venta** | **$34.000** | **$76.000** | **$210.000** |
| **Leasing mensual** | **~$680/mes** | **~$1.520/mes** | **~$4.200/mes** |
| **Margen bruto** | 36% | 35% | 35% |
| **Payback cliente (comercial)** | ~3.4 años | ~3.8 años | ~5.2 años |
| **Generación anual** | 70.080 kWh | 140.160 kWh | 280.320 kWh |
| **CO₂ evitado/año** | ~29 ton | ~59 ton | ~118 ton |

---

## Camino de upgrade (lo muestra el Upgrade Simulator en la app)

Cuando un cliente ya tiene un sistema instalado, el Modo Gestión de la app le muestra cuánto le costaría y cuánto ahorraría subir al siguiente nivel.

```
Nivel 1 (Reducción) ────► Nivel 2 (Semi-independencia) ────► Nivel 3 (Independencia total)
  ~$34.000 base             ~$76.000 base                      ~$210.000 base
  40-60% independencia      70-85% independencia                100% independencia

Upgrade 1→2: agregar baterías + cambiar inversor a híbrido = ~$42.000 adicionales (referencia)
Upgrade 2→3: agregar paneles + más baterías + generador + ATS = ~$134.000 adicionales (referencia)

El costo exacto del upgrade lo calcula la IA con los datos reales del sistema instalado.
```

---

## Notas de confiabilidad

- ✅ Precio paneles: calculado desde OPIS benchmark FOB China + costos de importación reales
- ✅ Precio inversores Huawei: basado en precios europeos verificados con descuento FOB China del 35%
- ✅ Precio baterías Pylontech: basado en precios Alibaba/distribuidores europeos + importación
- ✅ Mano de obra: pvknowhow.com Bolivia ($35/día técnico solar)
- ⚠️ Estructura + cableado + protecciones: estimados de mercado regional
- ⚠️ Generador diésel 100kVA: estimado Cummins/Caterpillar LatAm (requiere cotización local)
- ⚠️ Márgenes de inversores: el descuento FOB China vs. precio europeo (35%) es una estimación — requiere cotización directa a Huawei o distribuidor autorizado
