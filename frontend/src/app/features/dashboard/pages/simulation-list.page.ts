import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { DashboardFacade } from '../data-access/services/dashboard-facade';
import { EmptyStateComponent } from '../../../shared/components/ui/empty-state/empty-state.component';
import { SpinnerComponent } from '../../../shared/components/ui/spinner/spinner.component';
import { DecimalPipe } from '@angular/common';
import { CurrencyUsdPipe } from '../../../shared/pipes';
import { ButtonComponent } from '../../../shared/components/ui/button/button.component';
import { APP_ROUTES } from '../../../core/constants/app-routes';

@Component({
  selector: 'bytex-simulation-list-page',
  standalone: true,
  imports: [EmptyStateComponent, SpinnerComponent, ButtonComponent, CurrencyUsdPipe, DatePipe, DecimalPipe],
  template: `
    <div class="min-h-screen px-4 py-8">
      <div class="max-w-4xl mx-auto">
        <div class="flex items-center justify-between mb-8">
          <h1 class="text-3xl font-bold text-white">📊 Mis simulaciones</h1>
          <bytex-button variant="primary" (clicked)="onNewSimulation()">
            ➕ Nueva simulación
          </bytex-button>
        </div>

        @if (facade.loading()) {
          <bytex-spinner label="Cargando simulaciones..." />
        } @else if (facade.simulations().length === 0) {
          <bytex-empty-state
            icon="☀️"
            title="No tenés simulaciones aún"
            message="Simulá tu primera empresa para descubrir cuánto podés ahorrar."
            actionLabel="Comenzar simulación"
            (action)="onNewSimulation()"
          />
        } @else {
          <div class="space-y-4">
            @for (sim of facade.simulations(); track sim.id) {
              <div
                class="bg-surface-800 border border-surface-700 rounded-xl p-5 hover:border-surface-600 transition-all cursor-pointer"
                (click)="onViewDetail(sim.id!)"
              >
                <div class="flex items-center justify-between">
                  <div>
                    <div class="flex items-center gap-2 mb-1">
                      <span class="text-xl">{{ sim.sector ? '💡' : '📋' }}</span>
                      <p class="font-semibold text-white">
                        {{ sim.billData?.nombreCliente || sim.sector || 'Simulación' }}
                      </p>
                    </div>
                    <div class="flex items-center gap-3 text-sm text-surface-400">
                      <span>☀️ {{ sim.sizing.peakPowerKw | number:'1.0-1' }} kW</span>
                      <span>💰 {{ sim.financial.totalCapEx | currencyUsd }}</span>
                      <span>📈 Payback: {{ sim.financial.paybackYears | number:'1.0-1' }} años</span>
                    </div>
                  </div>
                  <div class="text-right">
                    <p class="text-xs text-surface-500">
                      {{ sim.createdAt | date:'shortDate' }}
                    </p>
                    <button
                      class="mt-2 text-xs text-danger hover:text-red-300 transition-colors"
                      (click)="onDelete($event, sim.id!)"
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              </div>
            }
          </div>

          @if (facade.hasMore()) {
            <div class="mt-6 text-center">
              <bytex-button variant="ghost" (clicked)="onLoadMore()">
                Cargar más
              </bytex-button>
            </div>
          }
        }
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SimulationListPage {
  protected facade = inject(DashboardFacade);
  private router = inject(Router);

  constructor() {
    this.facade.loadSimulations();
  }

  onNewSimulation(): void {
    this.router.navigate([APP_ROUTES.SIMULATOR.TYPE]);
  }

  onViewDetail(id: string): void {
    this.router.navigate([APP_ROUTES.DASHBOARD, id]);
  }

  onDelete(event: MouseEvent, id: string): void {
    event.stopPropagation();
    this.facade.deleteSimulation(id);
  }

  onLoadMore(): void {
    // Load more with cursor
  }
}
