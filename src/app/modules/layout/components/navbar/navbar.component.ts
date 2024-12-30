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
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../../services/auth.service';

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

  constructor(private authService: AuthService, private router: Router) {}

  logout() {
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }
}
