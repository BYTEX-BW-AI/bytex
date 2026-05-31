# Arquitectura Técnica — Simulador de Soberanía Energética
## Hackathon Build With AI 2026 — Santa Cruz, Bolivia

---

## Visión general

El Simulador de Soberanía Energética es una **Progressive Web App (PWA)** construida íntegramente sobre el ecosistema de Google. Permite a empresas de Santa Cruz, Bolivia comparar el costo y riesgo de mantenerse conectados a la CRE R.L. versus instalar su propia microred solar, con cálculos basados en datos reales y locales.

La arquitectura está diseñada para un MVP de hackathon con tres prioridades en este orden: **velocidad de desarrollo**, **costo cero de operación** y **demostrabilidad en vivo**.

---

## Stack tecnológico y decisiones

### Frontend — Angular + PWA

**Tecnología:** Angular con `@angular/pwa`

**Por qué Angular:**
El equipo tiene experiencia consolidada con Angular, lo que reduce el tiempo de desarrollo en un contexto de hackathon con deadline ajustado. Angular es un framework mantenido por Google, lo que lo convierte en una elección coherente dentro del contexto de una hackathon organizada por Google Developer Groups Santa Cruz.

**Por qué PWA y no una app nativa:**
El usuario target es una empresa. El flujo principal (subir una factura, correr una simulación, ver resultados) ocurre en una sesión puntual desde una computadora de oficina. Sin embargo, el decisor final (dueño o CEO) frecuentemente no está en la planta y necesita acceder desde su celular.

Una PWA resuelve ambos casos con una sola codebase:
- En desktop: experiencia de app web completa
- En mobile: se puede instalar desde el browser como si fuera una app nativa, sin pasar por tiendas de aplicaciones

Esta decisión elimina la necesidad de mantener dos bases de código (web + mobile) lo cual sería inviable en el tiempo disponible de la hackathon.

**Por qué no Flutter o React Native:**
Ambas opciones están orientadas a mobile-first y requieren compilación nativa para iOS/Android. Para un MVP que prioriza el flujo web, agregan complejidad innecesaria. Angular con PWA logra el 90% del resultado con el 30% del esfuerzo.

---

### SDK de Firebase — AngularFire

**Tecnología:** AngularFire (librería oficial de Firebase para Angular)

**Por qué AngularFire:**
AngularFire es la integración oficial entre Angular y Firebase, mantenida por el equipo de Firebase/Google. Expone todos los servicios de Firebase (Auth, Firestore, Functions, Hosting) como observables de RxJS, que es el paradigma nativo de Angular. Usar la librería oficial en lugar de integraciones de terceros garantiza compatibilidad, documentación actualizada y soporte a largo plazo.

---

### Autenticación — Firebase Auth

**Tecnología:** Firebase Authentication con Google Sign-In

**Por qué Firebase Auth:**
La autenticación con Google Sign-In es gratuita e ilimitada en Firebase. Para el perfil del usuario target (empresas bolivianas con cuentas de Google Workspace o Gmail corporativo), el login con Google elimina la fricción de crear credenciales nuevas.

**Por qué Google Sign-In específicamente:**
Mantiene la coherencia del ecosistema. Un usuario empresarial que ya confía en Google para su correo corporativo va a confiar en "Iniciar sesión con Google" para una herramienta de análisis energético. Reduce la barrera de entrada al primer uso.

**Qué se guarda del usuario:**
Solo lo necesario: ID único, nombre y email. Las simulaciones se asocian a este ID en Firestore.

---

### Base de datos — Firestore

**Tecnología:** Cloud Firestore (Firebase)

**Por qué Firestore:**
Firestore es una base de datos NoSQL orientada a documentos, sin servidor y en tiempo real. Para el modelo de datos del simulador (cada simulación es un documento con campos de consumo, sizing y comparativa), el esquema de documentos es más natural que un esquema relacional.

**Por qué no una base de datos relacional:**
El simulador no tiene relaciones complejas entre entidades. Cada simulación es un documento autocontenido. Usar PostgreSQL o MySQL requeriría aprovisionar y mantener un servidor, lo que añade costo y complejidad innecesarios para un MVP.

**Plan de costos:**
El plan Spark (gratuito) de Firestore incluye 50.000 lecturas y 20.000 escrituras por día. A escala de hackathon y validación inicial, estos límites son imposibles de superar.

**Estructura de datos (colecciones principales):**

```
/users/{userId}
  - email
  - displayName
  - createdAt

/simulations/{simulationId}
  - userId
  - type: "existing" | "new"          // empresa existente o nuevo emprendedor
  - input: { ... }                    // datos de la factura o del rubro seleccionado
  - result: { ... }                   // sizing, ROI, comparativa CRE vs microred
  - createdAt
```

