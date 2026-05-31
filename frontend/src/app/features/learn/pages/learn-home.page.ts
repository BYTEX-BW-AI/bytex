import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'bytex-learn-home',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="min-h-screen px-4 py-8">
      <div class="max-w-4xl mx-auto">
        <h1 class="text-3xl font-bold text-white mb-2">📖 Centro de Conocimiento</h1>
        <p class="text-surface-400 mb-8">Todo lo que necesitás saber sobre energía solar para tu empresa</p>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <a routerLink="/aprender/paneles" class="group bg-surface-800 border border-surface-700 rounded-xl p-6 hover:border-primary-500 transition-all">
            <span class="text-3xl block mb-3">☀️</span>
            <h3 class="text-lg font-semibold text-white mb-2">Paneles Solares</h3>
            <p class="text-sm text-surface-400">Tecnología, precios, fabricantes y guía de compra para Bolivia</p>
          </a>
          <a routerLink="/aprender/regulacion" class="group bg-surface-800 border border-surface-700 rounded-xl p-6 hover:border-primary-500 transition-all">
            <span class="text-3xl block mb-3">⚖️</span>
            <h3 class="text-lg font-semibold text-white mb-2">Regulación Boliviana</h3>
            <p class="text-sm text-surface-400">DS 4477, 4539, 5167, Net Metering y Net Billing</p>
          </a>
          <div class="bg-surface-800 border border-surface-700 rounded-xl p-6">
            <span class="text-3xl block mb-3">📊</span>
            <h3 class="text-lg font-semibold text-white mb-2">Datos CRE</h3>
            <p class="text-sm text-surface-400">Tarifas históricas, proyecciones y comparativas</p>
          </div>
          <div class="bg-surface-800 border border-surface-700 rounded-xl p-6">
            <span class="text-3xl block mb-3">🏭</span>
            <h3 class="text-lg font-semibold text-white mb-2">Casos de Éxito</h3>
            <p class="text-sm text-surface-400">BFC 3MW y otras instalaciones reales en Santa Cruz</p>
          </div>
        </div>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LearnHomePage {}
