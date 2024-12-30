import { Routes } from '@angular/router';
import { LayoutComponent } from './components/layout/layout.component';

export const routes: Routes = [
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
        loadChildren: () =>
          import('../boards/pages/boards/boards.component').then(
            (m) => m.BoardsComponent
          ),
      },
      {
        path: 'profile',
        loadChildren: () =>
          import('../profile/pages/profile/profile.component').then(
            (m) => m.ProfileComponent
          ),
      },
      {
        path: 'users',
        loadChildren: () =>
          import('../users/pages/users-table/users-table.component').then(
            (m) => m.UsersTableComponent
          ),
      },
    ],
  },
];
