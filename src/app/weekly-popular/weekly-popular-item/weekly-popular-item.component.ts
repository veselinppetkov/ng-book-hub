import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../../product/product.model';
import { ProductService } from '../../product/product.service';

@Component({
  selector: 'app-weekly-popular-item',
  templateUrl: './weekly-popular-item.component.html',
})
export class WeeklyPopularItemComponent implements OnInit {
  @Input() product: Product = null!;
  isAddedToWishlist = false;

  rating: string = 'width: 100%';

  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.rating = "width: " + (this.product.rating * 20) + '%';
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
