import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth-modal/auth.service';
import { ProductService } from '../product/product.service';
import { DataStorageService } from '../shared/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit, OnDestroy {
  categories: string[] = [];
  wishlistItems: number = 0;
  subscription: Subscription = null!;
  userSub: Subscription = null!;
  isAuthenticated: boolean = false;

  constructor(private authService: AuthService, private dateStorageService: DataStorageService, private productService: ProductService, private router: Router) { }

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

  ngOnChanges() {
    this.wishlistItems = JSON.parse(localStorage.getItem('wishlist')!).length
  }

  ngOnInit() {
    this.subscription = this.dateStorageService.fetchProducts().subscribe();
    if (localStorage.getItem('wishlist')) {
      this.wishlistItems = JSON.parse(localStorage.getItem('wishlist')!).length
    }
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
    this.userSub.unsubscribe();
  }



}
