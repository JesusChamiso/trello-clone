import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environments';
import { switchMap, tap } from 'rxjs';
import { TokenService } from './token.service';
import { ResponseLogin } from '../models/auth.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  apiUrl = environment.API_URL;
  constructor(private http: HttpClient, private tokenService: TokenService) {}

  login(email: string, password: string) {
    return this.http
      .post<ResponseLogin>(`${this.apiUrl}auth/login`, {
        email,
        password,
      })
      .pipe(
        tap((response) => {
          const token = response.access_token;
          if (token) {
            this.tokenService.saveToken(token);
            // console.log('Token:', token);
          } else {
            console.log('Token no recibido');
          }
        })
      );
  }

  register(name: string, email: string, password: string) {
    return this.http.post(`${this.apiUrl}auth/register`, {
      name,
      email,
      password,
    });
  }

  isAvailable(email: string) {
    return this.http.post<{ isAvailable: boolean }>(
      `${this.apiUrl}auth/is-available`,
      { email }
    );
  }

  registerAndLogin(name: string, email: string, password: string) {
    return this.register(name, email, password).pipe(
      switchMap(() => this.login(email, password))
    );
  }

  recovery(email: string) {
    return this.http.post(`${this.apiUrl}auth/recovery`, { email });
  }

  changePassword(newpassword: string, token: string) {
    return this.http.post(`${this.apiUrl}auth/change-password`, {
      newpassword,
      token,
    });
  }

  logout() {
    this.tokenService.removeToken();
  }
}
