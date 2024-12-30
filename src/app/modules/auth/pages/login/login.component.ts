import { Component } from '@angular/core';
import { BackgroundComponent } from '../../components/background/background.component';
import { HeaderComponent } from '../../components/header/header.component';
import { LoginFormComponent } from '../../components/login-form/login-form.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [
    HeaderComponent,
    BackgroundComponent,
    LoginFormComponent,
    FooterComponent,
    RouterLink,
  ],
  templateUrl: './login.component.html',
})
export class LoginComponent {}
