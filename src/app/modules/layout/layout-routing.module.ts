import { Routes } from '@angular/router';
import { LayoutComponent } from './components/layout/layout.component';
import { authGuard } from '../../guards/auth.guard';

export const layoutRoutes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'boards',
        pathMatch: 'full',
      },
      {
        path: 'boards',
        canActivate: [authGuard],
        loadChildren: () =>
          import('../boards/boards-routing.module').then((m) => m.boardsRoute),
      },
      {
        path: 'profile',
        canActivate: [authGuard],
        loadChildren: () =>
          import('../profile/profile-routing.module').then(
            (m) => m.profileRoute
          ),
      },
      {
        path: 'users',
        canActivate: [authGuard],
        loadChildren: () =>
          import('../users/users-routing.module').then((m) => m.UserRoutes),
      },
    ],
  },
];
