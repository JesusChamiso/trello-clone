import { TokenService } from './../services/token.service';
import {
  HttpContext,
  HttpContextToken,
  HttpEvent,
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable } from 'rxjs';

const CHECK_TOKEN = new HttpContextToken<boolean>(() => false);

export function checkToken() {
  return new HttpContext().set(CHECK_TOKEN, true);
}
export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const tokenService = inject(TokenService).getToken();
  const newReq = req.clone({
    headers: req.headers.set('Authorization', `Bearer ${tokenService}`),
  });
  return next(newReq);
};
