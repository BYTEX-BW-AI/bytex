import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

@Component({
  selector: 'bytex-demo-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="min-h-screen bg-gradient-to-b from-surface-900 to-surface-950 text-white px-4 py-8">
      <div class="max-w-7xl mx-auto">

        <!-- Header -->
        <div class="text-center mb-12">
          <h1 class="text-4xl font-bold mb-2">ByteX Simulador</h1>
          <p class="text-surface-400">Demo: Análisis IA para Soberanía Energética</p>
        </div>

        @if (!step()) {
          <!-- Step 1: Upload -->
          <div class="bg-surface-800 border border-surface-700 rounded-xl p-8 max-w-2xl mx-auto">
            <h2 class="text-2xl font-bold mb-6">Subí tu factura CRE</h2>
            <div class="border-2 border-dashed border-surface-600 rounded-lg p-12 text-center cursor-pointer hover:border-primary-500 transition" (click)="uploadDemo()">
              <p class="text-4xl mb-4">📄</p>
              <p class="text-lg">Click para cargar factura de demo</p>
              <p class="text-sm text-surface-400 mt-2">O arrastrá un archivo aquí</p>
            </div>
          </div>
        }

        @if (step() === 1) {
          <!-- Step 2: OCR + Analysis -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <!-- Bill Data -->
            <div class="bg-surface-800 border border-surface-700 rounded-xl p-6">
              <h3 class="text-lg font-bold mb-4">📋 Datos Extraídos (OCR)</h3>
              <div class="space-y-3 text-sm">
                <div>
                  <p class="text-surface-400">Consumo mensual</p>
                  <p class="text-xl font-bold">15,908 kWh</p>
                </div>
                <div>
                  <p class="text-surface-400">Costo actual</p>
                  <p class="text-xl font-bold">Bs 13,799.95</p>
                </div>
                <div>
                  <p class="text-surface-400">Tarifa</p>
                  <p class="text-xl font-bold">0.87 Bs/kWh</p>
                </div>
                <div>
                  <p class="text-surface-400">Período</p>
                  <p class="text-xl font-bold">Diciembre 2024</p>
                </div>
              </div>
            </div>

            <!-- AI Analysis -->
            <div class="bg-surface-800 border border-surface-700 rounded-xl p-6">
              <h3 class="text-lg font-bold mb-4">🤖 Análisis IA</h3>
              <div class="space-y-4">
                <div>
                  <p class="text-surface-400 text-sm">Riesgo de cortes</p>
                  <p class="text-2xl font-bold text-red-400">ALTO 🔴</p>
                </div>
                <div>
                  <p class="text-surface-400 text-sm mb-1">Recomendación</p>
                  <p class="text-white font-semibold">Pack Horizonte con batería 50 kWh</p>
                </div>
                <div>
                  <p class="text-surface-400 text-sm mb-1">Por qué</p>
                  <p class="text-sm text-surface-300">Tu consumo (15,900 kWh/mes) es típico de comercios en Santa Cruz. La zona Centro tiene 3-4 cortes/mes en estación seca.</p>
                </div>
                <div>
                  <p class="text-surface-400 text-sm mb-2">Insights</p>
                  <ul class="text-sm space-y-1">
                    <li>✓ Tu tarifa está 15% arriba del promedio regional</li>
                    <li>✓ Consumo muy estable mes a mes</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div class="text-center mb-8">
            <button (click)="nextStep()" class="bg-primary-600 hover:bg-primary-700 px-8 py-3 rounded-lg font-semibold transition">
              Calcular mi microred →
            </button>
          </div>
        }

        @if (step() === 2) {
          <!-- Step 3: Results -->
          <div class="space-y-6 mb-8">
            <!-- Comparison -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div class="bg-surface-800 border-2 border-red-900/50 rounded-xl p-6">
                <h3 class="text-lg font-bold mb-4">🏭 CRE (hoy)</h3>
                <p class="text-3xl font-bold text-red-400 mb-4">Bs 13,799.95/mes</p>
                <ul class="space-y-2 text-sm">
                  <li><span class="text-surface-400">Tarifa:</span> 0.87 Bs/kWh</li>
                  <li><span class="text-surface-400">Incremento anual:</span> +5.2%</li>
                  <li><span class="text-surface-400">Dependencia:</span> Gas 70%</li>
                  <li><span class="text-surface-400">Riesgo:</span> <span class="text-red-400 font-bold">ALTO 🔴</span></li>
                </ul>
              </div>

              <div class="bg-surface-800 border-2 border-green-900/50 rounded-xl p-6">
                <h3 class="text-lg font-bold mb-4">☀️ Microred Solar</h3>
                <p class="text-3xl font-bold text-green-400 mb-4">Bs 0/mes</p>
                <ul class="space-y-2 text-sm">
                  <li><span class="text-surface-400">LCOE:</span> 0.29 Bs/kWh</li>
                  <li><span class="text-surface-400">Incremento:</span> 0% 🔒</li>
                  <li><span class="text-surface-400">Dependencia:</span> Solar ☀️</li>
                  <li><span class="text-surface-400">Riesgo:</span> <span class="text-green-400 font-bold">MÍNIMO 🟢</span></li>
                </ul>
              </div>
            </div>

            <!-- Key Metrics -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div class="bg-surface-800 border border-surface-700 rounded-xl p-6 text-center">
                <p class="text-surface-400 text-sm">Inversión necesaria</p>
                <p class="text-2xl font-bold text-primary-500">$156,500</p>
              </div>
              <div class="bg-surface-800 border border-surface-700 rounded-xl p-6 text-center">
                <p class="text-surface-400 text-sm">Payback</p>
                <p class="text-2xl font-bold text-secondary-500">4.2 años</p>
              </div>
              <div class="bg-surface-800 border border-surface-700 rounded-xl p-6 text-center">
                <p class="text-surface-400 text-sm">Ahorro 25 años</p>
                <p class="text-2xl font-bold text-secondary-500">$2.3M</p>
              </div>
            </div>

            <!-- Sizing -->
            <div class="bg-surface-800 border border-surface-700 rounded-xl p-6">
              <h3 class="text-lg font-bold mb-4">☀️ Sistema propuesto</h3>
              <div class="grid grid-cols-2 md:grid-cols-5 gap-4 text-center text-sm">
                <div>
                  <p class="text-2xl font-bold">648</p>
                  <p class="text-surface-400">Paneles</p>
                </div>
                <div>
                  <p class="text-2xl font-bold">434.2 kW</p>
                  <p class="text-surface-400">Potencia pico</p>
                </div>
                <div>
                  <p class="text-2xl font-bold">5 × 150 kWh</p>
                  <p class="text-surface-400">Baterías</p>
                </div>
                <div>
                  <p class="text-2xl font-bold">500 kW</p>
                  <p class="text-surface-400">Inversor</p>
                </div>
                <div>
                  <p class="text-2xl font-bold">2,600 m²</p>
                  <p class="text-surface-400">Área requerida</p>
                </div>
              </div>
            </div>
          </div>

          <div class="text-center mb-8">
            <button (click)="nextStep()" class="bg-primary-600 hover:bg-primary-700 px-8 py-3 rounded-lg font-semibold transition">
              Ver análisis con IA →
            </button>
          </div>
        }

        @if (step() === 3) {
          <!-- Step 4: Chat -->
          <div class="bg-surface-800 border border-surface-700 rounded-xl p-6 max-w-2xl mx-auto">
            <h3 class="text-lg font-bold mb-4">💬 Preguntá sobre tu simulación</h3>

            <!-- Messages -->
            <div class="bg-surface-900 rounded-lg p-4 min-h-64 max-h-96 overflow-y-auto space-y-4 mb-4">
              @for (msg of messages(); track $index) {
                <div [ngClass]="msg.role === 'user' ? 'text-right' : 'text-left'">
                  <div [ngClass]="[
                    'inline-block px-4 py-2 rounded-lg max-w-xs',
                    msg.role === 'user'
                      ? 'bg-primary-600 text-white'
                      : 'bg-surface-700 text-surface-200'
                  ]">
                    {{ msg.content }}
                  </div>
                </div>
              }
            </div>

            <!-- Input -->
            <div class="flex gap-2">
              <input
                #input
                type="text"
                class="flex-1 bg-surface-700 border border-surface-600 rounded px-3 py-2 text-sm text-white placeholder-surface-500 focus:outline-none focus:border-primary-500"
                placeholder="¿Por qué...? ¿Puedo...? ¿Qué si...?"
                (keyup.enter)="sendMessage(input.value); input.value = ''"
              />
              <button
                (click)="sendMessage(input.value); input.value = ''"
                class="bg-primary-600 hover:bg-primary-700 px-4 py-2 rounded text-sm font-semibold transition"
              >
                Enviar
              </button>
            </div>

            <!-- Quick suggestions -->
            <div class="mt-4 space-y-2">
              <p class="text-xs text-surface-400">Preguntas sugeridas:</p>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-2">
                <button (click)="quickQuestion('¿Por qué 648 paneles exactamente?')"
                        class="text-left text-xs bg-surface-700 hover:bg-surface-600 p-2 rounded transition">
                  ¿Por qué 648 paneles exactamente?
                </button>
                <button (click)="quickQuestion('¿Qué tipo de batería recomendás?')"
                        class="text-left text-xs bg-surface-700 hover:bg-surface-600 p-2 rounded transition">
                  ¿Qué tipo de batería recomendás?
                </button>
                <button (click)="quickQuestion('¿Puedo usar paneles baratos de China?')"
                        class="text-left text-xs bg-surface-700 hover:bg-surface-600 p-2 rounded transition">
                  ¿Puedo usar paneles baratos?
                </button>
                <button (click)="quickQuestion('¿Cuál es el riesgo de esta instalación?')"
                        class="text-left text-xs bg-surface-700 hover:bg-surface-600 p-2 rounded transition">
                  ¿Cuál es el riesgo?
                </button>
              </div>
            </div>

            <div class="text-center mt-6">
              <button (click)="reset()" class="bg-secondary-600 hover:bg-secondary-700 px-6 py-2 rounded-lg font-semibold transition">
                ← Hacer otra simulación
              </button>
            </div>
          </div>
        }
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }
  `]
})
export class DemoPage {
  step = signal(0);
  messages = signal<Message[]>([
    {
      role: 'assistant',
      content: 'Hola 👋 Acabo de analizar tu simulación. Te recomiendo 648 paneles porque tu consumo promedio es 15,900 kWh/mes. ¿Qué querés saber?'
    }
  ]);

  private responses: Record<string, string> = {
    '¿Por qué 648 paneles exactamente?': 'Con 648 paneles de 670W, generás 434 kW de potencia pico. Eso te cubre el consumo promedio de 15,900 kWh/mes considerando la irradiancia de 4.8 kWh/m²/día en Santa Cruz, con un factor de eficiencia del 86%. Es el mínimo necesario para independencia energética real.',
    '¿Qué tipo de batería recomendás?': 'Te recomiendo baterías de litio (LiFePO4) porque tienen 5,000+ ciclos de vida, son seguras, y el costo por ciclo es competitivo. 5 módulos de 150 kWh te dan 750 kWh totales — suficiente para cubrir 2-3 días nublados sin perder carga.',
    '¿Puedo usar paneles baratos de China?': 'Técnicamente sí, pero con riesgos: menos garantía (10-15 años vs 30), eficiencia 18-20% (vs 24-25%), y costos de reemplazo son altos si fallan en año 8. Para un ROI a 4.2 años, la diferencia de $15-20/panel se amortiza rápido con paneles de calidad.',
    '¿Cuál es el riesgo de esta instalación?': 'El riesgo es BAJO porque: (1) Tecnología madura, (2) Sistema redundante con baterías, (3) Paneles tienen 30 años de garantía, (4) Estructura local en Santa Cruz (mantenimiento accesible). El único riesgo es falla de inversor (~año 10-15), costo $20-30k.',
    default: 'Excelente pregunta. Based en tu consumo de 15,900 kWh/mes y el análisis IA, te diría que...'
  };

  uploadDemo(): void {
    this.step.set(1);
  }

  nextStep(): void {
    this.step.update(s => s + 1);
  }

  sendMessage(question: string): void {
    if (!question.trim()) return;

    // Add user message
    this.messages.update(msgs => [
      ...msgs,
      { role: 'user', content: question }
    ]);

    // Simulate AI response (with slight delay)
    setTimeout(() => {
      const response = this.responses[question] || this.responses['default'];
      this.messages.update(msgs => [
        ...msgs,
        { role: 'assistant', content: response }
      ]);
    }, 500);
  }

  quickQuestion(question: string): void {
    this.sendMessage(question);
  }

  reset(): void {
    this.step.set(0);
    this.messages.set([
      {
        role: 'assistant',
        content: 'Hola 👋 Acabo de analizar tu simulación. Te recomiendo 648 paneles porque tu consumo promedio es 15,900 kWh/mes. ¿Qué querés saber?'
      }
    ]);
  }
}
