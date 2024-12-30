import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { BoardsComponent } from './modules/boards/pages/boards/boards.component';
import { BoardComponent } from './modules/boards/pages/board/board.component';
import { ScrollComponent } from './pages/scroll/scroll.component';
import { TableComponent } from './pages/table/table.component';
import { authRoutes } from './modules/auth/auth-routing.module';
import { boardsRoute } from './modules/boards/boards-routing.module';

export const routes: Routes = [
  // {path: 'loginv1',component: LoginComponent,},{path: 'boards',component: BoardsComponent,},{path: 'board',component: BoardComponent,},{path: 'scroll',component: ScrollComponent,},{path: 'table',component: TableComponent,},
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
