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

  customOptions: OwlOptions = {
    nav: false,
    dots: true,
    margin: 20,
    loop: false,
    rewind: true,
    responsive: {
      0: {
        items: 2
      },
      480: {
        items: 2
      },
      768: {
        items: 3
      },
      992: {
        items: 4
      },
      1440: {
        items: 5
      }
    }
  }

  constructor(private productService: ProductService) { };

  ngOnInit() {
    this.subscription = this.productService.productsChanged
      .subscribe(
        (bestsellers: Product[]) => {
          this.bestsellers = bestsellers;
        }
      );
    this.bestsellers = this.productService.getProducts();
  }

  onNewBestseller() {
    // this.router.navigate(['new'], { relativeTo: this.route });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
