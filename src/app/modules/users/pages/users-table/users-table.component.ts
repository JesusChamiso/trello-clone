import { Component } from '@angular/core';
import { DataSourceUser } from './data-source';
import { CommonModule } from '@angular/common';
import { CdkTableModule } from '@angular/cdk/table';

@Component({
  selector: 'app-users-table',
  imports: [CommonModule, CdkTableModule],
  templateUrl: './users-table.component.html',
})
export class UsersTableComponent {
  dataSource = new DataSourceUser();
  columns: string[] = ['id', 'avatar', 'name', 'email'];

  constructor() {
    this.dataSource.init([
      {
        id: 1,
        name: 'John Doe',
        email: 'mail@mail.com',
        avatar: 'https://avatar.iran.liara.run/public/boy',
      },
      {
        id: 2,
        name: 'Iris Daniela',
        email: 'mail2@mail.com',
        avatar: 'https://avatar.iran.liara.run/public/girl',
      },
      {
        id: 3,
        name: 'Jesus Chamiso',
        email: 'mail3@mail.com',
        avatar: 'https://avatar.iran.liara.run/public/boy',
      },
      {
        id: 4,
        name: 'Jose Chamiso',
        email: 'mail4@mail.com',
        avatar: 'https://avatar.iran.liara.run/public/boy',
      },
      {
        id: 5,
        name: 'Mary Jane',
        email: 'mail5@mail.com',
        avatar: 'https://avatar.iran.liara.run/public/boy',
      },
    ]);
  }
}
