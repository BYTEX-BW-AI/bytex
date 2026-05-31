import { Routes } from '@angular/router';
import { provideState } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { dashboardReducer } from './data-access/store/dashboard.reducer';
import { DashboardEffects } from './data-access/store/dashboard.effects';

export const dashboardRoutes: Routes = [
  {
    path: '',
    providers: [
      provideState('dashboard', dashboardReducer),
      provideEffects(DashboardEffects),
    ],
    children: [
      {
        path: '',
        loadComponent: () => import('./pages/simulation-list.page').then(m => m.SimulationListPage),
      },
      {
        path: ':id',
        loadComponent: () => import('./pages/simulation-detail.page').then(m => m.SimulationDetailPage),
      },
    ],
  },
];
