import { Routes } from '@angular/router';

export const landingRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/landing.page').then(m => m.LandingPage),
  },
];
