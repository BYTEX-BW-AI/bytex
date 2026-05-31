import { createFeatureSelector, createSelector } from '@ngrx/store';
import { SimulatorState } from '../models/simulation-state.model';

export const selectSimulatorState = createFeatureSelector<SimulatorState>('simulator');

export const selectCurrentStep = createSelector(
  selectSimulatorState,
  (state) => state.currentStep
);

export const selectSimulationType = createSelector(
  selectSimulatorState,
  (state) => state.simulationType
);

export const selectBillData = createSelector(
  selectSimulatorState,
  (state) => state.billData
);

export const selectIsExtracting = createSelector(
  selectSimulatorState,
  (state) => state.extractingBill
);

export const selectSelectedSector = createSelector(
  selectSimulatorState,
  (state) => state.selectedSector
);

export const selectSelectedZone = createSelector(
  selectSimulatorState,
  (state) => state.selectedZone
);

export const selectEstimatedConsumption = createSelector(
  selectSimulatorState,
  (state) => state.estimatedConsumption
);

export const selectIrradiance = createSelector(
  selectSimulatorState,
  (state) => state.irradiance
);

export const selectAvailablePanels = createSelector(
  selectSimulatorState,
  (state) => state.availablePanels
);

export const selectSelectedPanel = createSelector(
  selectSimulatorState,
  (state) => state.selectedPanel
);

export const selectIsCalculating = createSelector(
  selectSimulatorState,
  (state) => state.calculating
);

export const selectSizing = createSelector(
  selectSimulatorState,
  (state) => state.sizing
);

export const selectFinancial = createSelector(
  selectSimulatorState,
  (state) => state.financial
);

export const selectCostBreakdown = createSelector(
  selectSimulatorState,
  (state) => state.costs
);

export const selectEnvironmental = createSelector(
  selectSimulatorState,
  (state) => state.environmental
);

export const selectResult = createSelector(
  selectSimulatorState,
  (state) => state.result
);

export const selectIsSaving = createSelector(
  selectSimulatorState,
  (state) => state.saving
);

export const selectIsSaved = createSelector(
  selectSimulatorState,
  (state) => state.saved
);

export const selectCalculationError = createSelector(
  selectSimulatorState,
  (state) => state.calculationError
);

export const selectSolarDataLoading = createSelector(
  selectSimulatorState,
  (state) => state.solarDataLoading
);

export const selectSimulationId = createSelector(
  selectSimulatorState,
  (state) => state.simulationId
);

export const selectConversationHistory = createSelector(
  selectSimulatorState,
  (state) => state.conversationHistory
);

export const selectIsChattingLoading = createSelector(
  selectSimulatorState,
  (state) => state.isChattingLoading
);

export const selectChatError = createSelector(
  selectSimulatorState,
  (state) => state.chatError
);
