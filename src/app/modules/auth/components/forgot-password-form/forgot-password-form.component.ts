import { Component } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { BtnComponent } from '../../../shared/components/btn/btn.component';

@Component({
  selector: 'app-forgot-password-form',
  imports: [ReactiveFormsModule, BtnComponent],
  templateUrl: './forgot-password-form.component.html',
})
export class ForgotPasswordFormComponent {
  form;
  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.nonNullable.group({
      email: ['', [Validators.email, Validators.required]],
    });
  }
  status: string = 'init';
  emailSent = false;
  sendLink() {
    if (this.form.valid) {
      this.status = 'loading';
      const { email } = this.form.getRawValue();
    } else {
      this.form.markAllAsTouched();
    }
  }
}
