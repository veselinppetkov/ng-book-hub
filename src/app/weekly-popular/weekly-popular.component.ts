import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth-modal/auth.service';
import { Product } from '../product/product.model';
import { ProductService } from '../product/product.service';

@Component({
  selector: 'app-weekly-popular',
  templateUrl: './weekly-popular.component.html',
})
export class WeeklyPopularComponent implements OnInit {
  weekly: Product[] = []!;
  subscription: Subscription = null!;
  isAuthenticated: boolean = false;


  customOptions: OwlOptions = {
    nav: false,
    dots: true,
    margin: 10,
  }
  customOptions2: OwlOptions = {
    nav: false,
    dots: true,
    margin: -225,
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

  constructor(private productService: ProductService, private authService: AuthService) { };

  ngOnInit() {
    this.authService.user.subscribe(user => {
      this.isAuthenticated = user ? true : false;
    });

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
