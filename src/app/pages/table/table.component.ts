import { Component } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { HttpClient } from '@angular/common/http';
import { Product } from '../../models/product.model';
import { CdkTableModule } from '@angular/cdk/table';
import { NgClass } from '@angular/common';
import { DataSourceProduct } from './data-source';
import { BtnComponent } from '../../components/btn/btn.component';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounce, debounceTime } from 'rxjs';

@Component({
  selector: 'app-table',
  imports: [
    NavbarComponent,
    CdkTableModule,
    NgClass,
    BtnComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './table.component.html',
})
export class TableComponent {
  dataSource = new DataSourceProduct();
  columns: string[] = ['id', 'title', 'price', 'image', 'actions'];
  total = 0;
  input = new FormControl('', { nonNullable: true });

  constructor(private http: HttpClient) {}
  ngOnInit() {
    this.http
      .get<Product[]>('https://api.escuelajs.co/api/v1/products')
      .subscribe((data) => {
        this.dataSource.init(data);
        this.total = this.dataSource.getTotal();
      });

    this.input.valueChanges.pipe(debounceTime(300)).subscribe((value) => {
      this.dataSource.find(value);
    });
  }
  update(product: Product) {
    this.dataSource.update(product.id, { price: 69 });
    this.total = this.dataSource.getTotal();
  }
}
