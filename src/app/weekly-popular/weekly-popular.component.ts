import { Component, OnInit } from '@angular/core';
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
