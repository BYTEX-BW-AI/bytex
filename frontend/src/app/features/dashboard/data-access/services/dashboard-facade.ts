import { Injectable, inject } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { toSignal } from '@angular/core/rxjs-interop';
import { DashboardActions } from '../store/dashboard.actions';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { DashboardState } from '../store/dashboard.reducer';
import { SimulationResult } from '../../../simulator/data-access/models/simulation.model';

const selectDashboardState = createFeatureSelector<DashboardState>('dashboard');
const selectSimulations = createSelector(selectDashboardState, s => s.simulations);
const selectLoading = createSelector(selectDashboardState, s => s.loading);
const selectHasMore = createSelector(selectDashboardState, s => s.hasMore);
const selectSelectedSimulation = createSelector(selectDashboardState, s => s.selectedSimulation);

@Injectable({ providedIn: 'root' })
export class DashboardFacade {
  private store = inject(Store);

  simulations = toSignal(this.store.pipe(select(selectSimulations)), { initialValue: [] });
  loading = toSignal(this.store.pipe(select(selectLoading)), { initialValue: false });
  hasMore = toSignal(this.store.pipe(select(selectHasMore)), { initialValue: true });
  selectedSimulation = toSignal(this.store.pipe(select(selectSelectedSimulation)), { initialValue: null });

  loadSimulations(cursor?: string): void {
    this.store.dispatch(DashboardActions.loadSimulations({ cursor }));
  }

  deleteSimulation(id: string): void {
    this.store.dispatch(DashboardActions.deleteSimulation({ id }));
  }

  loadDetail(id: string): void {
    this.store.dispatch(DashboardActions.loadSimulationDetail({ id }));
  }

  clearDetail(): void {
    this.store.dispatch(DashboardActions.clearDetail());
  }
}
