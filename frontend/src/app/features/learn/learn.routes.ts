import { Routes } from '@angular/router';

export const learnRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/learn-home.page').then(m => m.LearnHomePage),
  },
  {
    path: 'paneles',
    loadComponent: () => import('./pages/panel-guide.page').then(m => m.PanelGuidePage),
  },
  {
    path: 'regulacion',
    loadComponent: () => import('./pages/regulation.page').then(m => m.RegulationPage),
  },
];
