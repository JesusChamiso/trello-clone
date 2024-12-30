import { Routes, RouterModule } from '@angular/router';
import { authRoutes } from './modules/auth/auth-routing.module';
import { boardsRoute } from './modules/boards/boards-routing.module';

export const routes: Routes = [
  {
    path: 'auth',
    children: authRoutes,
  },
  {
    path: 'app',
    children: boardsRoute,
  },
  {
    path: '**',
    redirectTo: 'auth/login',
  },
];
