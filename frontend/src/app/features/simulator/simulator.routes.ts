import { Routes } from '@angular/router';
import { provideState } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { simulatorReducer } from './data-access/store/simulator.reducer';
import { SimulatorEffects } from './data-access/store/simulator.effects';

export const simulatorRoutes: Routes = [
  {
    path: '',
    providers: [
      provideState('simulator', simulatorReducer),
      provideEffects(SimulatorEffects),
    ],
    children: [
      {
        path: 'tipo',
        loadComponent: () => import('./pages/select-type.page').then(m => m.SelectTypePage),
      },
      {
        path: 'entrada',
        loadComponent: () => import('./pages/input.page').then(m => m.InputPage),
      },
      {
        path: 'procesando',
        loadComponent: () => import('./pages/processing.page').then(m => m.ProcessingPage),
      },
      {
        path: 'resultados',
        loadComponent: () => import('./pages/results.page').then(m => m.ResultsPage),
      },
      {
        path: 'detalle',
        loadComponent: () => import('./pages/detail.page').then(m => m.DetailPage),
      },
      {
        path: '',
        redirectTo: 'tipo',
        pathMatch: 'full',
      },
    ],
  },
];
