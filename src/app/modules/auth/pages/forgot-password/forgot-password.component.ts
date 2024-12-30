import { Component } from '@angular/core';
import { FooterComponent } from '../../components/footer/footer.component';
import { ForgotPasswordFormComponent } from '../../components/forgot-password-form/forgot-password-form.component';
import { BackgroundComponent } from '../../components/background/background.component';
import { HeaderComponent } from '../../components/header/header.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  imports: [
    FooterComponent,
    ForgotPasswordFormComponent,
    BackgroundComponent,
    HeaderComponent,
    RouterLink,
  ],
  templateUrl: './forgot-password.component.html',
})
export class ForgotPasswordComponent {}
