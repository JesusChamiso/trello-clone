import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';
import { redirectGuard } from './guards/redirect.guard';

export const routes: Routes = [
  {
    path: 'auth',
    canActivate: [redirectGuard],
    loadChildren: () =>
      import('./modules/auth/auth-routing.module').then((m) => m.authRoutes),
  },
  {
    path: 'app',
    canActivate: [authGuard],
    loadChildren: () =>
      import('./modules/layout/layout-routing.module').then(
        (m) => m.layoutRoutes
      ),
  },
  {
    path: '**',
    redirectTo: 'auth/login',
  },
];
