import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { Product } from '../../models/product.model';
import { NavbarComponent } from '../../modules/layout/components/navbar/navbar.component';

@Component({
  selector: 'app-scroll',
  imports: [NavbarComponent, CurrencyPipe, ScrollingModule],
  templateUrl: './scroll.component.html',
})
export class ScrollComponent {
  products: Product[] = [];
  constructor(private http: HttpClient) {}
  ngOnInit() {
    this.http
      .get<Product[]>('https://api.escuelajs.co/api/v1/products')
      .subscribe((data) => {
        this.products = data;
      });
  }
}
