import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DashboardFacade } from '../data-access/services/dashboard-facade';
import { ButtonComponent } from '../../../shared/components/ui/button/button.component';
import { CardComponent } from '../../../shared/components/ui/card/card.component';
import { SpinnerComponent } from '../../../shared/components/ui/spinner/spinner.component';import { DecimalPipe } from '@angular/common';import { CurrencyUsdPipe, NumberFormatPipe } from '../../../shared/pipes';
import { APP_ROUTES } from '../../../core/constants/app-routes';

@Component({
  selector: 'bytex-simulation-detail-page',
  standalone: true,
  imports: [ButtonComponent, CardComponent, SpinnerComponent, CurrencyUsdPipe, NumberFormatPipe, DecimalPipe],
  template: `
    @if (facade.selectedSimulation(); as sim) {
      <div class="min-h-screen px-4 py-8">
        <div class="max-w-4xl mx-auto">
          <div class="mb-6">
            <bytex-button variant="ghost" (clicked)="onBack()">
              ⬅ Volver
            </bytex-button>
          </div>

          <h1 class="text-3xl font-bold text-white mb-8">
            {{ sim.billData?.nombreCliente || sim.sector || 'Simulación' }}
          </h1>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div class="bg-surface-800 border border-surface-700 rounded-xl p-4 text-center">
              <p class="text-sm text-surface-400">Potencia</p>
              <p class="text-2xl font-bold text-white">{{ sim.sizing.peakPowerKw }} kW</p>
            </div>
            <div class="bg-surface-800 border border-surface-700 rounded-xl p-4 text-center">
              <p class="text-sm text-surface-400">Inversión</p>
              <p class="text-2xl font-bold text-primary-500">{{ sim.financial.totalCapEx | currencyUsd }}</p>
            </div>
            <div class="bg-surface-800 border border-surface-700 rounded-xl p-4 text-center">
              <p class="text-sm text-surface-400">Payback</p>
              <p class="text-2xl font-bold text-green-400">{{ sim.financial.paybackYears }} años</p>
            </div>
          </div>
        </div>
      </div>
    } @else {
      <div class="min-h-screen flex items-center justify-center">
        <bytex-spinner />
      </div>
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SimulationDetailPage {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  protected facade = inject(DashboardFacade);

  constructor() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.facade.loadDetail(id);
    }
  }

  onBack(): void {
    this.router.navigate([APP_ROUTES.DASHBOARD]);
  }
}
