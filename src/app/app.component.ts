import { Component, OnInit } from '@angular/core';
import { ProductModel } from './models/product';
import { ProductService } from './services/product.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title: String = 'angular-test';
  private productList: Array<ProductModel> = [];
  public resetFilter: boolean = false;
  public products: Array<ProductModel> = [];
  private searchProducts: Array<ProductModel> = [];

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.productService.getProductList()
      .subscribe(res => {
        this.productList = res;
        this.products = JSON.parse(JSON.stringify(this.productList));
        this.searchProducts = JSON.parse(JSON.stringify(this.productList));
      }, error => {
        console.log(error);
      });
  }

  search($event: any): void  {
    this.resetFilter = true;
    this.products = JSON.parse(JSON.stringify(this.productList));
    if ($event) {
      this.products = this.productList.filter((product: any) => {
        return product['model'].toLowerCase().includes($event.toLowerCase());
      });
    }
    this.searchProducts = JSON.parse(JSON.stringify(this.products));
  }

  filter(filterParam: any): void  {
    this.resetFilter = false;
    this.products = JSON.parse(JSON.stringify(this.searchProducts));
    // filter against brand
    if (filterParam.brands.size) {
      this.products = this.products.filter((asset: any) => {
        return filterParam.brands.has(asset.brand);
      });
    }

    // filter against ram
    if (filterParam.rams.size) {
      this.products = this.products.filter((asset: any) => {
        return filterParam.rams.has(asset.features.ram);
      });
    }

    // filter against memory
    if (filterParam.internalMemories.size) {
      this.products = this.products.filter((asset: any) => {
        return filterParam.internalMemories.has(asset.features.internalMemory);
      });
    }
  }
}
