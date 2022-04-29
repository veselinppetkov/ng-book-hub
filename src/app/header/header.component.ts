import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth-modal/auth.service';
import { Cart } from '../cart/cart.model';
import { CartService } from '../cart/cart.service';
import { ProductService } from '../product/product.service';
import { DataStorageService } from '../shared/data-storage.service';
import { Wishlist } from '../wishlist/wishlist.model';
import { WishlistService } from '../wishlist/wishlist.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit, OnDestroy {
  categories: string[] = [];
  wishlistItems: any = 0;
  cartItems: any = 0;
  subscription: Subscription = null!;
  subscriptionReview: Subscription = null!;
  subscriptionWishlist: Subscription = null!;
  subscriptionCart: Subscription = null!;
  userSub: Subscription = null!;
  isAuthenticated: boolean = false;

  constructor(
    private authService: AuthService,
    private dateStorageService: DataStorageService,
    private productService: ProductService,
    private router: Router,
    private wishlistService: WishlistService,
    private cartService: CartService) { }

  onSearchSubmit(form: NgForm) {
    if (!form.valid) {
      throw new Error(`Form is invalid`)
    }

    const searchedBook = this.productService.getProductByTitle(form.value.searched);

    if (searchedBook != undefined) {
      this.router.navigate([`/product/${searchedBook?.book_id}`])
    }

    form.reset();
  }

  ngOnInit() {
    this.subscription = this.dateStorageService.fetchProducts().subscribe();
    this.subscriptionReview = this.dateStorageService.fetchReviews().subscribe();
    this.subscriptionCart = this.dateStorageService.fetchCart().subscribe((cart) => {
      this.cartItems = cart.filter(c => c.userId == JSON.parse(localStorage.getItem('userData')!).id).length
    })
    this.cartService.cartChanged.subscribe((cart: Cart[]) => {
      this.cartItems = cart.filter(c => c.userId == JSON.parse(localStorage.getItem('userData')!).id).length
    })
    this.subscriptionWishlist = this.dateStorageService.fetchWishlist().subscribe((wishlist) => {
      this.wishlistItems = wishlist.filter(w => w.userId == JSON.parse(localStorage.getItem('userData')!).id).length
    });
    this.wishlistService.wishlistChanged
      .subscribe(
        (wishlist: Wishlist[]) => {
          this.wishlistItems = wishlist.filter(w => w.userId == JSON.parse(localStorage.getItem('userData')!).id).length
        }
      );


    this.userSub = this.authService.user.subscribe(user => {
      this.isAuthenticated = user ? true : false;
    });
  }

  onMouseOver() {
    this.categories = this.productService.getAllCategories();
  }

  onLogout() {
    this.authService.logout();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.subscriptionReview.unsubscribe();
    this.subscriptionWishlist.unsubscribe();
    this.subscriptionCart.unsubscribe();
    this.userSub.unsubscribe();
  }



}
