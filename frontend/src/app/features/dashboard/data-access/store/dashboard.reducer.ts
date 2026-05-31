import { createReducer, on } from '@ngrx/store';
import { DashboardActions } from './dashboard.actions';
import { SimulationResult } from '../../../simulator/data-access/models/simulation.model';

export interface DashboardState {
  simulations: SimulationResult[];
  selectedSimulation: SimulationResult | null;
  cursor: string | null;
  hasMore: boolean;
  loading: boolean;
  error: string | null;
  detailLoading: boolean;
}

const initialState: DashboardState = {
  simulations: [],
  selectedSimulation: null,
  cursor: null,
  hasMore: true,
  loading: false,
  error: null,
  detailLoading: false,
};

export const dashboardReducer = createReducer(
  initialState,
  on(DashboardActions.loadSimulations, (state): DashboardState => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(DashboardActions.loadSimulationsSuccess, (state, { items, cursor, hasMore }): DashboardState => ({
    ...state,
    simulations: [...state.simulations, ...items],
    cursor,
    hasMore,
    loading: false,
  })),
  on(DashboardActions.loadSimulationsFailure, (state, { error }): DashboardState => ({
    ...state,
    loading: false,
    error,
  })),
  on(DashboardActions.deleteSimulationSuccess, (state, { id }): DashboardState => ({
    ...state,
    simulations: state.simulations.filter(s => s.id !== id),
  })),
  on(DashboardActions.loadSimulationDetail, (state): DashboardState => ({
    ...state,
    detailLoading: true,
  })),
  on(DashboardActions.loadSimulationDetailSuccess, (state, { simulation }): DashboardState => ({
    ...state,
    selectedSimulation: simulation,
    detailLoading: false,
  })),
  on(DashboardActions.clearDetail, (state): DashboardState => ({
    ...state,
    selectedSimulation: null,
  }))
);
