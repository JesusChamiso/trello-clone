import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () =>
      import('./modules/auth/auth-routing.module').then((m) => m.authRoutes),
  },
  {
    path: 'app',
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
