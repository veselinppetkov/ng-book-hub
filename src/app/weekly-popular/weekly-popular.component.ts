import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Subscription } from 'rxjs';
import { Product } from '../product/product.model';
import { ProductService } from '../product/product.service';

@Component({
  selector: 'app-weekly-popular',
  templateUrl: './weekly-popular.component.html',
  styleUrls: ['./weekly-popular.component.css']
})
export class WeeklyPopularComponent implements OnInit {
  weekly: Product[] = []!;
  subscription: Subscription = null!;
  customOptions: OwlOptions = {
    nav: false,
    dots: true,
    margin: 10,
  }
  customOptions2: OwlOptions = {
    nav: false,
    dots: true,
    margin: 20,
    loop: false,
    responsive: {
      0: {
        items: 2,
      },
      480: {
        items: 2,
      },
      768: {
        items: 3,
      },
      992: {
        items: 4,
      },
      1200: {
        items: 3,
      },
      1440: {
        items: 4,
      },
    }
  }

  constructor(private productService: ProductService) { };


  ngOnInit() {
    this.subscription = this.productService.productsChanged
      .subscribe(
        (weekly: Product[]) => {
          this.weekly = weekly;
        }
      );
    this.weekly = this.productService.getAllProducts();
  }

  onNewWeekly() {
    // this.router.navigate(['new'], { relativeTo: this.route });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
