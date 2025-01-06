import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Board } from '../models/boards.model';
import { environment } from '../../environments/environments';
import { checkToken } from '../interceptors/token.interceptor';

@Injectable({
  providedIn: 'root',
})
export class BoardsService {
  apiUrl = environment.API_URL;
  constructor(private http: HttpClient) {}
  getBoard(id: Board['id']) {
    return this.http.get<Board>(`${this.apiUrl}boards/${id}`, {
      context: checkToken(),
    });
  }
}
