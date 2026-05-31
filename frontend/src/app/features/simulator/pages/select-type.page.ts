import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { SimulatorFacade } from '../data-access/services/simulator-facade';
import { ButtonComponent } from '../../../shared/components/ui/button/button.component';
import { APP_ROUTES } from '../../../core/constants/app-routes';

@Component({
  selector: 'bytex-select-type',
  standalone: true,
  imports: [ButtonComponent],
  template: `
    <div class="min-h-[80vh] flex items-center justify-center px-4">
      <div class="max-w-3xl w-full">
        <div class="text-center mb-12">
          <h1 class="text-4xl font-bold text-white mb-3">¿Tu empresa ya existe o estás empezando?</h1>
          <p class="text-surface-400 text-lg">Elegí cómo querés calcular tu ahorro energético</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- Existing business -->
          <button
            class="group bg-surface-800 border-2 border-surface-700 hover:border-primary-500 rounded-xl p-8 text-left transition-all duration-200 hover:shadow-xl hover:shadow-primary-500/10"
            (click)="onExistingBusiness()"
          >
            <span class="text-4xl block mb-4">📋</span>
            <h2 class="text-xl font-bold text-white mb-2">Ya tengo factura CRE</h2>
            <p class="text-surface-400 text-sm leading-relaxed">
              Subí tu última factura de CRE y calculamos tu ahorro real con datos extraídos por IA.
              Sin formularios manuales.
            </p>
            <div class="mt-4 flex items-center text-primary-500 text-sm font-medium group-hover:gap-2 transition-all">
              <span>Subir factura</span>
              <span class="ml-1">→</span>
            </div>
          </button>

          <!-- New business -->
          <button
            class="group bg-surface-800 border-2 border-surface-700 hover:border-secondary-500 rounded-xl p-8 text-left transition-all duration-200 hover:shadow-xl hover:shadow-secondary-500/10"
            (click)="onNewBusiness()"
          >
            <span class="text-4xl block mb-4">💡</span>
            <h2 class="text-xl font-bold text-white mb-2">Estoy empezando</h2>
            <p class="text-surface-400 text-sm leading-relaxed">
              Elegí tu rubro y zona. Te estimamos el consumo según datos del INE Bolivia y calculamos tu microred ideal.
            </p>
            <div class="mt-4 flex items-center text-secondary-500 text-sm font-medium group-hover:gap-2 transition-all">
              <span>Seleccionar rubro</span>
              <span class="ml-1">→</span>
            </div>
          </button>
        </div>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectTypePage {
  private facade = inject(SimulatorFacade);
  private router = inject(Router);

  onExistingBusiness(): void {
    this.facade.setSimulationType('existing');
    this.router.navigate([APP_ROUTES.SIMULATOR.INPUT]);
  }

  onNewBusiness(): void {
    this.facade.setSimulationType('new');
    this.router.navigate([APP_ROUTES.SIMULATOR.INPUT]);
  }
}
