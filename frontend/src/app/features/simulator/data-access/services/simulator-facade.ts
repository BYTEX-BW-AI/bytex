import { Injectable, inject, Signal } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { toSignal } from '@angular/core/rxjs-interop';
import { SimulatorActions } from '../store/simulator.actions';
import * as selectors from '../store/simulator.selectors';
import { ExtractedBillData, PanelOption, SimulationResult, SimulationType } from '../models/simulation.model';

@Injectable({ providedIn: 'root' })
export class SimulatorFacade {
  private store = inject(Store);

  // State signals
  currentStep: Signal<number> = toSignal(this.store.pipe(select(selectors.selectCurrentStep)), { initialValue: 1 });
  simulationType: Signal<SimulationType | null> = toSignal(this.store.pipe(select(selectors.selectSimulationType)), { initialValue: null });
  billData: Signal<ExtractedBillData | null> = toSignal(this.store.pipe(select(selectors.selectBillData)), { initialValue: null });
  isExtracting: Signal<boolean> = toSignal(this.store.pipe(select(selectors.selectIsExtracting)), { initialValue: false });
  selectedSector: Signal<string | null> = toSignal(this.store.pipe(select(selectors.selectSelectedSector)), { initialValue: null });
  selectedZone: Signal<string | null> = toSignal(this.store.pipe(select(selectors.selectSelectedZone)), { initialValue: null });
  estimatedConsumption: Signal<number | null> = toSignal(this.store.pipe(select(selectors.selectEstimatedConsumption)), { initialValue: null });
  irradiance: Signal<number | null> = toSignal(this.store.pipe(select(selectors.selectIrradiance)), { initialValue: null });
  availablePanels: Signal<PanelOption[]> = toSignal(this.store.pipe(select(selectors.selectAvailablePanels)), { initialValue: [] });
  selectedPanel: Signal<PanelOption | null> = toSignal(this.store.pipe(select(selectors.selectSelectedPanel)), { initialValue: null });
  isCalculating: Signal<boolean> = toSignal(this.store.pipe(select(selectors.selectIsCalculating)), { initialValue: false });
  sizing = toSignal(this.store.pipe(select(selectors.selectSizing)), { initialValue: null });
  financial = toSignal(this.store.pipe(select(selectors.selectFinancial)), { initialValue: null });
  costBreakdown = toSignal(this.store.pipe(select(selectors.selectCostBreakdown)), { initialValue: [] });
  environmental = toSignal(this.store.pipe(select(selectors.selectEnvironmental)), { initialValue: null });
  result: Signal<SimulationResult | null> = toSignal(this.store.pipe(select(selectors.selectResult)), { initialValue: null });
  isSaving: Signal<boolean> = toSignal(this.store.pipe(select(selectors.selectIsSaving)), { initialValue: false });
  isSaved: Signal<boolean> = toSignal(this.store.pipe(select(selectors.selectIsSaved)), { initialValue: false });
  calculationError: Signal<string | null> = toSignal(this.store.pipe(select(selectors.selectCalculationError)), { initialValue: null });
  solarDataLoading: Signal<boolean> = toSignal(this.store.pipe(select(selectors.selectSolarDataLoading)), { initialValue: false });
  simulationId: Signal<string | null> = toSignal(this.store.pipe(select(selectors.selectSimulationId)), { initialValue: null });
  conversationHistory: Signal<Array<{ role: string; content: string }>> = toSignal(this.store.pipe(select(selectors.selectConversationHistory)), { initialValue: [] });
  isChattingLoading: Signal<boolean> = toSignal(this.store.pipe(select(selectors.selectIsChattingLoading)), { initialValue: false });
  chatError: Signal<string | null> = toSignal(this.store.pipe(select(selectors.selectChatError)), { initialValue: null });

  // Dispatch methods
  setSimulationType(type: SimulationType): void {
    this.store.dispatch(SimulatorActions.setSimulationType({ simulationType: type }));
  }

  setEstimatedConsumption(consumption: number): void {
    this.store.dispatch(SimulatorActions.setEstimatedConsumption({ consumption }));
  }

  setManualBillData(data: ExtractedBillData): void {
    this.store.dispatch(SimulatorActions.setManualBillData({ data }));
  }

  uploadBill(file: File): void {
    this.store.dispatch(SimulatorActions.uploadBill({ file }));
  }

  extractBill(base64: string): void {
    this.store.dispatch(SimulatorActions.extractBill({ base64 }));
  }

  selectSector(sectorId: string): void {
    this.store.dispatch(SimulatorActions.selectSector({ sectorId }));
  }

  selectZone(zoneId: string, lat: number, lng: number): void {
    this.store.dispatch(SimulatorActions.selectZone({ zoneId, lat, lng }));
  }

  getSolarData(lat: number, lng: number): void {
    this.store.dispatch(SimulatorActions.getSolarData({ lat, lng }));
  }

  selectPanel(panel: PanelOption): void {
    this.store.dispatch(SimulatorActions.selectPanel({ panel }));
  }

  calculate(): void {
    this.store.dispatch(SimulatorActions.calculate());
  }

  saveSimulation(): void {
    this.store.dispatch(SimulatorActions.saveSimulation());
  }

  nextStep(): void {
    this.store.dispatch(SimulatorActions.nextStep());
  }

  previousStep(): void {
    this.store.dispatch(SimulatorActions.previousStep());
  }

  goToStep(step: number): void {
    this.store.dispatch(SimulatorActions.goToStep({ step }));
  }

  reset(): void {
    this.store.dispatch(SimulatorActions.resetSimulation());
  }

  chatAsk(question: string): void {
    const simId = this.simulationId();
    if (!simId) {
      console.warn('No simulation ID available for chat');
      return;
    }
    this.store.dispatch(SimulatorActions.chatAsk({ simulationId: simId, question }));
  }
}
