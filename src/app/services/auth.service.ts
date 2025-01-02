import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environments';
import { BehaviorSubject, switchMap, tap } from 'rxjs';
import { TokenService } from './token.service';
import { ResponseLogin } from '../models/auth.model';
import { User } from '../models/users.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  apiUrl = environment.API_URL;
  user$ = new BehaviorSubject<User | null>(null);

  constructor(private http: HttpClient, private tokenService: TokenService) {}
  // En lugar de suscribirme a la respuesta del método getProfile que utiliza el metodo tap para actualizar el valor del BehaviorSubject user$,
  // puedo retornar el observable y suscribirme a él en el componente que lo necesite. esto quita la raeactividad del servicio
  // y la pone en el componente
  getDataUser() {
    return this.user$.getValue();
  }

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

  getProfile() {
    const token = this.tokenService.getToken();
    return this.http
      .get<User>(`${this.apiUrl}auth/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .pipe(
        tap((user) => {
          this.user$.next(user);
        })
      );
  }
}
