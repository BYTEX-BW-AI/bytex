import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { SimulatorFacade } from '../data-access/services/simulator-facade';
import { ButtonComponent } from '../../../shared/components/ui/button/button.component';
import { CardComponent } from '../../../shared/components/ui/card/card.component';
import { DecimalPipe } from '@angular/common';
import { CurrencyUsdPipe, NumberFormatPipe } from '../../../shared/pipes';
import { AuthFacade } from '../../auth/data-access/services/auth-facade';
import { ProjectionChartComponent } from '../components/projection-chart/projection-chart.component';

@Component({
  selector: 'bytex-results-page',
  standalone: true,
  imports: [ButtonComponent, CardComponent, CurrencyUsdPipe, NumberFormatPipe, DecimalPipe, ProjectionChartComponent],
  providers: [CurrencyUsdPipe, NumberFormatPipe],
  template: `
    <div class="min-h-screen px-4 py-8">
      <div class="max-w-7xl mx-auto">

        <!-- Header -->
        <div class="text-center mb-12">
          <h1 class="text-4xl font-bold text-white mb-3">
            Resultados para tu empresa
          </h1>
          <p class="text-surface-400 text-lg">
            Basado en datos reales de Santa Cruz y precios de importación actualizados
          </p>
        </div>

        <!-- ⭐ Comparison: CRE vs Solar -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <!-- CRE Side -->
          <div class="bg-surface-800 border-2 border-red-900/50 rounded-xl p-6">
            <div class="flex items-center gap-3 mb-4">
              <span class="text-3xl">🏭</span>
              <h3 class="text-lg font-semibold text-white">CRE (hoy)</h3>
            </div>
            <div class="space-y-4">
              <div>
                <p class="text-sm text-surface-400">Costo mensual</p>
                <p class="text-3xl font-bold text-red-400">
                  Bs {{ facade.billData()?.costoTotalBs || (facade.estimatedConsumption()! * 0.82) | number:'1.0-2' }}
                </p>
              </div>
              <div class="grid grid-cols-2 gap-3">
                <div>
                  <p class="text-xs text-surface-400">Tarifa</p>
                  <p class="text-sm font-medium text-surface-200">
                    {{ ((facade.billData()?.costoTotalBs || facade.estimatedConsumption()! * 0.82) / (facade.billData()?.consumoKwh || facade.estimatedConsumption()!)) | number:'1.0-2' }} Bs/kWh
                  </p>
                </div>
                <div>
                  <p class="text-xs text-surface-400">Tipo de cambio</p>
                  <p class="text-sm font-medium text-surface-200">
                    {{ facade.result()?.exchangeRate?.rate | number:'1.0-2' }} Bs/USD
                    <span class="text-xs text-surface-500">({{ facade.result()?.exchangeRate?.source || 'dolarapi' }})</span>
                  </p>
                </div>
                <div>
                  <p class="text-xs text-surface-400">Dependencia</p>
                  <p class="text-sm font-medium text-surface-200">Gas 70% 🇧🇴</p>
                </div>
                <div>
                  <p class="text-xs text-surface-400">Riesgo de corte</p>
                  <p class="text-sm font-medium text-red-400">ALTO 🔴</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Solar Side -->
          <div class="bg-surface-800 border-2 border-green-900/50 rounded-xl p-6">
            <div class="flex items-center gap-3 mb-4">
              <span class="text-3xl">☀️</span>
              <h3 class="text-lg font-semibold text-white">Microred Solar</h3>
            </div>
            <div class="space-y-4">
              <div>
                <p class="text-sm text-surface-400">Costo mensual</p>
                <p class="text-3xl font-bold text-green-400">Bs 0 🏆</p>
              </div>
              <div class="grid grid-cols-2 gap-3">
                <div>
                  <p class="text-xs text-surface-400">LCOE</p>
                  <p class="text-sm font-medium text-green-400">0.29 Bs/kWh</p>
                </div>
                <div>
                  <p class="text-xs text-surface-400">Incremento</p>
                  <p class="text-sm font-medium text-green-400">0% 🔒</p>
                </div>
                <div>
                  <p class="text-xs text-surface-400">Dependencia</p>
                  <p class="text-sm font-medium text-surface-200">Sol ☀️</p>
                </div>
                <div>
                  <p class="text-xs text-surface-400">Riesgo de corte</p>
                  <p class="text-sm font-medium text-green-400">MÍNIMO 🟢</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Key Metrics -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div class="bg-surface-800 border border-surface-700 rounded-xl p-6 text-center">
            <p class="text-sm text-surface-400 mb-1">💰 Inversión necesaria</p>
            <p class="text-2xl font-bold text-primary-500">
              {{ facade.financial()?.totalCapEx | currencyUsd }}
            </p>
            <p class="text-xs text-surface-500 mt-1">
              ≈ Bs {{ (facade.financial()?.totalCapEx ?? 0) * (facade.result()?.exchangeRate?.rate ?? 6.96) | number:'1.0-0' }}
            </p>
          </div>
          <div class="bg-surface-800 border border-surface-700 rounded-xl p-6 text-center">
            <p class="text-sm text-surface-400 mb-1">📈 Payback</p>
            <p class="text-2xl font-bold text-secondary-500">
              {{ facade.financial()?.paybackYears | number:'1.0-1' }} años
            </p>
          </div>
          <div class="bg-surface-800 border border-surface-700 rounded-xl p-6 text-center">
            <p class="text-sm text-surface-400 mb-1">💵 Ahorro 25 años</p>
            <p class="text-2xl font-bold text-secondary-500">
              {{ facade.financial()?.twentyFiveYearSavings | currencyUsd }}
            </p>
            <p class="text-xs text-surface-500 mt-1">
              ≈ Bs {{ (facade.financial()?.twentyFiveYearSavings ?? 0) * (facade.result()?.exchangeRate?.rate ?? 6.96) | number:'1.0-0' }}
            </p>
          </div>
        </div>

        <!-- System Sizing -->
        <bytex-card title="☀️ Dimensionamiento del sistema" class="mb-8">
          <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div class="text-center">
              <p class="text-2xl font-bold text-white">{{ facade.sizing()?.panelCount | number }}</p>
              <p class="text-xs text-surface-400">Paneles solares</p>
            </div>
            <div class="text-center">
              <p class="text-2xl font-bold text-white">{{ facade.sizing()?.peakPowerKw | number:'1.0-1' }} kW</p>
              <p class="text-xs text-surface-400">Potencia pico</p>
            </div>
            <div class="text-center">
              <p class="text-2xl font-bold text-white">{{ facade.sizing()?.inverterPowerKw | number }} kW</p>
              <p class="text-xs text-surface-400">Inversor</p>
            </div>
            <div class="text-center">
              <p class="text-2xl font-bold text-white">{{ facade.sizing()?.batteryCount | number }}</p>
              <p class="text-xs text-surface-400">Baterías ({{ facade.sizing()?.batteryModuleKwh | number }}kWh c/u)</p>
            </div>
            <div class="text-center">
              <p class="text-2xl font-bold text-white">{{ facade.sizing()?.mpptCount | number }}×{{ facade.sizing()?.mpptUnitKw | number }}kW</p>
              <p class="text-xs text-surface-400">MPPT</p>
            </div>
            <div class="text-center">
              <p class="text-2xl font-bold text-white">{{ facade.sizing()?.areaM2 | number }} m²</p>
              <p class="text-xs text-surface-400">Área requerida</p>
            </div>
            <div class="text-center">
              <p class="text-2xl font-bold text-white">{{ facade.financial()?.lcoe | currencyUsd }}/kWh</p>
              <p class="text-xs text-surface-400">LCOE</p>
            </div>
            <div class="text-center">
              <p class="text-2xl font-bold text-white">{{ facade.sizing()?.dailyGenerationKwh | number:'1.0-0' }} kWh</p>
              <p class="text-xs text-surface-400">Generación diaria</p>
            </div>
            <div class="text-center">
              <p class="text-2xl font-bold text-white">{{ facade.sizing()?.batteryKwh | number:'1.0-0' }} kWh</p>
              <p class="text-xs text-surface-400">Capacidad baterías</p>
            </div>
          </div>
        </bytex-card>

        <!-- Panel Info -->
        @if (facade.selectedPanel(); as panel) {
          <bytex-card title="🏆 Panel recomendado" subtitle="Podés cambiarlo en el detalle" class="mb-8">
            <div class="flex items-center gap-4">
              <div class="flex-1">
                <p class="font-semibold text-white">{{ panel.brand }} {{ panel.model }}</p>
                <div class="flex items-center gap-2 mt-1">
                  <span [class]="'tech-' + panel.technology.toLowerCase()">{{ panel.technology }}</span>
                  <span class="text-sm text-surface-400">{{ panel.wattPeak }}W</span>
                  <span class="text-sm text-surface-400">•</span>
                  <span class="text-sm text-surface-400">{{ panel.efficiency }}%</span>
                  <span class="text-sm text-surface-400">•</span>
                  <span class="text-sm text-surface-400">{{ panel.wattPerM2 }} W/m²</span>
                </div>
              </div>
              <div class="text-right">
                <p class="text-lg font-bold text-primary-500">{{ panel.priceLandedScz | currencyUsd }}</p>
                <p class="text-xs text-surface-400">c/u landed SCZ</p>
              </div>
            </div>
          </bytex-card>
        }

        <!-- Environmental Impact -->
        @if (facade.environmental(); as env) {
          <bytex-card title="🌱 Impacto ambiental" class="mb-8">
            <div class="grid grid-cols-3 gap-4 text-center">
              <div>
                <p class="text-2xl font-bold text-green-400">{{ env.co2AvoidedTons | number:'1.0-0' }}</p>
                <p class="text-xs text-surface-400">t CO₂ evitadas/año</p>
              </div>
              <div>
                <p class="text-2xl font-bold text-green-400">{{ env.treeEquivalent | number:'1.0-0' }}</p>
                <p class="text-xs text-surface-400">Árboles equivalentes</p>
              </div>
              <div>
                <p class="text-2xl font-bold text-green-400">{{ (env.waterSavedLiters / 1000000) | number:'1.0-1' }}M</p>
                <p class="text-xs text-surface-400">Litros de agua ahorrados</p>
              </div>
            </div>
          </bytex-card>
        }

        <!-- 📈 Proyección 25 años -->
      @if (facade.financial()?.yearlyBreakdown?.length) {
        <bytex-card title="📈 Proyección 25 años" subtitle="Cruce entre costo acumulado de CRE vs inversión solar" class="mb-8">
          <div class="h-[300px]">
            <bytex-projection-chart
              [yearlyData]="facade.financial()!.yearlyBreakdown!"
              [exchangeRate]="facade.result()?.exchangeRate?.rate ?? 9.96"
            />
          </div>
        </bytex-card>
      }

      <!-- 📊 Escenarios -->
      @if (facade.result()?.scenarios?.length) {
        <bytex-card title="📊 Escenarios según aumento de CRE" class="mb-8">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            @for (s of facade.result()!.scenarios!; track s.label) {
              <div class="bg-surface-900/50 border border-surface-700 rounded-xl p-4 text-center" [class]="s.label === 'Base' ? 'ring-2 ring-primary-500' : ''">
                <p class="text-sm font-semibold text-white mb-1">
                  {{ s.label }}
                  @if (s.label === 'Base') { <span class="text-primary-500">✓</span> }
                </p>
                <p class="text-xs text-surface-400 mb-3">+{{ s.creIncrease }}% anual</p>
                <div class="space-y-2">
                  <div>
                    <p class="text-xs text-surface-500">Payback</p>
                    <p class="text-lg font-bold text-white">{{ s.paybackYears | number:'1.0-1' }} años</p>
                  </div>
                  <div>
                    <p class="text-xs text-surface-500">TIR</p>
                    <p class="text-lg font-bold" [class]="s.irr > 0 ? 'text-green-400' : 'text-red-400'">{{ s.irr | number:'1.0-1' }}%</p>
                  </div>
                  <div>
                    <p class="text-xs text-surface-500">Ahorro 25 años</p>
                    <p class="text-lg font-bold text-secondary-500">{{ s.saving25Years | currencyUsd }}</p>
                  </div>
                </div>
              </div>
            }
          </div>
        </bytex-card>
      }

      <!-- Actions -->
        <div class="flex justify-center gap-4 flex-wrap">
          @if (!facade.isSaved()) {
            <bytex-button
              variant="primary"
              size="lg"
              [loading]="facade.isSaving()"
              (clicked)="onSave()"
            >
              💾 Guardar simulación
            </bytex-button>
          } @else {
            <bytex-button variant="secondary" size="lg" [disabled]="true">
              ✅ Guardada
            </bytex-button>
          }
          <bytex-button variant="secondary" size="lg" (clicked)="onViewDetail()">
            🔧 Ver detalle técnico
          </bytex-button>
          <bytex-button variant="ghost" size="lg" (clicked)="onNewSimulation()">
            🔄 Nueva simulación
          </bytex-button>
        </div>

        @if (!authFacade.isAuthenticated()) {
          <p class="mt-4 text-center text-sm text-surface-500">
            Iniciá sesión para guardar tus simulaciones
            <a routerLink="/login" class="text-primary-500 hover:underline ml-1">Ingresar</a>
          </p>
        }
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResultsPage {
  protected facade = inject(SimulatorFacade);
  protected authFacade = inject(AuthFacade);
  private router = inject(Router);

  constructor() {
    if (!this.facade.result()) {
      this.router.navigate(['/simulador/tipo']);
    }
  }

  onSave(): void {
    if (!this.authFacade.isAuthenticated()) {
      this.router.navigate(['/login'], {
        queryParams: { redirect: this.router.url }
      });
      return;
    }
    this.facade.saveSimulation();
  }

  onViewDetail(): void {
    this.router.navigate(['/simulador/detalle']);
  }

  onNewSimulation(): void {
    this.facade.reset();
    this.router.navigate(['/simulador/tipo']);
  }
}
