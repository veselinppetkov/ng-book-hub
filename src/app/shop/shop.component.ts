import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth-modal/auth.service';
import { Product } from '../product/product.model';
import { ProductService } from '../product/product.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
})
export class ShopComponent implements OnInit {
  authors: string[] = [];
  categories: string[] = [];
  oldCategory: string = '';
  products: Product[] = []!;
  subscription: Subscription = null!;
  isAddedToWishlist = false;
  rating: string = 'width: 100%'

  constructor(private productService: ProductService, private authService: AuthService) { };
  isAuthenticated: boolean = false;

  ngOnInit() {
    this.authService.user.subscribe(user => {
      this.isAuthenticated = user ? true : false;
    });
    this.subscription = this.productService.productsChanged
      .subscribe(
        (products: Product[]) => {
          this.products = products;
        }
      );
    this.products = this.productService.getAllProducts();
    this.categories = this.productService.getAllCategories();
    this.authors = this.productService.getAllAuthors();
    this.rating = "width: " + ((Math.random() * 10) * 10) + '%';

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

  onCategoryClick(event: any) {
    console.log(event);
    this.products = this.productService.getAllProducts().filter((p) => p.category == event.target.value);
  }

  onAuthorClick(event: any) {
    console.log(event);
    this.products = this.productService.getAllProducts().filter((p) => p.author == event.target.value);
  }

}
