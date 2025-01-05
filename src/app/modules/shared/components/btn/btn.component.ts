import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { COLORS, Colors } from '../../../../models/colors.model';

@Component({
  selector: 'app-btn',
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './btn.component.html',
  styleUrl: './btn.component.scss',
})
export class BtnComponent implements OnInit {
  @Input() disabled = false;
  @Input() loading = false;
  @Input() typeBtn: 'button' | 'reset' | 'submit' = 'button';
  @Input() color: Colors = 'primary';

  faSpinner = faSpinner;

  mapColors = COLORS;
  ngOnInit(): void {}
  get colors() {
    const colors = this.mapColors[this.color];
    if (colors) {
      return colors;
    }
    return {};
  }
}
