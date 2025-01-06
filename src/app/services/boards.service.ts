import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Board } from '../models/boards.model';
import { environment } from '../../environments/environments';
import { checkToken } from '../interceptors/token.interceptor';
import { Card } from '../models/card.model';

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

  getPosition(cards: Card[], currentIndex: number) {
    // Card Nuevo en una lista
    if (cards.length === 1) {
      return 'New Card';
    }
    // Card en la primera posición
    if (cards.length > 1 && currentIndex === 0) {
      return 'Top Card';
    }
    // Card en la mitad de la lista
    const lastIndex = cards.length - 1;
    if (cards.length > 2 && currentIndex > 0 && currentIndex < lastIndex) {
      return 'Middle Card';
    }
    // Card en la última posición
    if (cards.length > 1 && currentIndex === lastIndex) {
      return 'Bottom Card';
    }

    return 0;
  }
}
