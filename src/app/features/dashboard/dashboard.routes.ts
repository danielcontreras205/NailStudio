import { Routes } from '@angular/router';

import { authGuard } from '../../core/guards/auth.guard';
import { MainLayoutComponent } from '../../layout/main-layout/main-layout.component';

export const DASHBOARD_ROUTES: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [authGuard],
    children: [
      {
        path: '',
        pathMatch: 'full',
        loadComponent: () => import('./pages/dashboard/dashboard.component').then(m => m.DashboardComponent)
      }
    ]
  }
];
