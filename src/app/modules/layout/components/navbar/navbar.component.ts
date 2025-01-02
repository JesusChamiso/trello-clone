import {
  faAngleDown,
  faBell,
  faClose,
  faInfoCircle,
} from '@fortawesome/free-solid-svg-icons';
import { Component, OnInit } from '@angular/core';
import { OverlayModule } from '@angular/cdk/overlay';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BtnComponent } from '../../../shared/components/btn/btn.component';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../../services/auth.service';
import { User } from '../../../../models/users.model';
import { CommonModule } from '@angular/common';
import { TokenService } from '../../../../services/token.service';

@Component({
  selector: 'app-navbar',
  imports: [
    BtnComponent,
    OverlayModule,
    FontAwesomeModule,
    RouterLink,
    CommonModule,
  ],
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {
  faBell = faBell;
  faInfoCircle = faInfoCircle;
  faClose = faClose;
  faAngleDown = faAngleDown;
  isOpenOverlayAvatar = false;
  isOpenOverlayBoards = false;
  user$;
  constructor(
    private authService: AuthService,
    private router: Router,
    private tokenService: TokenService
  ) {
    this.user$ = this.authService.user$;
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }

  isValidateToken() {
    console.log('isValidateToken:', this.tokenService.isValidToken());
  }
}
