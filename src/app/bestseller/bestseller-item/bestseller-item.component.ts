import { Component, Input, OnInit } from '@angular/core';

import { Product } from 'src/app/product/product.model';
import { ProductService } from 'src/app/product/product.service';

@Component({
  selector: 'app-bestseller-item',
  templateUrl: './bestseller-item.component.html',
})
export class BestsellerItemComponent implements OnInit {
  @Input() bestseller: Product = null!;
  @Input() index: number = 0!;
  isAddedToWishlist = false;

  rating: string = 'width: 100%';

  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.rating = "width: " + (this.bestseller.rating * 20) + '%';
  }

  onWishlist(bookId: number) {
    this.productService.addProductToWishlist(bookId)
    this.isAddedToWishlist = true;
  }

  onRemove(bookId: number) {
    console.log(`TO DO!`)
    this.isAddedToWishlist = false;
  }

}
