import { Routes } from '@angular/router';
import { BoardsComponent } from './pages/boards/boards.component';
import { BoardComponent } from './pages/board/board.component';

export const boardsRoute: Routes = [
  {
    path: '',
    component: BoardsComponent,
  },
  {
    path: ':id',
    component: BoardComponent,
  },
];
