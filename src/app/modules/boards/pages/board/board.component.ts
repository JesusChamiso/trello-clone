import { BoardsService } from './../../../../services/boards.service';
import { CardsService } from './../../../../services/cards.service';
import { Component, OnInit } from '@angular/core';
import {
  CdkDrag,
  CdkDragDrop,
  DragDropModule,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { DialogModule, Dialog } from '@angular/cdk/dialog';
import { TodoDialogComponent } from '../../components/todo-dialog/todo-dialog.component';
import { BtnComponent } from '../../../shared/components/btn/btn.component';
import { ActivatedRoute } from '@angular/router';
import { Board } from '../../../../models/boards.model';
import { Card, CreateCardDto } from '../../../../models/card.model';
import { CreateListDto, List } from '../../../../models/list.model';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import {
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ListsService } from '../../../../services/lists.service';

@Component({
  selector: 'app-board',
  imports: [
    DragDropModule,
    CdkDrag,
    DialogModule,
    BtnComponent,
    FaIconComponent,
    ReactiveFormsModule,
  ],
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
  faClose = faClose;
  showListForm = false;

  inputCard = new FormControl<string>('', {
    nonNullable: true,
    validators: [Validators.required],
  });

  inputList = new FormControl<string>('', {
    nonNullable: true,
    validators: [Validators.required],
  });
  constructor(
    private dialog: Dialog,
    private route: ActivatedRoute,
    private boardService: BoardsService,
    private cardService: CardsService,
    private formBuilder: FormBuilder,
    private listService: ListsService
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
    const position = this.boardService.getPosition(
      event.container.data,
      event.currentIndex
    );
    const card = event.container.data[event.currentIndex];
    const listId = event.container.id;
    this.updateCard(card, position, listId);
  }

  addList() {
    const title = this.inputList.value;
    if (this.board) {
      const newPosition = this.boardService.getPositionNewItem(
        this.board.lists
      );
      const newListDto: CreateListDto = {
        title,
        boardId: this.board.id,
        position: newPosition,
      };

      this.listService.create(newListDto).subscribe((createdList): void => {
        const newList: List = { ...createdList, cards: [] };

        this.board?.lists.push({ ...newList });
        this.showListForm = false;
        this.inputList.setValue('');
      });
    }
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

  private updateCard(card: Card, position: number, listId: number | string) {
    this.cardService
      .update(card.id, { position, listId })
      .subscribe((cardUpdate) => {
        // console.log(cardUpdate);
      });
  }

  openFormCard(list: List) {
    if (this.board?.lists) {
      this.board.lists = this.board.lists.map((iteratorList) => {
        if (iteratorList.id === list.id) {
          return {
            ...iteratorList,
            showCardForm: true,
          };
        }
        return {
          ...iteratorList,
          showCardForm: false,
        };
      });
    }
  }

  closeFormCard(list: List) {
    list.showCardForm = false;
  }

  createCard(list: List) {
    const title = this.inputCard.value;
    if (this.board) {
      this.cardService
        .create({
          title,
          listId: list.id,
          boardId: this.board.id,
          position: this.boardService.getPositionNewItem(list.cards),
        })
        .subscribe((card) => {
          list.cards.push(card);
          this.inputCard.setValue('');
          this.closeFormCard(list);
        });
    }
  }
}
