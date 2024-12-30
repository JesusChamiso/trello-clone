import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomValidators } from '../../../../utils/validators';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { BtnComponent } from '../../../shared/components/btn/btn.component';
import { RequestStatus } from '../../../../models/request-status.model';
import { AuthService } from '../../../../services/auth.service';

@Component({
  selector: 'app-register-form',
  imports: [ReactiveFormsModule, FaIconComponent, BtnComponent],
  templateUrl: './register-form.component.html',
})
export class RegisterFormComponent {
  form;
  formUserValidator;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    this.formUserValidator = this.formBuilder.nonNullable.group({
      emailUser: ['', [Validators.email, Validators.required]],
    });
    this.form = this.formBuilder.nonNullable.group(
      {
        name: ['', [Validators.required]],
        email: ['', [Validators.email, Validators.required]],
        password: ['', [Validators.minLength(8), Validators.required]],
        confirmPassword: ['', [Validators.required]],
      },
      {
        validators: [
          CustomValidators.MatchValidator('password', 'confirmPassword'),
        ],
      }
    );
  }
  status: RequestStatus = 'init';
  statusUser: RequestStatus = 'init';
  faEye = faEye;
  faEyeSlash = faEyeSlash;
  showPassword = false;
  showRegisterForm = false;

  validateUser() {
    if (this.formUserValidator.valid) {
      this.statusUser = 'loading';
      const email = this.formUserValidator.get('emailUser')?.value ?? '';
      this.authService.isAvailable(email).subscribe({
        next: (rta) => {
          this.statusUser = 'success';
          if (rta.isAvailable) {
            // console.log(rta.isAvailable);
            this.showRegisterForm = true;
            this.form.patchValue({
              email: this.formUserValidator.get('emailUser')?.value,
            });
          } else {
            this.router.navigate(['/auth/login'], {
              queryParams: { email: email },
            });
          }
        },
        error: (e) => {
          this.statusUser = 'failed';
        },
      });
    } else {
      this.formUserValidator.markAllAsTouched();
    }
  }

  register() {
    if (this.form.valid) {
      this.status = 'loading';
      const { name, email, password } = this.form.getRawValue();
      this.authService.registerAndLogin(name, email, password).subscribe({
        next: () => {
          this.status = 'success';
          this.router.navigate(['/app/boards']);
        },
        error: (e) => {
          this.status = 'failed';
          console.log(e.error.message);
        },
      });
    } else {
      this.form.markAllAsTouched();
    }
  }
}
