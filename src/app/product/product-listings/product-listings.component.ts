import { Component, OnInit } from '@angular/core';

import { products } from '../../products';

@Component({
  selector: 'app-product-listings',
  templateUrl: './product-listings.component.html',
  styleUrls: ['./product-listings.component.scss']
})
export class ProductListComponent implements OnInit {

  products: any;
  
  // products: any = [1,2,3,4]
  
  constructor() { }

  ngOnInit(): void {
    this.products = products;
  }

}
