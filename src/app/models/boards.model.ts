import { Card } from './card.model';
import { Colors } from './colors.model';
import { List } from './list.model';
import { User } from './users.model';

export interface Board {
  id: string;
  title: string;
  backgroundColor: Colors;
  members: User[];
  lists: List[];
  cards: Card[];
}
