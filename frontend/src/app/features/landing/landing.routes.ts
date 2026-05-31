import { Routes } from '@angular/router';

export const landingRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/landing-hub.page').then(m => m.LandingHubPage),
  },
];
