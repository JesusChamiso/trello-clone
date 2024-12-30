import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { BackgroundComponent } from '../../components/background/background.component';
import { RecoveryFormComponent } from '../../components/recovery-form/recovery-form.component';
import { FooterComponent } from '../../components/footer/footer.component';

@Component({
  selector: 'app-recovery',
  imports: [
    HeaderComponent,
    BackgroundComponent,
    RecoveryFormComponent,
    FooterComponent,
  ],
  templateUrl: './recovery.component.html',
})
export class RecoveryComponent {}
