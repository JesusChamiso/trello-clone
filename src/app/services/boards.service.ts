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
  bufferSpace = 65535;
  apiUrl = environment.API_URL;
  constructor(private http: HttpClient) {}
  getBoard(id: Board['id']) {
    return this.http.get<Board>(`${this.apiUrl}boards/${id}`, {
      context: checkToken(),
    });
  }

  getPosition(cards: Card[], currentIndex: number) {
    const lastIndex = cards.length - 1;
    // Card Nuevo en una lista
    if (cards.length === 1) {
      return this.bufferSpace;
    }
    // Card en la primera posición
    if (cards.length > 1 && currentIndex === 0) {
      const onTopPosition = cards[1].position;
      return onTopPosition / 2;
    }
    // Card en la mitad de la lista
    if (cards.length > 2 && currentIndex > 0 && currentIndex < lastIndex) {
      const prevPosition = cards[currentIndex - 1].position;
      const nextPosition = cards[currentIndex + 1].position;
      return (prevPosition + nextPosition) / 2;
    }
    // Card en la última posición
    if (cards.length > 1 && currentIndex === lastIndex) {
      const onBottomPosition = cards[lastIndex - 1].position;
      return onBottomPosition + this.bufferSpace;
    }

    return 0;
  }

  createBoard(
    title: Board['title'],
    backgroundColor: Board['backgroundColor']
  ) {
    return this.http.post<Board>(
      `${this.apiUrl}boards`,
      { title, backgroundColor },
      { context: checkToken() }
    );
  }

  getPositionNewCard(cards: Card[]) {
    const lastIndex = cards.length - 1;
    if (cards.length === 0) {
      return this.bufferSpace;
    }
    const onBottomPosition = cards[lastIndex].position;
    return onBottomPosition + this.bufferSpace;
  }
}
