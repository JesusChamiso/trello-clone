import { Component } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTrello } from '@fortawesome/free-brands-svg-icons';
import { faBox, faWaveSquare, faClock, faAngleDown, faAngleUp, faGear, faUsers, faBorderAll, faHeart } from '@fortawesome/free-solid-svg-icons';
import {CdkAccordionModule} from '@angular/cdk/accordion';

@Component({
  selector: 'app-boards',
  imports: [NavbarComponent,FontAwesomeModule, CdkAccordionModule],
  templateUrl: './boards.component.html'
})
export class BoardsComponent {
  faTrello = faTrello;
  faBox = faBox;
  faWaveSquare = faWaveSquare;
  faClock = faClock;
  faAngleDown = faAngleDown;
  faAngleUp = faAngleUp;
  faHeart = faHeart;
  faBorderAll = faBorderAll
  faUsers = faUsers;
  faGear = faGear;

  items = [
    { label: 'Item 1', 
      items:[
        {
          label: 'Sub Item 1.1'
        },{
          label: 'Sub Item 1.2'
        },{
          label: 'Sub Item 1.3'
        }
      ]
    },
    { label: 'Item 2', 
      items:[
        {
          label: 'Sub Item 2.1'
        },{
          label: 'Sub Item 2.2'
        },{
          label: 'Sub Item 2.3'
        }
      ]
    },
    { label: 'Item 3', 
      items:[
        {
          label: 'Sub Item 3.1'
        },{
          label: 'Sub Item 3.2'
        },{
          label: 'Sub Item 3.3'
        }
      ]
    },
    { label: 'Item 4', 
      items:[
        {
          label: 'Sub Item 4.1'
        },{
          label: 'Sub Item 4.2'
        },{
          label: 'Sub Item 4.3'
        }
      ]
    },
    { label: 'Item 5', 
      items:[
        {
          label: 'Sub Item 5.1'
        },{
          label: 'Sub Item 5.2'
        },{
          label: 'Sub Item 5.3'
        }
      ]
    },
  ];

}
