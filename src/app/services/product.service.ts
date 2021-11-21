import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { PRODUCT_LIST } from '../mock-data/product-list';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor() { }

  getProductList() {
    return of(PRODUCT_LIST);
  }
}