---

### Backend — Firebase Cloud Functions

**Tecnología:** Firebase Cloud Functions (Node.js / TypeScript)

**Por qué Firebase Functions y no lógica en el frontend:**
Las dos operaciones más críticas del simulador — llamar a la API de Gemini y llamar a la NASA POWER API — requieren claves de API o son llamadas salientes a servicios externos. Ejecutar estas llamadas desde el frontend Angular expondría la clave de Gemini en el código del cliente, lo que es un riesgo de seguridad inaceptable incluso para un MVP.

Firebase Functions actúa como una capa intermedia: el frontend llama a la función, la función llama a Gemini/NASA POWER con las credenciales guardadas en variables de entorno del servidor, y devuelve el resultado. La clave nunca llega al cliente.

**Por qué no un backend propio (Express, FastAPI, etc.):**
Un backend propio requeriría aprovisionar un servidor, configurar CORS, manejar el escalado y pagar por el hosting. Firebase Functions es serverless — solo existe cuando se la llama, y el plan Blaze (necesario para llamadas salientes) incluye los mismos límites gratuitos del Spark. A escala de hackathon el costo es $0.

**Nota sobre el plan Blaze:**
Firebase Functions requiere el plan Blaze (pay-as-you-go) para hacer llamadas HTTP a servicios externos. El plan Blaze incluye los mismos límites gratuitos del Spark — simplemente habilita el exceso con cobro por uso. A la escala de un MVP de hackathon (decenas de simulaciones), el costo real es $0.

**Funciones definidas:**

```
extractBillData(imageBase64)
  → llama a Gemini Vision para extraer kWh, kW pico y costo de la factura

estimateConsumption(rubro, zona)
  → devuelve consumo estimado del rubro usando tabla de referencia INE Bolivia

getSolarData(lat, lng)
  → llama a NASA POWER API para obtener irradiación media diaria de la ubicación

calculateMicrogrid(consumoKwh, picoKw, irradiacion)
  → lógica de sizing: paneles, baterías, generador de respaldo, CapEx, ROI
```

---

### OCR e Inteligencia Artificial — Gemini 2.5 Flash-Lite

**Tecnología:** Google Gemini 2.5 Flash-Lite vía Google AI Studio API

**Por qué Gemini para OCR:**
Las facturas de la CRE R.L. son documentos físicos que los usuarios van a fotografiar con su celular o escanear en PDF. Un OCR tradicional (Tesseract) requiere imagen limpia, alta resolución y preprocesamiento. Gemini es un modelo multimodal que entiende el contexto del documento — puede extraer el campo "Potencia Máxima Demandada (kW)" aunque esté en una posición diferente en cada factura, con iluminación irregular, o en un PDF con tablas complejas.

**Por qué Gemini y no Google Cloud Vision API:**
Cloud Vision API extrae texto crudo (OCR puro). Gemini extrae texto Y entiende el significado — puede responder "¿cuál es el consumo en kWh del mes de marzo?" sobre una imagen de una factura, sin que el código tenga que parsear el texto extraído. Menos código, más robustez.

**Por qué Gemini 2.5 Flash-Lite y no Pro:**
Flash-Lite tiene 1.000 requests/día en el free tier sin tarjeta de crédito. Para el MVP y el demo de la hackathon es más que suficiente. Gemini 2.5 Pro fue removido del free tier en abril 2026.

**Coherencia con el contexto GDG:**
La hackathon es organizada por Google Developer Groups Santa Cruz. Usar Gemini como motor central de IA — no como decoración — es una señal técnica que los jueces de un evento GDG van a reconocer y valorar. Es la diferencia entre "usamos IA" y "construimos sobre la IA de Google de manera profunda."

---

### Datos de irradiación solar — NASA POWER API

**Tecnología:** NASA POWER (Prediction Of Worldwide Energy Resources)

**Qué es NASA POWER:**
Es una API gratuita de la NASA que provee datos meteorológicos y de irradiación solar histórica para cualquier coordenada del planeta. No requiere registro, no requiere API key, y es una fuente científica primaria.

**Por qué es necesaria:**
Para dimensionar correctamente una microred solar (cuántos paneles se necesitan), el cálculo central es:

```
Paneles necesarios = Consumo diario (kWh) ÷ Irradiación solar (kWh/m²/día) ÷ Eficiencia del sistema
```

