import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CustomValidators } from '../../../../utils/validators';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { BtnComponent } from '../../../shared/components/btn/btn.component';

@Component({
  selector: 'app-recovery-form',
  imports: [ReactiveFormsModule, FaIconComponent, BtnComponent],
  templateUrl: './recovery-form.component.html',
})
export class RecoveryFormComponent {
  form;
  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.nonNullable.group(
      {
        newPassword: ['', [Validators.required, Validators.minLength(8)]],
        confirmPassword: ['', [Validators.required]],
      },
      {
        validators: [
          CustomValidators.MatchValidator('newPasseord', 'confirmPasseord'),
        ],
      }
    );
  }
  status: string = 'init';
  faEye = faEye;
  faEyeSlash = faEyeSlash;
  showPassword = false;

  recovery() {
    if (this.form.valid) {
      //TODO
    } else {
      this.form.markAllAsTouched();
    }
  }
}
