import { Component, Input, OnInit } from '@angular/core';

import { Product } from 'src/app/product/product.model';

@Component({
  selector: 'app-bestseller-item',
  templateUrl: './bestseller-item.component.html',
})
export class BestsellerItemComponent implements OnInit {
  @Input() bestseller: Product = null!;
  @Input() index: number = 0!;
  rating: number = this.bestseller.rating * 20;

  constructor() { }

  ngOnInit() {
  }

}
