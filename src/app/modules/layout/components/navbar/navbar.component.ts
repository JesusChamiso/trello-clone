import {
  faAngleDown,
  faBell,
  faClose,
  faInfoCircle,
} from '@fortawesome/free-solid-svg-icons';
import { Component } from '@angular/core';
import { OverlayModule } from '@angular/cdk/overlay';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BtnComponent } from '../../../shared/components/btn/btn.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [BtnComponent, OverlayModule, FontAwesomeModule, RouterLink],
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {
  faBell = faBell;
  faInfoCircle = faInfoCircle;
  faClose = faClose;
  faAngleDown = faAngleDown;
  isOpenOverlayAvatar = false;
  isOpenOverlayBoards = false;
}
