import { BtnComponent } from './../../../shared/components/btn/btn.component';
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { Component, Inject } from '@angular/core';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import {
  faCheckSquare,
  faClock,
  faTag,
  faUser,
  faClose,
  faCheckToSlot,
  faBars,
} from '@fortawesome/free-solid-svg-icons';
import { Card } from '../../../../models/card.model';

interface InputData {
  card: Card;
}
interface OutputData {
  rta: boolean;
}

@Component({
  selector: 'app-todo-dialog',
  imports: [FaIconComponent, BtnComponent],
  templateUrl: './todo-dialog.component.html',
})
export class TodoDialogComponent {
  faUser = faUser;
  faTag = faTag;
  faCheckSquare = faCheckSquare;
  faClock = faClock;
  faClose = faClose;
  faCheckToSlot = faCheckToSlot;
  faBars = faBars;
  card: Card;

  constructor(
    private dialogref: DialogRef<OutputData>,
    @Inject(DIALOG_DATA) data: InputData
  ) {
    this.card = data.card;
  }
  closeDialog() {
    this.dialogref.close({
      rta: true,
    });
  }

  closeWithRta(rta: boolean) {
    this.dialogref.close({ rta });
  }
}
