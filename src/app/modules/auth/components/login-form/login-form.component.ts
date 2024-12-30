import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faEye, faEyeSlash, faPen } from '@fortawesome/free-solid-svg-icons';
import { BtnComponent } from '../../../shared/components/btn/btn.component';
import { AuthService } from '../../../../services/auth.service';
import { RequestStatus } from '../../../../models/request-status.model';

@Component({
  selector: 'app-login-form',
  imports: [FaIconComponent, ReactiveFormsModule, BtnComponent],
  templateUrl: './login-form.component.html',
})
export class LoginFormComponent {
  form;
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private route: ActivatedRoute
  ) {
    this.form = this.formBuilder.group({
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
    this.route.queryParamMap.subscribe((params) => {
      const email = params.get('email');
      if (email) {
        this.form.controls.email.setValue(email);
      }
    });
  }

  faPen = faPen;
  faEye = faEye;
  faEyeSlash = faEyeSlash;
  showPassword = false;
  status: RequestStatus = 'init';

  doLogin() {
    if (this.form.valid) {
      this.status = 'loading';
      // const { email, password } = this.form.getRawValue();
      const email = this.form.get('email')?.value ?? '';
      const password = this.form.get('password')?.value ?? '';
      this.authService.login(email, password).subscribe({
        next: () => {
          this.status = 'success';
          this.router.navigate(['/app/boards']);
        },
        error: (e) => {
          this.status = 'failed';
          // console.error('Error de Autenticacion: ', e.error.message);
        },
      });
    } else {
      this.form.markAllAsTouched();
    }
  }
}
