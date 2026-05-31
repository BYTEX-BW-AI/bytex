import { createActionGroup, props, emptyProps } from '@ngrx/store';
import { SimulationResult } from '../../../simulator/data-access/models/simulation.model';

export const DashboardActions = createActionGroup({
  source: 'Dashboard',
  events: {
    'Load Simulations': props<{ cursor?: string }>(),
    'Load Simulations Success': props<{ items: SimulationResult[]; cursor: string | null; hasMore: boolean }>(),
    'Load Simulations Failure': props<{ error: string }>(),
    'Delete Simulation': props<{ id: string }>(),
    'Delete Simulation Success': props<{ id: string }>(),
    'Delete Simulation Failure': props<{ error: string }>(),
    'Load Simulation Detail': props<{ id: string }>(),
    'Load Simulation Detail Success': props<{ simulation: SimulationResult }>(),
    'Clear Detail': emptyProps(),
  },
});
