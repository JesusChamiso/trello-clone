import { Component, OnInit } from '@angular/core';
import {
  CdkDrag,
  CdkDragDrop,
  DragDropModule,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { Column, ToDo } from '../../../../models/todo.model';
import { DialogModule, Dialog } from '@angular/cdk/dialog';
import { TodoDialogComponent } from '../../components/todo-dialog/todo-dialog.component';
import { BtnComponent } from '../../../shared/components/btn/btn.component';
import { ActivatedRoute } from '@angular/router';
import { BoardsService } from '../../../../services/boards.service';
import { Board } from '../../../../models/boards.model';
import { Card } from '../../../../models/card.model';

@Component({
  selector: 'app-board',
  imports: [DragDropModule, CdkDrag, DialogModule, BtnComponent],
  templateUrl: './board.component.html',
  styles: [
    `
      /* Animate items as they're being sorted. */
      .cdk-drop-list-dragging .cdk-drag {
        transition: transform 250ms cubic-bezier(0, 0, 0.2, 1);
      }
      /* Animate an item that has been dropped. */
      .cdk-drag-animating {
        transition: transform 300ms cubic-bezier(0, 0, 0.2, 1);
      }
    `,
  ],
})
export class BoardComponent implements OnInit {
  board: Board | null = null;
  constructor(
    private dialog: Dialog,
    private route: ActivatedRoute,
    private boardService: BoardsService
  ) {}
  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.getBoard(id);
      }
    });
  }

  drop(event: CdkDragDrop<Card[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }

  addColumn() {
    // this.columns.push({ title: `New Column`, todos: [] });
    return true;
  }

  openDialog(card: Card) {
    const dialogRef = this.dialog.open(TodoDialogComponent, {
      minWidth: '400px',
      maxHeight: '50%',
      autoFocus: false,
      data: {
        card: card,
      },
    });
    dialogRef.closed.subscribe((output) => {
      console.log(output);
    });
  }

  private getBoard(id: string) {
    this.boardService.getBoard(id).subscribe((board) => {
      this.board = board;
    });
  }
}
