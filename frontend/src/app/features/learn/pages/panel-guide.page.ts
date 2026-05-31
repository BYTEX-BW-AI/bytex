import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CardComponent } from '../../../shared/components/ui/card/card.component';

@Component({
  selector: 'bytex-panel-guide',
  standalone: true,
  imports: [CardComponent],
  template: `
    <div class="min-h-screen px-4 py-8">
      <div class="max-w-5xl mx-auto">
        <h1 class="text-3xl font-bold text-white mb-2">☀️ Guía de Paneles Solares</h1>
        <p class="text-surface-400 mb-8">Comparativa completa de tecnologías, precios y fabricantes</p>

        <!-- Technology badges legend -->
        <div class="flex flex-wrap gap-3 mb-8">
          <span class="tech-perc">🟦 PERC - Económico</span>
          <span class="tech-topcon">🟩 TOPCon - Estándar</span>
          <span class="tech-hjt">🟡 HJT - Mejor en calor</span>
          <span class="tech-abc">🟣 ABC/BC - Premium</span>
          <span class="tech-ibc">⬛ IBC - Máxima eficiencia</span>
        </div>

        <div class="overflow-x-auto">
          <table class="w-full text-sm">
            <thead>
              <tr class="bg-surface-800 text-surface-300">
                <th class="p-3 text-left">Panel</th>
                <th class="p-3 text-left">Tecnología</th>
                <th class="p-3 text-right">Potencia</th>
                <th class="p-3 text-right">Eficiencia</th>
                <th class="p-3 text-right">W/m²</th>
                <th class="p-3 text-right">Área</th>
                <th class="p-3 text-right">Coef. Temp</th>
                <th class="p-3 text-right">Landed SCZ</th>
                <th class="p-3 text-right">$/W Landed</th>
              </tr>
            </thead>
            <tbody>
              <tr class="border-b border-surface-700 hover:bg-surface-800/50">
                <td class="p-3 font-medium text-white">Jinko Tiger NEO III 78HC</td>
                <td class="p-3"><span class="tech-topcon">TOPCon</span></td>
                <td class="p-3 text-right">670W</td>
                <td class="p-3 text-right">24.8%</td>
                <td class="p-3 text-right">239</td>
                <td class="p-3 text-right">2.80m²</td>
                <td class="p-3 text-right">-0.29%/°C</td>
                <td class="p-3 text-right font-semibold text-primary-500">$108</td>
                <td class="p-3 text-right font-semibold text-green-400">$0.161 🏆</td>
              </tr>
              <tr class="border-b border-surface-700 hover:bg-surface-800/50">
                <td class="p-3 font-medium text-white">Aiko Stellar 3N+72</td>
                <td class="p-3"><span class="tech-abc">ABC</span></td>
                <td class="p-3 text-right">685W</td>
                <td class="p-3 text-right">25.4%</td>
                <td class="p-3 text-right">254</td>
                <td class="p-3 text-right">2.70m²</td>
                <td class="p-3 text-right">-0.26%/°C</td>
                <td class="p-3 text-right font-semibold text-primary-500">$195</td>
                <td class="p-3 text-right">$0.285</td>
              </tr>
              <tr class="border-b border-surface-700 hover:bg-surface-800/50">
                <td class="p-3 font-medium text-white">LONGi Hi-MO X10 72c</td>
                <td class="p-3"><span class="tech-abc">HPBC</span></td>
                <td class="p-3 text-right">670W</td>
                <td class="p-3 text-right">24.8%</td>
                <td class="p-3 text-right">248</td>
                <td class="p-3 text-right">2.70m²</td>
                <td class="p-3 text-right">-0.28%/°C</td>
                <td class="p-3 text-right font-semibold text-primary-500">$135</td>
                <td class="p-3 text-right">$0.201</td>
              </tr>
              <tr class="border-b border-surface-700 hover:bg-surface-800/50">
                <td class="p-3 font-medium text-white">Recom Black Tiger 665W</td>
                <td class="p-3"><span class="tech-abc">BC</span></td>
                <td class="p-3 text-right">665W</td>
                <td class="p-3 text-right">24.8%</td>
                <td class="p-3 text-right">214</td>
                <td class="p-3 text-right">3.11m²</td>
                <td class="p-3 text-right">-0.27%/°C</td>
                <td class="p-3 text-right font-semibold text-primary-500">$161</td>
                <td class="p-3 text-right">$0.242</td>
              </tr>
              <tr class="border-b border-surface-700 hover:bg-surface-800/50">
                <td class="p-3 font-medium text-white">Trina Vertex S+ 54c</td>
                <td class="p-3"><span class="tech-topcon">TOPCon</span></td>
                <td class="p-3 text-right">475W</td>
                <td class="p-3 text-right">23.8%</td>
                <td class="p-3 text-right">238</td>
                <td class="p-3 text-right">2.00m²</td>
                <td class="p-3 text-right">-0.30%/°C</td>
                <td class="p-3 text-right font-semibold text-primary-500">$70</td>
                <td class="p-3 text-right">$0.148</td>
              </tr>
              <tr class="border-b border-surface-700 hover:bg-surface-800/50">
                <td class="p-3 font-medium text-white">Aiko Neostar 3P54</td>
                <td class="p-3"><span class="tech-abc">ABC</span></td>
                <td class="p-3 text-right">500W</td>
                <td class="p-3 text-right">25.0%</td>
                <td class="p-3 text-right">250</td>
                <td class="p-3 text-right">2.00m²</td>
                <td class="p-3 text-right">-0.26%/°C</td>
                <td class="p-3 text-right font-semibold text-primary-500">$121</td>
                <td class="p-3 text-right">$0.242</td>
              </tr>
              <tr class="hover:bg-surface-800/50">
                <td class="p-3 font-medium text-white">PERC Estándar 450W</td>
                <td class="p-3"><span class="tech-perc">PERC</span></td>
                <td class="p-3 text-right">450W</td>
                <td class="p-3 text-right">20.0%</td>
                <td class="p-3 text-right">189</td>
                <td class="p-3 text-right">2.17m²</td>
                <td class="p-3 text-right">-0.38%/°C</td>
                <td class="p-3 text-right font-semibold text-primary-500">$48</td>
                <td class="p-3 text-right">$0.108</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="mt-8 p-4 bg-surface-800 border border-surface-700 rounded-lg text-sm text-surface-400">
          <p>💡 <strong>Precios Landed SCZ:</strong> Incluyen valor FOB + flete marítimo Shanghai → Iquique + flete terrestre Iquique → Santa Cruz + seguro (0.75%) + GA (5%) + IVA (14.94%) + despacho aduanero.</p>
          <p class="mt-2">📌 <strong>Recomendado para microredes industriales:</strong> Jinko Tiger NEO III 670W — mejor relación $/W del mercado.</p>
        </div>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PanelGuidePage {}
