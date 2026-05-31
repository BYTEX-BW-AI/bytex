import { Routes } from '@angular/router';
import { ShellComponent } from './shell.component';

export const shellRoutes: Routes = [
  {
    path: '',
    component: ShellComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('../features/landing/landing.routes').then(m => m.landingRoutes),
      },
      {
        path: 'simulador',
        loadChildren: () => import('../features/simulator/simulator.routes').then(m => m.simulatorRoutes),
      },
      {
        path: 'dashboard',
        loadChildren: () => import('../features/dashboard/dashboard.routes').then(m => m.dashboardRoutes),
      },
      {
        path: 'aprender',
        loadChildren: () => import('../features/learn/learn.routes').then(m => m.learnRoutes),
      },
      {
        path: 'login',
        loadChildren: () => import('../features/auth/auth.routes').then(m => m.authRoutes),
      },
    ],
  },
];
