import { Component, inject, ChangeDetectionStrategy, effect } from '@angular/core';
import { Router } from '@angular/router';
import { SimulatorFacade } from '../data-access/services/simulator-facade';
import { SpinnerComponent } from '../../../shared/components/ui/spinner/spinner.component';
import { APP_ROUTES } from '../../../core/constants/app-routes';

@Component({
  selector: 'bytex-processing-page',
  standalone: true,
  imports: [SpinnerComponent],
  template: `
    <div class="min-h-[80vh] flex items-center justify-center px-4">
      <div class="max-w-lg w-full text-center">
        <bytex-spinner size="lg" />

        <h2 class="text-2xl font-bold text-white mt-8 mb-6">
          Calculando tu soberanía energética
        </h2>

        <div class="space-y-4 text-left">
          @for (step of steps; track step.label) {
            <div class="flex items-center gap-3 p-3 rounded-lg" [class]="step.status()">
              <span>{{ step.icon() }}</span>
              <div>
                <p class="text-sm font-medium" [class]="step.textClass()">{{ step.label }}</p>
                @if (step.detail()) {
                  <p class="text-xs text-surface-500">{{ step.detail() }}</p>
                }
              </div>
            </div>
          }
        </div>

        @if (facade.calculationError()) {
          <div class="mt-8 p-4 bg-red-900/50 border border-red-700 rounded-lg">
            <p class="text-red-200 text-sm">{{ facade.calculationError() }}</p>
            <button
              class="mt-3 text-sm text-red-300 hover:text-white underline"
              (click)="onRetry()"
            >
              Intentar de nuevo
            </button>
          </div>
        }
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProcessingPage {
  protected facade = inject(SimulatorFacade);
  private router = inject(Router);

  protected steps = [
    {
      label: 'Extrayendo datos',
      icon: () => this.facade.billData() ? '✅' : '⏳',
      status: () => this.facade.billData() ? 'bg-green-900/30 border border-green-800' : 'bg-surface-800 border border-surface-700 animate-pulse',
      textClass: () => this.facade.billData() ? 'text-green-400' : 'text-surface-300',
      detail: () => this.facade.billData() ? `${this.facade.billData()?.consumoKwh} kWh/mes - ${this.facade.billData()?.costoTotalBs} Bs/mes` : '',
    },
    {
      label: 'Obteniendo irradiación solar',
      icon: () => this.facade.irradiance() ? '✅' : '⏳',
      status: () => this.facade.irradiance() ? 'bg-green-900/30 border border-green-800' : 'bg-surface-800 border border-surface-700 animate-pulse',
      textClass: () => this.facade.irradiance() ? 'text-green-400' : 'text-surface-300',
      detail: () => this.facade.irradiance() ? `${this.facade.irradiance()} kWh/m²/día - NASA POWER` : '',
    },
    {
      label: 'Calculando microred solar',
      icon: () => this.facade.result() ? '✅' : (this.facade.isCalculating() ? '⏳' : '⏳'),
      status: () => this.facade.result() ? 'bg-green-900/30 border border-green-800' : 'bg-surface-800 border border-surface-700 animate-pulse',
      textClass: () => this.facade.result() ? 'text-green-400' : 'text-surface-300',
      detail: () => this.facade.result() ? `${this.facade.sizing()?.panelCount} paneles • ${this.facade.sizing()?.peakPowerKw} kWp` : '',
    },
  ];

  constructor() {
    effect(() => {
      if (this.facade.result()) {
        setTimeout(() => {
          this.router.navigate([APP_ROUTES.SIMULATOR.RESULTS]);
        }, 500);
      }
    });
  }

  onRetry(): void {
    this.facade.calculate();
  }
}
