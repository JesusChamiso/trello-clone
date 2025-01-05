import { User } from './users.model';

export interface Board {
  id: string;
  title: string;
  backgroundColor: 'green' | 'yellow' | 'red' | 'violet' | 'sky' | 'gray';
  members: User[];
}
