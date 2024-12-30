import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CustomValidators } from '../../../../utils/validators';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { BtnComponent } from '../../../shared/components/btn/btn.component';
import { AuthService } from '../../../../services/auth.service';
import { RequestStatus } from '../../../../models/request-status.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-recovery-form',
  imports: [ReactiveFormsModule, FaIconComponent, BtnComponent],
  templateUrl: './recovery-form.component.html',
})
export class RecoveryFormComponent {
  form;
  status: RequestStatus = 'init';
  faEye = faEye;
  faEyeSlash = faEyeSlash;
  showPassword = false;
  token = '';
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {
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

    this.route.queryParamMap.subscribe((params) => {
      const token = params.get('token');
      if (token) {
        this.token = token;
      } else {
        this.router.navigate(['/auth/login']);
      }
    });
  }

  recovery() {
    if (this.form.valid) {
      const { newPassword } = this.form.getRawValue();
      this.status = 'loading';
      this.authService.changePassword(newPassword, this.token).subscribe({
        next: () => {
          this.status = 'success';
        },
        error: () => {
          this.status = 'error';
        },
      });
    } else {
      this.form.markAllAsTouched();
    }
  }
}
