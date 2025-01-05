import { Component, OnInit } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTrello } from '@fortawesome/free-brands-svg-icons';
import {
  faBox,
  faWaveSquare,
  faClock,
  faAngleDown,
  faAngleUp,
  faGear,
  faUsers,
  faBorderAll,
  faHeart,
} from '@fortawesome/free-solid-svg-icons';
import { CdkAccordionModule } from '@angular/cdk/accordion';
import { RouterLink } from '@angular/router';
import { MeService } from '../../../../services/me.service';
import { Board } from '../../../../models/boards.model';
import { CardColorComponent } from '../../../shared/components/card-color/card-color.component';

@Component({
  selector: 'app-boards',
  imports: [
    FontAwesomeModule,
    CdkAccordionModule,
    RouterLink,
    CardColorComponent,
  ],
  templateUrl: './boards.component.html',
})
export class BoardsComponent implements OnInit {
  boards: Board[] = [];
  faTrello = faTrello;
  faBox = faBox;
  faWaveSquare = faWaveSquare;
  faClock = faClock;
  faAngleDown = faAngleDown;
  faAngleUp = faAngleUp;
  faHeart = faHeart;
  faBorderAll = faBorderAll;
  faUsers = faUsers;
  faGear = faGear;

  constructor(private meService: MeService) {}

  ngOnInit() {
    this.getMeBoards();
  }

  getMeBoards() {
    this.meService.getMeBoards().subscribe((boards) => {
      this.boards = boards;
    });
  }
  items = [
    {
      label: 'Item 1',
      items: [
        {
          label: 'Sub Item 1.1',
        },
        {
          label: 'Sub Item 1.2',
        },
        {
          label: 'Sub Item 1.3',
        },
      ],
    },
    {
      label: 'Item 2',
      items: [
        {
          label: 'Sub Item 2.1',
        },
        {
          label: 'Sub Item 2.2',
        },
        {
          label: 'Sub Item 2.3',
        },
      ],
    },
    {
      label: 'Item 3',
      items: [
        {
          label: 'Sub Item 3.1',
        },
        {
          label: 'Sub Item 3.2',
        },
        {
          label: 'Sub Item 3.3',
        },
      ],
    },
    {
      label: 'Item 4',
      items: [
        {
          label: 'Sub Item 4.1',
        },
        {
          label: 'Sub Item 4.2',
        },
        {
          label: 'Sub Item 4.3',
        },
      ],
    },
    {
      label: 'Item 5',
      items: [
        {
          label: 'Sub Item 5.1',
        },
        {
          label: 'Sub Item 5.2',
        },
        {
          label: 'Sub Item 5.3',
        },
      ],
    },
  ];
}
