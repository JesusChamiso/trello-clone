import { List } from './list.model';

export interface Card {
  id: number;
  title: string;
  description: string;
  position: string;
  list: List;
}
