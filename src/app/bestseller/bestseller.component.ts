import { Component, OnInit, OnDestroy } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';

import { Subscription } from 'rxjs';

import { Product } from '../product/product.model';
import { ProductService } from '../product/product.service';


@Component({
  selector: 'app-bestseller',
  templateUrl: './bestseller.component.html',
})
export class BestsellerComponent implements OnInit, OnDestroy {
  bestsellers: Product[] = []!;
  subscription: Subscription = null!;

  constructor(private productService: ProductService) { };

  ngOnInit() {
    this.subscription = this.productService.productsChanged
      .subscribe(
        (bestsellers: Product[]) => {
          this.bestsellers = bestsellers;
        }
      );
    this.bestsellers = this.productService.getAllProducts();
  }

  onNewBestseller() {
    // this.router.navigate(['new'], { relativeTo: this.route });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
