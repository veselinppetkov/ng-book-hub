import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Product } from '../product/product.model';
import { ProductService } from '../product/product.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
})
export class ShopComponent implements OnInit {
  categories: string[] = [];
  oldCategory: string = '';
  products: Product[] = []!;
  subscription: Subscription = null!;
  isAddedToWishlist = false;

  constructor(private productService: ProductService) { };

  ngOnInit() {
    this.subscription = this.productService.productsChanged
      .subscribe(
        (products: Product[]) => {
          this.products = products;
        }
      );
    this.products = this.productService.getAllProducts();
    this.categories = this.productService.getAllCategories();
  }

  onNewBestseller() {
    // this.router.navigate(['new'], { relativeTo: this.route });
  }

  onWishlist(bookId: number) {
    this.productService.addProductToWishlist(bookId)
    this.isAddedToWishlist = true;
  }

  onRemove(bookId: number) {
    console.log(`TO DO!`)
    this.isAddedToWishlist = false;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onClick(event: any) {
    console.log(event);
    this.products = this.productService.getAllProducts().filter((p) => p.category == event.target.value);
  }

}
