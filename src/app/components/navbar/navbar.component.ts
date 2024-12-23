import { Component } from '@angular/core';
import { BtnComponent } from '../btn/btn.component';
import {OverlayModule} from '@angular/cdk/overlay';

@Component({
  selector: 'app-navbar',
  imports: [BtnComponent, OverlayModule],
  templateUrl: './navbar.component.html'
})
export class NavbarComponent {
  isOpenProfile = false;
  isOpenBody = false;

}
