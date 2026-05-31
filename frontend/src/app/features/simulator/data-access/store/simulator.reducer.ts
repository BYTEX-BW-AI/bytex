import { createReducer, on } from '@ngrx/store';
import { SimulatorActions } from './simulator.actions';
import { SimulatorState, initialSimulatorState } from '../models/simulation-state.model';

export const simulatorReducer = createReducer(
  initialSimulatorState,

  // Step management
  on(SimulatorActions.nextStep, (state): SimulatorState => ({
    ...state,
    currentStep: Math.min(state.currentStep + 1, 5),
  })),
  on(SimulatorActions.previousStep, (state): SimulatorState => ({
    ...state,
    currentStep: Math.max(state.currentStep - 1, 1),
  })),
  on(SimulatorActions.goToStep, (state, { step }): SimulatorState => ({
    ...state,
    currentStep: step,
  })),

  // Simulation type — reiniciar todo para nueva simulación
  on(SimulatorActions.setSimulationType, (state, { simulationType }): SimulatorState => ({
    ...state,
    simulationType,
    // Limpiar datos de la simulación anterior
    billData: null,
    billImageBase64: null,
    extractingBill: false,
    extractionError: null,
    selectedSector: null,
    selectedZone: null,
    estimatedConsumption: null,
    result: null,
    sizing: null,
    financial: null,
    costs: [],
    environmental: null,
    calculating: false,
    calculationError: null,
    saved: false,
  })),

  // Bill upload
  on(SimulatorActions.uploadBill, (state): SimulatorState => ({
    ...state,
    extractingBill: true,
    extractionError: null,
  })),
  on(SimulatorActions.uploadBillSuccess, (state, { base64 }): SimulatorState => ({
    ...state,
    billImageBase64: base64,
    extractingBill: true,
  })),
  on(SimulatorActions.uploadBillFailure, (state, { error }): SimulatorState => ({
    ...state,
    extractingBill: false,
    extractionError: error,
  })),

  // Manual bill data input — limpiar resultados anteriores
  on(SimulatorActions.setManualBillData, (state, { data }): SimulatorState => ({
    ...state,
    billData: data,
    extractingBill: false,
    extractionError: null,
    result: null,
    sizing: null,
    financial: null,
    costs: [],
    environmental: null,
    saved: false,
  })),

  // Gemini extraction — limpiar resultados anteriores
  on(SimulatorActions.extractBill, (state): SimulatorState => ({
    ...state,
    extractingBill: true,
    extractionError: null,
    // Datos anteriores ya no sirven para la nueva factura
    result: null,
    sizing: null,
    financial: null,
    costs: [],
    environmental: null,
    saved: false,
  })),
  on(SimulatorActions.extractBillSuccess, (state, { data }): SimulatorState => ({
    ...state,
    billData: data,
    extractingBill: false,
    extractionError: null,
  })),
  on(SimulatorActions.extractBillFailure, (state, { error }): SimulatorState => ({
    ...state,
    extractingBill: false,
    extractionError: error,
  })),

  // Sector & zone
  on(SimulatorActions.selectSector, (state, { sectorId }): SimulatorState => ({
    ...state,
    selectedSector: sectorId,
  })),
  on(SimulatorActions.selectZone, (state, { zoneId, lat, lng }): SimulatorState => ({
    ...state,
    selectedZone: zoneId,
    location: { lat, lng },
  })),
  on(SimulatorActions.setEstimatedConsumption, (state, { consumption }): SimulatorState => ({
    ...state,
    estimatedConsumption: consumption,
    result: null,
    sizing: null,
    financial: null,
    costs: [],
    environmental: null,
    saved: false,
  })),

  // Solar data
  on(SimulatorActions.getSolarData, (state): SimulatorState => ({
    ...state,
    solarDataLoading: true,
    solarDataError: null,
  })),
  on(SimulatorActions.getSolarDataSuccess, (state, { irradiance }): SimulatorState => ({
    ...state,
    irradiance,
    solarDataLoading: false,
  })),
  on(SimulatorActions.getSolarDataFailure, (state, { error }): SimulatorState => ({
    ...state,
    solarDataLoading: false,
    solarDataError: error,
  })),

  // Panel selection
  on(SimulatorActions.selectPanel, (state, { panel }): SimulatorState => ({
    ...state,
    selectedPanel: panel,
  })),
  on(SimulatorActions.loadPanelsSuccess, (state, { panels }): SimulatorState => ({
    ...state,
    availablePanels: panels,
  })),

  // Calculation
  on(SimulatorActions.calculate, (state): SimulatorState => ({
    ...state,
    calculating: true,
    calculationError: null,
  })),
  on(SimulatorActions.calculateSuccess, (state, { result }): SimulatorState => ({
    ...state,
    result,
    sizing: result.sizing,
    financial: result.financial,
    costs: result.costs,
    environmental: result.environmental,
    calculating: false,
    currentStep: 4,
  })),
  on(SimulatorActions.calculateFailure, (state, { error }): SimulatorState => ({
    ...state,
    calculating: false,
    calculationError: error,
  })),

  // Save
  on(SimulatorActions.saveSimulation, (state): SimulatorState => ({
    ...state,
    saving: true,
    saveError: null,
  })),
  on(SimulatorActions.saveSimulationSuccess, (state): SimulatorState => ({
    ...state,
    saving: false,
    saved: true,
  })),
  on(SimulatorActions.saveSimulationFailure, (state, { error }): SimulatorState => ({
    ...state,
    saving: false,
    saveError: error,
  })),

  // Reset
  on(SimulatorActions.resetSimulation, (): SimulatorState => ({
    ...initialSimulatorState,
  }))
);
