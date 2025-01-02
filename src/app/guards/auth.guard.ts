import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { TokenService } from '../services/token.service';

export const authGuard: CanActivateFn = (route, state) => {
  const tokenService = inject(TokenService);
  const router = inject(Router);
  const isValidToken = tokenService.isValidRefreshToken();
  console.log('is Valid Token from AuthGuard:', isValidToken);
  if (!isValidToken) {
    router.navigate(['/auth/login']);
    return false;
  }

  return true;
};
