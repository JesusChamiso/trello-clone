import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environments';
import { CreateListDto, List } from '../models/list.model';
import { checkToken } from '../interceptors/token.interceptor';

@Injectable({
  providedIn: 'root',
})
export class ListsService {
  apiUrl = environment.API_URL;
  constructor(private http: HttpClient) {}
  create(dto: CreateListDto) {
    return this.http.post<List>(`${this.apiUrl}lists`, dto, {
      context: checkToken(),
    });
  }
}
