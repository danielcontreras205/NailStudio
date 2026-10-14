import { Routes } from '@angular/router';

import { authGuard } from '../../core/guards/auth.guard';
import { AuthLayoutComponent } from '../../layout/auth-layout/auth-layout.component';

export const AUTH_ROUTES: Routes = [
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      {
        path: 'login',
        loadComponent: () => import('./pages/login/login.component').then(m => m.LoginComponent)
      },
      {
        path: 'workspace',
        canActivate: [authGuard],
        loadComponent: () => import('./pages/workspace/workspace.component').then(m => m.WorkspaceComponent)
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'login'
      }
    ]
  }
];
