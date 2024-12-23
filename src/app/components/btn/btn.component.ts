import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-btn',
  imports: [],
  templateUrl: './btn.component.html',
  styleUrl: './btn.component.scss'
})
export class BtnComponent  implements OnInit{
  @Input() typeBtn: 'button' | 'reset' | 'submit' = 'button';
  ngOnInit(): void {
    
  }
}
