import { Injectable } from '@angular/core';
import { getCookie, setCookie, removeCookie } from 'typescript-cookie';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  constructor() {}
  saveToken(token: string) {
    // localStorage.setItem('token', token);
    setCookie('token', token, { expires: 30, path: '/' });
  }

  getToken() {
    // return localStorage.getItem('token');
    const token = getCookie('token');
    return token;
  }

  removeToken() {
    // localStorage.removeItem('token');
    removeCookie('token');
  }
}
