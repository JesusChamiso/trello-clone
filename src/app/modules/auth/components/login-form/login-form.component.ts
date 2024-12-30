import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faEye, faEyeSlash, faPen } from '@fortawesome/free-solid-svg-icons';
import { BtnComponent } from '../../../shared/components/btn/btn.component';

@Component({
  selector: 'app-login-form',
  imports: [FaIconComponent, ReactiveFormsModule, BtnComponent],
  templateUrl: './login-form.component.html',
})
export class LoginFormComponent {
  constructor(private formBuilder: FormBuilder, private router: Router) {}
  form = this.formBuilder.nonNullable.group({
    email: ['', [Validators.email, Validators.required]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });
  faPen = faPen;
  faEye = faEye;
  faEyeSlash = faEyeSlash;
  showPassword = false;
  status: string = 'init';
  doLogin() {
    if (this.form.valid) {
      this.status = 'loading';
      const { email, password } = this.form.getRawValue();
      this.router.navigate(['/boards']);
    } else {
      this.form.markAllAsTouched();
    }
  }
}
