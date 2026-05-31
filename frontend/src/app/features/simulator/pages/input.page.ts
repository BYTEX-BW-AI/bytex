import { Component, inject, ChangeDetectionStrategy, computed } from '@angular/core';
import { Router } from '@angular/router';
import { SimulatorFacade } from '../data-access/services/simulator-facade';
import { FileUploaderComponent } from '../../../shared/components/ui/file-uploader/file-uploader.component';
import { ButtonComponent } from '../../../shared/components/ui/button/button.component';
import { CardComponent } from '../../../shared/components/ui/card/card.component';
import { DecimalPipe } from '@angular/common';
import { BusinessSector, SantaCruzZone, BUSINESS_SECTORS, SANTA_CRUZ_ZONES } from '../../../core/constants/business-sectors.data';
import { APP_ROUTES } from '../../../core/constants/app-routes';

@Component({
  selector: 'bytex-input-page',
  standalone: true,
  imports: [FileUploaderComponent, ButtonComponent, CardComponent, DecimalPipe],
  template: `
    <div class="min-h-[80vh] px-4 py-8">
      <div class="max-w-3xl mx-auto">
        <div class="mb-8">
          <div class="flex items-center gap-2 text-sm text-surface-400 mb-2">
            <span>Paso {{ facade.simulationType() === 'existing' ? '2A' : '2B' }} de 5</span>
          </div>
          <h1 class="text-3xl font-bold text-white">
            @if (facade.simulationType() === 'existing') {
              Subí tu última factura CRE
            } @else {
              ¿Cuál es tu sector?
            }
          </h1>
        </div>

        @if (facade.simulationType() === 'existing') {
          <!-- Upload Bill -->
          <bytex-file-uploader
            (fileSelected)="onFileSelected($event)"
          />

          @if (facade.billData(); as data) {
            <bytex-card title="Datos extraídos" class="mt-6">
              <div class="grid grid-cols-2 gap-4">
                <div>
                  <p class="text-sm text-surface-400">Consumo mensual</p>
                  <p class="text-lg font-semibold text-white">{{ data.consumoKwh | number }} kWh</p>
                </div>
                <div>
                  <p class="text-sm text-surface-400">Potencia máxima</p>
                  <p class="text-lg font-semibold text-white">{{ data.potenciaMaximaKw }} kW</p>
                </div>
                <div>
                  <p class="text-sm text-surface-400">Costo mensual</p>
                  <p class="text-lg font-semibold text-white">Bs {{ data.costoTotalBs | number }}</p>
                </div>
                <div>
                  <p class="text-sm text-surface-400">Período</p>
                  <p class="text-lg font-semibold text-white">{{ data.periodoFacturacion }}</p>
                </div>
              </div>
            </bytex-card>

            <div class="mt-6 flex justify-center">
              <bytex-button variant="primary" size="lg" (clicked)="onContinue()">
                Calcular mi microred
              </bytex-button>
            </div>
          }
        } @else {
          <!-- Select Sector -->
          <p class="text-surface-400 mb-6">Seleccioná tu rubro y zona para estimar tu consumo</p>

          @if (!facade.selectedSector()) {
            <div class="grid grid-cols-2 md:grid-cols-5 gap-3">
              @for (sector of sectors; track sector.id) {
                <button
                  class="flex flex-col items-center gap-2 p-4 bg-surface-800 border border-surface-700 rounded-xl hover:border-primary-500 transition-all"
                  (click)="onSelectSector(sector)"
                >
                  <span class="text-3xl">{{ sector.icon }}</span>
                  <span class="text-xs text-surface-300 text-center">{{ sector.name }}</span>
                </button>
              }
            </div>
          }

          @if (facade.selectedSector() && !facade.selectedZone()) {
            <div class="mt-6">
              <h3 class="text-lg font-semibold text-white mb-4">📍 ¿En qué zona de Santa Cruz?</h3>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                @for (zone of zones; track zone.id) {
                  <button
                    class="flex items-center gap-3 p-4 bg-surface-800 border border-surface-700 rounded-xl hover:border-secondary-500 transition-all text-left"
                    (click)="onSelectZone(zone)"
                  >
                    <span class="text-xl">📍</span>
                    <div>
                      <p class="text-sm font-medium text-white">{{ zone.name }}</p>
                      <p class="text-xs text-surface-400">{{ zone.description }}</p>
                    </div>
                  </button>
                }
              </div>
            </div>
          }

          @if (facade.estimatedConsumption()) {
            <bytex-card title="Consumo estimado" class="mt-6">
              <div class="text-center">
                <p class="text-sm text-surface-400 mb-1">Consumo mensual estimado</p>
                <p class="text-3xl font-bold text-white">{{ facade.estimatedConsumption() | number }} kWh</p>
                <p class="text-sm text-surface-500 mt-2">Basado en datos del INE Bolivia</p>
              </div>
            </bytex-card>

            <div class="mt-6 flex justify-center">
              <bytex-button variant="primary" size="lg" (clicked)="onContinue()">
                Calcular mi microred
              </bytex-button>
            </div>
          }
        }
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputPage {
  protected facade = inject(SimulatorFacade);
  private router = inject(Router);
  protected sectors = BUSINESS_SECTORS;
  protected zones = SANTA_CRUZ_ZONES;

  onFileSelected(file: File): void {
    this.facade.uploadBill(file);
    // Convert to base64 and extract
    const reader = new FileReader();
    reader.onload = (e) => {
      const base64 = e.target?.result as string;
      this.facade.extractBill(base64);
    };
    reader.readAsDataURL(file);
  }

  onSelectSector(sector: BusinessSector): void {
    this.facade.selectSector(sector.id);
    this.facade.setEstimatedConsumption(sector.avgConsumptionKwh);
  }

  onSelectZone(zone: SantaCruzZone): void {
    this.facade.selectZone(zone.id, zone.lat, zone.lng);
    this.facade.getSolarData(zone.lat, zone.lng);
  }

  onContinue(): void {
    this.facade.calculate();
    this.router.navigate([APP_ROUTES.SIMULATOR.PROCESSING]);
  }
}
