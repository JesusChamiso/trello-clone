import { Component } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { BtnComponent } from '../../../shared/components/btn/btn.component';
import { AuthService } from '../../../../services/auth.service';
import { RequestStatus } from '../../../../models/request-status.model';

@Component({
  selector: 'app-forgot-password-form',
  imports: [ReactiveFormsModule, BtnComponent],
  templateUrl: './forgot-password-form.component.html',
})
export class ForgotPasswordFormComponent {
  form;
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {
    this.form = this.formBuilder.nonNullable.group({
      email: ['', [Validators.email, Validators.required]],
    });
  }
  status: RequestStatus = 'init';
  emailSent = false;
  sendLink() {
    if (this.form.valid) {
      this.status = 'loading';
      const { email } = this.form.getRawValue();
      this.authService.recovery(email).subscribe(
        () => {
          this.status = 'success';
          this.emailSent = true;
        },
        () => {
          this.status = 'error';
        }
      );
    } else {
      this.form.markAllAsTouched();
    }
  }
}