Sin el dato de irradiación real para Santa Cruz, el resultado es una estimación genérica sin valor. Con NASA POWER, el simulador usa el promedio histórico de irradiación de la coordenada exacta del usuario — un dato que ningún competidor usa en Bolivia.

**Dato de Santa Cruz, Bolivia:**
La irradiación media de Santa Cruz es de 4.5–5.2 kWh/m²/día, una de las mejores condiciones para generación fotovoltaica en la región.

---

### Hosting — Firebase Hosting

**Tecnología:** Firebase Hosting

**Por qué Firebase Hosting:**
Firebase Hosting está integrado nativamente con Angular y AngularFire. El deploy de la PWA se hace con un solo comando (`firebase deploy`). Incluye CDN global, HTTPS automático, dominio personalizable y soporte para service workers (necesario para que la PWA funcione offline).

**Plan de costos:**
El plan Spark (gratuito) incluye 10 GB de almacenamiento y 360 MB/día de transferencia. Para un MVP de hackathon, estos límites son más que suficientes.

---

## Diagrama de flujo de la arquitectura

```
┌─────────────────────────────────────────────────────────────┐
│                    USUARIO (Browser / PWA)                   │
│                    Angular + AngularFire                      │
└──────────────────────────┬──────────────────────────────────┘
                           │ HTTPS
                           ▼
┌─────────────────────────────────────────────────────────────┐
│                  FIREBASE CLOUD FUNCTIONS                    │
│                                                              │
│  extractBillData()    estimateConsumption()                  │
│  getSolarData()       calculateMicrogrid()                   │
└──────┬───────────────────────────────────┬──────────────────┘
       │                                   │
       ▼                                   ▼
┌──────────────┐                 ┌──────────────────────┐
│ GEMINI API   │                 │   NASA POWER API     │
│ (AI Studio)  │                 │   (irradiación SCZ)  │
│ OCR facturas │                 │   Gratuita, sin key  │
│ 1.000 req/día│                 └──────────────────────┘
└──────────────┘
       │
       ▼
┌─────────────────────────────────────────────────────────────┐
│                      FIREBASE                               │
│                                                              │
│  Firestore (simulaciones)   Auth (Google Sign-In)           │
│  Hosting (PWA deploy)                                        │
└─────────────────────────────────────────────────────────────┘
```

---

## Flujos de usuario

### Flujo A — Empresa existente

```
1. Usuario sube foto/PDF de su factura CRE
2. Angular envía imagen en base64 a Firebase Function extractBillData()
3. Function llama a Gemini Vision → extrae kWh total, kW pico, costo mensual
4. Function llama a NASA POWER con coordenadas de Santa Cruz → obtiene irradiación
5. Function ejecuta calculateMicrogrid() → sizing + CapEx + ROI
6. Angular muestra comparativa: CRE vs Microred Solar
7. Resultado se guarda en Firestore asociado al usuario
```

### Flujo B — Nuevo emprendedor

```
1. Usuario selecciona rubro (panadería, taller, galpón logístico, etc.) + zona (Warnes, Cotoca, etc.)
2. Angular llama a estimateConsumption() → consumo estimado basado en tabla INE Bolivia
3. Function llama a NASA POWER con coordenadas de la zona seleccionada
4. Function ejecuta calculateMicrogrid() → sizing + CapEx (microred) vs CapEx (transformador CRE)
5. Angular muestra comparativa: pagar $15k-$50k a CRE vs invertir en microred propia
6. Resultado se guarda en Firestore
```

---

## Decisiones de diseño que no se tomaron (y por qué)

| Alternativa descartada | Por qué se descartó |
|---|---|
| React / Next.js | El equipo tiene mayor experiencia con Angular. En una hackathon, usar la tecnología que ya dominás es la decisión correcta. |
| Flutter / React Native | Mobile-first con compilación nativa. Innecesario para un MVP web. Complejidad adicional sin beneficio para el caso de uso. |
| Backend propio (Express/FastAPI) | Requiere servidor, configuración, mantenimiento y costo. Firebase Functions es serverless y $0 a esta escala. |
| Tesseract OCR | OCR tradicional, requiere imagen limpia y preprocesamiento. Gemini Vision entiende el contexto del documento — más robusto para facturas fotografiadas. |
| Google Cloud Vision API | Extrae texto crudo. Gemini extrae texto + comprende el significado. Menos código, más precisión para campos específicos de la factura. |
| Base de datos relacional | El modelo de datos del simulador es de documentos simples. Una BD relacional agrega complejidad innecesaria sin beneficio estructural. |
| Llamadas a Gemini desde el frontend | Expone la API key en el cliente. Inaceptable incluso para un MVP. Firebase Functions resuelve esto con costo cero. |
