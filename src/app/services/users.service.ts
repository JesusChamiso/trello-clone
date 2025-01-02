import { Injectable } from '@angular/core';
import { environment } from '../../environments/environments';
import { HttpClient } from '@angular/common/http';
import { TokenService } from './token.service';
import { User } from '../models/users.model';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  apiUrl = environment.API_URL;
  constructor(private http: HttpClient, private tokenService: TokenService) {}

  getUsers() {
    const token = this.tokenService.getToken();
    return this.http.get<User[]>(`${this.apiUrl}users`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }
}
