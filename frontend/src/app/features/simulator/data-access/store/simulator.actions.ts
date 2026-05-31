import { createActionGroup, props, emptyProps } from '@ngrx/store';
import { ExtractedBillData, PanelOption, SimulationResult, SimulationType } from '../models/simulation.model';

export const SimulatorActions = createActionGroup({
  source: 'Simulator',
  events: {
    // Step management
    'Next Step': emptyProps(),
    'Previous Step': emptyProps(),
    'Go To Step': props<{ step: number }>(),

    // Simulation type
    'Set Simulation Type': props<{ simulationType: SimulationType }>(),

    // Bill upload
    'Upload Bill': props<{ file: File }>(),
    'Upload Bill Success': props<{ base64: string }>(),
    'Upload Bill Failure': props<{ error: string }>(),

    // Manual bill data input
    'Set Manual Bill Data': props<{ data: ExtractedBillData }>(),

    // Gemini extraction
    'Extract Bill': props<{ base64: string }>(),
    'Extract Bill Success': props<{ data: ExtractedBillData }>(),
    'Extract Bill Failure': props<{ error: string }>(),

    // Sector & zone
    'Select Sector': props<{ sectorId: string }>(),
    'Select Zone': props<{ zoneId: string; lat: number; lng: number }>(),
    'Set Estimated Consumption': props<{ consumption: number }>(),

    // Solar data
    'Get Solar Data': props<{ lat: number; lng: number }>(),
    'Get Solar Data Success': props<{ irradiance: number }>(),
    'Get Solar Data Failure': props<{ error: string }>(),

    // Panel selection
    'Select Panel': props<{ panel: PanelOption }>(),
    'Load Panels': emptyProps(),
    'Load Panels Success': props<{ panels: PanelOption[] }>(),

    // Calculation
    'Calculate': emptyProps(),
    'Calculate Success': props<{ result: SimulationResult }>(),
    'Calculate Failure': props<{ error: string }>(),

    // Save
    'Save Simulation': emptyProps(),
    'Save Simulation Success': props<{ id: string }>(),
    'Save Simulation Failure': props<{ error: string }>(),

    // Reset
    'Reset Simulation': emptyProps(),
  },
});
