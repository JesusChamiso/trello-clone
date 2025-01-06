import { Component, EventEmitter, Output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { BtnComponent } from '../../../shared/components/btn/btn.component';
import { BoardsService } from '../../../../services/boards.service';
import { Colors, COLORS } from '../../../../models/colors.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-board-form',
  imports: [ReactiveFormsModule, BtnComponent],
  templateUrl: './board-form.component.html',
})
export class BoardFormComponent {
  form;
  @Output() closeOverlay = new EventEmitter<boolean>();
  constructor(
    private formBuilder: FormBuilder,
    private boardService: BoardsService,
    private router: Router
  ) {
    this.form = this.formBuilder.nonNullable.group({
      title: ['', [Validators.required]],
      backgroundColor: new FormControl<Colors>('sky', {
        nonNullable: true,
        validators: [Validators.required],
      }),
    });
  }

  doSave() {
    if (this.form.valid) {
      const { title, backgroundColor } = this.form.getRawValue();
      this.boardService
        .createBoard(title, backgroundColor)
        .subscribe((board) => {
          this.router.navigate(['app/boards', board.id]);
          this.closeOverlay.next(false);
        });
    } else {
      this.form.markAllAsTouched();
    }
  }
}
