// Configuración global
let currentSlide = 1;
const totalSlides = 5;

// Inicialización
document.addEventListener('DOMContentLoaded', function() {
    initSlides();
    initCharts();
    setupKeyboardNavigation();
    updateSlideCounter();
});

// ================================
// FUNCIONES DE NAVEGACIÓN
// ================================

function showSlide(n) {
    const slides = document.querySelectorAll('.slide');

    // Validar rango
    if (n > totalSlides) currentSlide = 1;
    if (n < 1) currentSlide = totalSlides;

    // Ocultar todos los slides
    slides.forEach(slide => slide.classList.remove('active'));

    // Mostrar slide actual
    slides[currentSlide - 1].classList.add('active');

    // Actualizar indicadores
    updateIndicators();
    updateSlideCounter();
}

function nextSlide() {
    currentSlide++;
    showSlide(currentSlide);
}

function prevSlide() {
    currentSlide--;
    showSlide(currentSlide);
}

function goToSlide(n) {
    currentSlide = n;
    showSlide(currentSlide);
}

function initSlides() {
    showSlide(currentSlide);
}

function updateIndicators() {
    const indicators = document.querySelectorAll('.indicator');
    indicators.forEach((indicator, index) => {
        if (index + 1 === currentSlide) {
            indicator.classList.add('active');
        } else {
            indicator.classList.remove('active');
        }
    });
}

function updateSlideCounter() {
    document.getElementById('current-slide').textContent = currentSlide;
    document.getElementById('total-slides').textContent = totalSlides;
}

function setupKeyboardNavigation() {
    document.addEventListener('keydown', function(event) {
        if (event.key === 'ArrowRight' || event.key === ' ') {
            nextSlide();
        } else if (event.key === 'ArrowLeft') {
            prevSlide();
        }
    });
}

// ================================
// GRÁFICOS CON CHART.JS
// ================================

function initCharts() {
    createReservasChart();
    createPaybackChart();
    createProjectionChart();
}

function createReservasChart() {
    const ctx = document.getElementById('reservasChart');
    if (!ctx) return;

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['2013', '2020', '2026', '2031\n(Proyectado)'],
            datasets: [{
                label: 'Reservas de Gas (TCF)',
                data: [10.45, 5.5, 3.7, 0.5],
                backgroundColor: [
                    '#3498DB',
                    '#F39C12',
                    '#E74C3C',
                    '#C0392B'
                ],
                borderColor: '#fff',
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: 12,
                    ticks: {
                        font: { size: 12 },
                        color: '#2C3E50'
                    },
                    grid: {
                        color: 'rgba(0, 0, 0, 0.05)'
                    }
                },
                x: {
                    ticks: {
                        font: { size: 12 },
                        color: '#2C3E50'
                    },
                    grid: {
                        display: false
                    }
                }
            }
        }
    });
}

function createPaybackChart() {
    const ctx = document.getElementById('paybackChart');
    if (!ctx) return;

    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Comercial\n50kWp', 'Industrial\n100kWp', 'Industrial\n200kWp'],
            datasets: [
                {
                    label: 'Payback Hoy',
                    data: [3.4, 3.8, 5.2],
                    borderColor: '#3498DB',
                    backgroundColor: 'rgba(52, 152, 219, 0.1)',
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4,
                    pointRadius: 6,
                    pointBackgroundColor: '#3498DB',
                    pointBorderColor: '#fff',
                    pointBorderWidth: 2
                },
                {
                    label: 'Payback 2031',
                    data: [4.2, 5.0, 6.6],
                    borderColor: '#E74C3C',
                    backgroundColor: 'rgba(231, 76, 60, 0.1)',
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4,
                    pointRadius: 6,
                    pointBackgroundColor: '#E74C3C',
                    pointBorderColor: '#fff',
                    pointBorderWidth: 2
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    display: true,
                    position: 'top',
                    labels: {
                        font: { size: 13 },
                        color: '#2C3E50',
                        padding: 15
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: 8,
                    title: {
                        display: true,
                        text: 'Años',
                        font: { size: 12 }
                    },
                    ticks: {
                        font: { size: 12 },
                        color: '#2C3E50'
                    },
                    grid: {
                        color: 'rgba(0, 0, 0, 0.05)'
                    }
                },
                x: {
                    ticks: {
                        font: { size: 12 },
                        color: '#2C3E50'
                    },
                    grid: {
                        display: false
                    }
                }
            }
        }
    });
}

function createProjectionChart() {
    const ctx = document.getElementById('projectionChart');
    if (!ctx) return;

    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Año 1', 'Año 2', 'Año 3'],
            datasets: [{
                label: 'Revenue ($)',
                data: [132000, 280000, 453000],
                borderColor: '#27AE60',
                backgroundColor: 'rgba(39, 174, 96, 0.1)',
                borderWidth: 4,
                fill: true,
                tension: 0.4,
                pointRadius: 8,
                pointBackgroundColor: '#27AE60',
                pointBorderColor: '#fff',
                pointBorderWidth: 3,
                pointHoverRadius: 10
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: 500000,
                    ticks: {
                        callback: function(value) {
                            return '$' + (value / 1000).toFixed(0) + 'k';
                        },
                        font: { size: 12 },
                        color: '#2C3E50'
                    },
                    grid: {
                        color: 'rgba(0, 0, 0, 0.05)'
                    }
                },
                x: {
                    ticks: {
                        font: { size: 12 },
                        color: '#2C3E50'
                    },
                    grid: {
                        display: false
                    }
                }
            }
        }
    });
}

// ================================
// FULLSCREEN MODE (Opcional)
// ================================

document.addEventListener('keydown', function(event) {
    if (event.key === 'f' || event.key === 'F') {
        document.querySelector('.presentation').classList.toggle('fullscreen');
    }
});

// ================================
// MODO PRESENTACIÓN (Presionar 'p')
// ================================

document.addEventListener('keydown', function(event) {
    if (event.key === 'p' || event.key === 'P') {
        // Aquí puedes agregar lógica para modo presentación
        console.log('Modo presentación activado');
    }
});
