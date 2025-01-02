import { AuthService } from './../services/auth.service';
import { TokenService } from './../services/token.service';
import {
  HttpContext,
  HttpContextToken,
  HttpInterceptorFn,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { of, switchMap } from 'rxjs';

const CHECK_TOKEN = new HttpContextToken<boolean>(() => false);
const AUTH_HEADER = 'Authorization';
const BEARER_PREFIX = 'Bearer ';

export function checkToken() {
  return new HttpContext().set(CHECK_TOKEN, true);
}

function cloneRequestWithToken(req: any, token: string | undefined) {
  const tokenValue = token ?? '';
  return req.clone({
    headers: req.headers.set(AUTH_HEADER, `${BEARER_PREFIX}${tokenValue}`),
  });
}

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const tokenService = inject(TokenService);
  const authService = inject(AuthService);

  if (req.context.get(CHECK_TOKEN)) {
    const token = tokenService.getToken();
    const isValidToken = tokenService.isValidToken();
    if (isValidToken) {
      return next(cloneRequestWithToken(req, token));
    }
    const refreshToken = tokenService.getRefreshToken();
    const isValidRefreshToken = tokenService.isValidRefreshToken();

    if (refreshToken && isValidRefreshToken) {
      return authService.refreshToken(refreshToken).pipe(
        switchMap(() => {
          const newToken = tokenService.getToken();
          return next(cloneRequestWithToken(req, newToken));
        })
      );
    }
    return of();
  }
  return next(req);
};
