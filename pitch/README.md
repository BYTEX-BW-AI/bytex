# 🌞 Pitch — Soberanía Energética
## Hackathon Build With AI 2026

Presentación interactiva en HTML para el pitch de la hackathon.

---

## 📂 Estructura

```
pitch/
├── index.html      # Presentación principal
├── style.css       # Estilos y animaciones
├── script.js       # Lógica y gráficos
└── README.md       # Este archivo
```

---

## 🚀 Cómo usar

### Opción 1: Abrir localmente
1. Abre `index.html` en tu navegador (Chrome, Firefox, Edge, Safari)
2. Navega con los botones o el teclado

### Opción 2: Servir con Python (recomendado para desarrollo)
```bash
cd pitch/
python -m http.server 8000
```
Luego abre `http://localhost:8000` en tu navegador.

---

## ⌨️ Controles

| Acción | Control |
|--------|---------|
| Siguiente slide | Click en botón → | Flecha derecha | Espacio |
| Slide anterior | Click en botón ← | Flecha izquierda |
| Ir a slide específico | Click en indicador (puntos abajo) |
| Fullscreen | Presiona `F` |

---

## 📊 Gráficos incluidos

1. **Slide 2 — Reservas de Gas**: Gráfico de barras descendente mostrando caída de reservas (2013 → 2031)
2. **Slide 4 — Payback Comparison**: Línea comparativa de payback hoy vs 2031
3. **Slide 5 — Revenue Projection**: Línea de proyección de ingresos año 1-3

Todos usan **Chart.js** (incluido via CDN).

---

## 🎨 Customización

### Cambiar colores
En `style.css`, línea 8-14:
```css
:root {
    --color-primary: #E74C3C;      /* Rojo/naranja */
    --color-secondary: #3498DB;    /* Azul */
    --color-accent: #27AE60;       /* Verde */
    --color-bg: #FFFFFF;           /* Fondo */
    --color-text: #2C3E50;         /* Texto */
}
```

### Cambiar duración de animaciones
En `style.css`, línea 15:
```css
--transition-speed: 0.5s;      /* Cambiar a 0.3s para más rápido */
```

### Editar contenido
- Textos: en `index.html`, busca el slide y edita el `<p>` o `<h3>`
- Gráficos: en `script.js`, modifica los datos en `data: [...]`
- Imágenes: agrega `<img src="...">` dentro de `<div class="slide-content">`

---

## 📱 Responsive

La presentación se adapta a dispositivos móviles/tablets, pero se recomienda presentar en **pantalla completa** en una monitor/projector.

---

## 🔧 Troubleshooting

**Los gráficos no aparecen:**
- Verifica que `index.html`, `style.css` y `script.js` estén en la misma carpeta
- Asegúrate de tener conexión a internet (CDN de Chart.js requiere descargar)

**Las animaciones no funcionan:**
- Prueba otro navegador (Chrome/Firefox son más estables)
- Verifica que no hayas deshabilitado JavaScript

**Se ve cortado en mobile:**
- Abre en modo horizontal (landscape)
- Usa el navegador en fullscreen

---

## 💡 Tips para presentar

1. **Practica el timing**: Cada slide tiene timing específico (Slide 1: 15s, Slide 2: 35s, etc)
2. **Fullscreen**: Presiona `F` antes de empezar a presentar
3. **Lento y claro**: Deja que los gráficos cargen (unos 500ms)
4. **Pausas**: Pausa entre slides clave para dejar que asimile el público

---

## 📝 Notas

- La presentación está optimizada para **1920x1080** (Full HD)
- Compatible con navegadores modernos (Chrome, Firefox, Safari, Edge)
- No requiere internet para funcionamiento (excepto gráficos via CDN)

---

**Creado para**: Hackathon Build With AI 2026, Santa Cruz, Bolivia
**Stack**: HTML5 + CSS3 + JavaScript + Chart.js

Hecho con ❤️ para la soberanía energética de Bolivia.
