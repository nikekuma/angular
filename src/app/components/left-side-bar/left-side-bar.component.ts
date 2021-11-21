import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FilterModel, FilterParamModel } from '../../models/filter';

@Component({
  selector: 'left-side-bar',
  templateUrl: './left-side-bar.component.html',
  styleUrls: ['./left-side-bar.component.scss']
})
export class LeftSideBarComponent implements OnInit, OnChanges {
  @Input()
  public reset: boolean = false;
  public filterOption: FilterModel = {
    'brands': ['Samsung', 'Nokia', 'Apple'],
    'prices': ['20000-29999', '30000-39999', '40000-59999'],
    'rams': ['4GB', '8GB', '16GB'],
    'internalMemories': ['8GB', '16GB', '32GB']
  };
  public filterParam: any = {
    'brands': new Set(),
    'prices': new Array(),
    'rams': new Set(),
    'internalMemories': new Set()
  };
  public filterForm: any;
  @Output()
  public filterChange = new EventEmitter();

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.filterForm = this.fb.group({
      brand: [''],
      price: [''],
      ram: [''],
      memory: ['']
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['reset'].currentValue) {
      this.resetFilter();
    }
  }

  resetFilter(): void {
    this.filterForm.reset();
    for (let key in this.filterParam) {
      this.filterParam[key] = new Set();
    }
    // this.filterParam.brands = new Set();
    // this.filterParam.prices = new Array();
    // this.filterParam.rams = new Set();
    // this.filterParam.internalMemories = new Set();
    this.filter();
  }

  productFilter(prod: any, val: any): void {
    if (val) {
      this.filterParam.brands.add(prod);
    } else {
      this.filterParam.brands.delete(prod);
    }
    this.filter();
  }

  priceFilter(val: any): void {
    this.filterParam.prices = [];
    if (val) {
      val = val.split("-");
      this.filterParam.prices.push(val[0]);
      this.filterParam.prices.push(val[1]);
    }
    this.filter();
  }

  ramFilter(ram: any, val: any): void {
    if (val) {
      this.filterParam.rams.add(ram);
    } else {
      this.filterParam.rams.delete(ram);
    }
    this.filter();
  }

  memoryFilter(memory: any, val: any): void {
    if (val) {
      this.filterParam.internalMemories.add(memory);
    } else {
      this.filterParam.internalMemories.delete(memory);
    }
    this.filter();
  }

  filter(): void {
    this.filterChange.emit(this.filterParam);
  }

}
