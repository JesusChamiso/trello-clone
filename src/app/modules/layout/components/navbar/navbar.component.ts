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
import { CommonModule } from '@angular/common';
import { TokenService } from '../../../../services/token.service';
import { BoardFormComponent } from '../board-form/board-form.component';
import { BoardsService } from '../../../../services/boards.service';
import { Colors, NAVBARBACKGROUNDS } from '../../../../models/colors.model';

@Component({
  selector: 'app-navbar',
  imports: [
    BtnComponent,
    OverlayModule,
    FontAwesomeModule,
    RouterLink,
    CommonModule,
    BoardFormComponent,
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
  isOpenOverlayCreateBoard = false;
  user$;
  navbarColor = NAVBARBACKGROUNDS;
  navbarBackgroundColor: Colors = 'primary';
  constructor(
    private authService: AuthService,
    private router: Router,
    private tokenService: TokenService,
    private boardService: BoardsService
  ) {
    this.user$ = this.authService.user$;
    this.boardService.backgorundColor$.subscribe((color) => {
      this.navbarBackgroundColor = color;
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }

  isValidateToken() {
    console.log('isValidateToken:', this.tokenService.isValidToken());
  }

  close(event: boolean) {
    this.isOpenOverlayCreateBoard = event;
  }
  get colors() {
    const classes = this.navbarColor[this.navbarBackgroundColor];
    return classes ? classes : 'primary';
  }
}
