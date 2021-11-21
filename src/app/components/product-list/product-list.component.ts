import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ProductModel } from 'src/app/models/product';

@Component({
  selector: 'product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit, OnChanges {
  @Input()
  public productList: Array<ProductModel> = [];
  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.productList = changes['productList'].currentValue;
  }

}
