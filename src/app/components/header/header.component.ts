import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public searchText: String = "";
  @Output()
  public valueChange = new EventEmitter();
  public autoCompleteForm: any;
  public autoCompleteSuggestion = {
    "models": new Array<String>()
  };
  public showSuggestion: boolean = false;
  public models: Array<String> = [];

  constructor(private fb: FormBuilder, private productService: ProductService) { }

  ngOnInit(): void {
    this.autoCompleteForm = this.fb.group({
      model: ['']
    });
    this.productService.getProductList()
      .subscribe(res => {
        res.forEach((product) => {
          this.autoCompleteSuggestion.models.push(product.model);
        })
        this.models = JSON.parse(JSON.stringify(this.autoCompleteSuggestion.models));
      }, error => {
        console.log(error);
      });
  }

  showAutoComplete($event: any, searchText: any): void {
    if ($event.keyCode === 13) {
      this.search();
      return;
    }
    this.autoCompleteSuggestion.models = JSON.parse(JSON.stringify(this.models));
    if (searchText) {
      this.showSuggestion = true;
      this.autoCompleteSuggestion.models = this.autoCompleteSuggestion.models.filter((model) => {
        return model.toLowerCase().includes(searchText.toLowerCase());
      })
    } else {
      this.showSuggestion = false;
    }
  }

  search(): void {
    this.showSuggestion = false;
    this.valueChange.emit(this.searchText);
  }

  selectModel(model: any): void {
    this.showSuggestion = false;
    this.searchText = model;
    this.search();
  }
}
