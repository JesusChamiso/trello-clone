import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { BackgroundComponent } from '../../components/background/background.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { RegisterFormComponent } from '../../components/register-form/register-form.component';

@Component({
  selector: 'app-register',
  imports: [
    HeaderComponent,
    BackgroundComponent,
    FooterComponent,
    RegisterFormComponent,
  ],
  templateUrl: './register.component.html',
})
export class RegisterComponent {}
