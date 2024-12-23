import { faB } from './../../../../node_modules/@fortawesome/free-solid-svg-icons/faB.d';
import { Component } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTrello } from '@fortawesome/free-brands-svg-icons';
import { faBox, faWaveSquare, faClock } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-boards',
  imports: [NavbarComponent,FontAwesomeModule],
  templateUrl: './boards.component.html'
})
export class BoardsComponent {
  faTrello = faTrello;
  faBox = faBox;
  faWaveSquare = faWaveSquare;
  faClock = faClock;

}
