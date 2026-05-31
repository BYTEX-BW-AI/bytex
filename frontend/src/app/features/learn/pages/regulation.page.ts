import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CardComponent } from '../../../shared/components/ui/card/card.component';

@Component({
  selector: 'bytex-regulation-page',
  standalone: true,
  imports: [CardComponent],
  template: `
    <div class="min-h-screen px-4 py-8">
      <div class="max-w-4xl mx-auto">
        <h1 class="text-3xl font-bold text-white mb-2">⚖️ Marco Regulatorio Bolivia</h1>
        <p class="text-surface-400 mb-8">Normativa vigente para generación distribuida en Bolivia</p>

        <div class="space-y-4">
          <div class="bg-surface-800 border border-surface-700 rounded-xl p-5">
            <h3 class="text-lg font-semibold text-white mb-2">DS 4477 (marzo 2021)</h3>
            <p class="text-sm text-surface-400">Legaliza la generación distribuida. Define categorías: nano (<10 kW), micro (10-50 kW), mini (50-350 kW).</p>
          </div>
          <div class="bg-surface-800 border border-surface-700 rounded-xl p-5">
            <h3 class="text-lg font-semibold text-white mb-2">DS 4539 (julio 2021)</h3>
            <p class="text-sm text-surface-400">Elimina aranceles de importación en inversores, medidores bidireccionales y equipos de generación distribuida.</p>
          </div>
          <div class="bg-surface-800 border border-surface-700 rounded-xl p-5">
            <h3 class="text-lg font-semibold text-white mb-2">DS 5167 (junio 2024)</h3>
            <p class="text-sm text-surface-400">Actualiza y amplía incentivos para generación distribuida. Mejora tasas de compensación.</p>
          </div>
        </div>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegulationPage {}
