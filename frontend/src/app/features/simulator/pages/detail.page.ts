import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { SimulatorFacade } from '../data-access/services/simulator-facade';
import { ButtonComponent } from '../../../shared/components/ui/button/button.component';
import { CardComponent } from '../../../shared/components/ui/card/card.component';
import { DecimalPipe } from '@angular/common';
import { CurrencyUsdPipe, NumberFormatPipe } from '../../../shared/pipes';
import { APP_ROUTES } from '../../../core/constants/app-routes';

@Component({
  selector: 'bytex-detail-page',
  standalone: true,
  imports: [ButtonComponent, CardComponent, CurrencyUsdPipe, NumberFormatPipe, DecimalPipe],
  template: `
    <div class="min-h-screen px-4 py-8">
      <div class="max-w-4xl mx-auto">
        <div class="mb-8">
          <h1 class="text-3xl font-bold text-white mb-2">🔧 Detalle técnico</h1>
          <p class="text-surface-400">Desglose completo de tu microred solar</p>
        </div>

        <!-- Panel Selector -->
        <bytex-card title="☀️ Seleccioná tu panel solar" class="mb-6">
          <div class="space-y-3">
            @for (panel of facade.availablePanels(); track panel.id) {
              <button
                class="w-full flex items-center gap-4 p-4 rounded-lg border transition-all text-left"
                [class]="facade.selectedPanel()?.id === panel.id 
                  ? 'border-primary-500 bg-primary-500/10' 
                  : 'border-surface-700 bg-surface-800/50 hover:border-surface-600'"
                (click)="onSelectPanel(panel)"
              >
                <div class="flex-1">
                  <p class="font-semibold text-white">{{ panel.brand }} {{ panel.model }}</p>
                  <div class="flex items-center gap-2 mt-1">
                    <span [class]="'tech-' + panel.technology.toLowerCase()">{{ panel.technology }}</span>
                    <span class="text-sm text-surface-400">{{ panel.wattPeak }}W</span>
                    <span class="text-sm text-surface-400">|</span>
                    <span class="text-sm text-surface-400">{{ panel.efficiency }}%</span>
                    <span class="text-sm text-surface-400">|</span>
                    <span class="text-sm text-surface-400">{{ panel.wattPerM2 }} W/m²</span>
                  </div>
                </div>
                <div class="text-right">
                  <p class="text-lg font-bold text-primary-500">{{ panel.priceLandedScz | currencyUsd }}</p>
                  <p class="text-xs text-surface-500">{{ panel.pricePerWattLanded | currencyUsd }}/W</p>
                </div>
                @if (facade.selectedPanel()?.id === panel.id) {
                  <span class="text-primary-500 text-xl">✓</span>
                }
              </button>
            }
          </div>
        </bytex-card>

        <!-- Cost Breakdown -->
        @if (facade.costBreakdown().length > 0) {
          <bytex-card title="💰 Desglose de costos" class="mb-6">
            <div class="space-y-3">
              @for (item of facade.costBreakdown(); track item.label) {
                <div class="flex items-center justify-between py-2 border-b border-surface-700 last:border-0">
                  <div>
                    <p class="text-sm text-white">{{ item.label }}</p>
                    <p class="text-xs text-surface-400">
                      {{ item.quantity }} × {{ item.unitPrice | currencyUsd }}
                      @if (item.note) {
                        <span class="text-surface-500"> — {{ item.note }}</span>
                      }
                    </p>
                  </div>
                  <p class="text-sm font-semibold text-white">{{ item.total | currencyUsd }}</p>
                </div>
              }
              <div class="flex items-center justify-between pt-3 border-t border-surface-600">
                <p class="text-lg font-bold text-white">TOTAL</p>
                <p class="text-lg font-bold text-primary-500">{{ facade.financial()?.totalCapEx | currencyUsd }}</p>
              </div>
            </div>
          </bytex-card>
        }

        <!-- Financial Detail -->
        <bytex-card title="📊 Métricas financieras" class="mb-6">
          <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <p class="text-xs text-surface-400">Payback simple</p>
              <p class="text-lg font-bold text-white">{{ facade.financial()?.paybackYears | number:'1.0-1' }} años</p>
            </div>
            <div>
              <p class="text-xs text-surface-400">TIR</p>
              <p class="text-lg font-bold text-green-400">{{ facade.financial()?.irr | number:'1.0-1' }}%</p>
            </div>
            <div>
              <p class="text-xs text-surface-400">VAN (10 años)</p>
              <p class="text-lg font-bold text-green-400">{{ facade.financial()?.van | currencyUsd }}</p>
            </div>
            <div>
              <p class="text-xs text-surface-400">LCOE</p>
              <p class="text-lg font-bold text-white">{{ facade.financial()?.lcoe | currencyUsd }}/kWh</p>
            </div>
          </div>
        </bytex-card>

        <div class="flex justify-center gap-4">
          <bytex-button variant="primary" size="lg" (clicked)="onBackToResults()">
            ⬅ Volver a resultados
          </bytex-button>
          <bytex-button variant="secondary" size="lg" (clicked)="onCalculate()">
            🔄 Recalcular con este panel
          </bytex-button>
        </div>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetailPage {
  protected facade = inject(SimulatorFacade);
  private router = inject(Router);

  onSelectPanel(panel: any): void {
    this.facade.selectPanel(panel);
  }

  onCalculate(): void {
    this.facade.calculate();
    this.router.navigate([APP_ROUTES.SIMULATOR.PROCESSING]);
  }

  onBackToResults(): void {
    this.router.navigate([APP_ROUTES.SIMULATOR.RESULTS]);
  }
}
