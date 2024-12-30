import { Routes } from '@angular/router';
import { LayoutComponent } from './components/layout/layout.component';

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
        loadComponent: () =>
          import('../boards/pages/boards/boards.component').then(
            (m) => m.BoardsComponent
          ),
      },
      {
        path: 'profile',
        loadComponent: () =>
          import('../profile/pages/profile/profile.component').then(
            (m) => m.ProfileComponent
          ),
      },
      {
        path: 'users',
        loadComponent: () =>
          import('../users/pages/users-table/users-table.component').then(
            (m) => m.UsersTableComponent
          ),
      },
    ],
  },
];
