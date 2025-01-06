import { List } from './list.model';

export interface Card {
  id: number;
  title: string;
  description?: string;
  position: number;
  list: List;
}

export interface UpdateCardDto {
  title?: string;
  description?: string;
  position?: number;
  listId?: number | string;
  boardId?: string;
}

// export interface CreateCardDto {
//   title: string;
//   position: number;
//   description?: string;
//   listId: number | string;
//   boardId: number | string;
// }

// otra forma de crear un interface para el createCardDto
export interface CreateCardDto extends Omit<Card, 'id' | 'list'> {
  listId: number | string;
  boardId: number | string;
}
