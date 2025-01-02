import { Injectable } from '@angular/core';
import { getCookie, setCookie, removeCookie } from 'typescript-cookie';
import { jwtDecode, JwtPayload } from 'jwt-decode';

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

  isValidToken() {
    const token = this.getToken();
    token ? true : false;
    const decodeToken = token ? jwtDecode<JwtPayload>(token) : null;
    if (decodeToken && decodeToken?.exp) {
      const tokenDate = new Date(0);
      tokenDate.setUTCSeconds(decodeToken.exp);
      const today = new Date();
      return tokenDate.getTime() > today.getTime();
    }
    return false;
  }

  saveRefreshToken(token: string) {
    // localStorage.setItem('token', token);
    setCookie('refresh-token', token, { expires: 30, path: '/' });
  }

  getRefreshToken() {
    // return localStorage.getItem('token');
    const token = getCookie('refresh-token');
    return token;
  }

  removeRefreshToken() {
    // localStorage.removeItem('token');
    removeCookie('refresh-token');
  }
  isValidRefreshToken() {
    const token = this.getRefreshToken();
    token ? true : false;
    const decodeToken = token ? jwtDecode<JwtPayload>(token) : null;
    if (decodeToken && decodeToken?.exp) {
      const tokenDate = new Date(0);
      tokenDate.setUTCSeconds(decodeToken.exp);
      const today = new Date();
      return tokenDate.getTime() > today.getTime();
    }
    return false;
  }
}
