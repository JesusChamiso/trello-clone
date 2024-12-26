import { DialogRef } from '@angular/cdk/dialog';
import { Component } from '@angular/core';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { BtnComponent } from '../btn/btn.component';
import {
  faCheckSquare,
  faClock,
  faTag,
  faUser,
  faClose,
  faCheckToSlot,
  faBars,
} from '@fortawesome/free-solid-svg-icons';

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

  constructor(private dialogref: DialogRef) {}
  closeDialog() {
    this.dialogref.close();
  }
}
