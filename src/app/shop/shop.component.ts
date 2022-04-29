import { Component, OnInit } from '@angular/core';

import { Subscription } from 'rxjs';

import { Cart } from '../cart/cart.model';
import { Product } from '../product/product.model';
import { Wishlist } from '../wishlist/wishlist.model';

import { AuthService } from '../auth-modal/auth.service';
import { CartService } from '../cart/cart.service';
import { ProductService } from '../product/product.service';
import { DataStorageService } from '../shared/data-storage.service';
import { WishlistService } from '../wishlist/wishlist.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
})
export class ShopComponent implements OnInit {
  authors: string[] = [];
  categories: string[] = [];
  products: Product[] = []!;

  oldCategory: string = '';
  subscription: Subscription = null!;
  isAddedToWishlist: boolean = false;
  isAddedToCart: boolean = false;
  isAuthenticated: boolean = false;
  rating: string = 'width: 100%'


  constructor(
    private productService: ProductService,
    private authService: AuthService,
    private dateStorageService: DataStorageService,
    private wishlistService: WishlistService,
    private cartService: CartService) { };

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

  cleanAll() {
    this.products = this.productService.getAllProducts();
    Array.from(document.getElementsByClassName('custom-control-input')).forEach((el) => (el as HTMLInputElement).checked = false)
  }

  onWishlist(bookId: number) {
    const book = this.productService.getProductById(bookId)!
    const wishlist: Wishlist = {
      author: book.author,
      book_id: book.book_id,
      category: book.category,
      cover: book.cover,
      description: book.description,
      pages: book.pages,
      price: book.price,
      publishedDate: book.publishedDate,
      rating: book.rating,
      title: book.title,
      url: book.url,
      userId: JSON.parse(localStorage.getItem('userData')!).id
    }

    this.wishlistService.addList(wishlist);
    this.dateStorageService.storeWishlist();

    this.isAddedToWishlist = true;
  }

  onRemove(bookId: number) {
    this.wishlistService.deleteWatchlist(bookId);
    this.dateStorageService.storeWishlist();

    this.isAddedToWishlist = false;

  }

  onCart(bookId: number) {
    const book = this.productService.getProductById(bookId)!

    const cart: Cart = {
      book_id: book.book_id,
      cover: book.cover,
      price: book.price,
      title: book.title,
      userId: JSON.parse(localStorage.getItem('userData')!).id
    }

    this.cartService.addCart(cart);
    this.dateStorageService.storeCart();

    this.isAddedToCart = true;
  }

  onCategoryClick(event: any) {
    console.log(event);
    this.products = this.productService.getAllProducts().filter((p) => p.category == event.target.value);
  }

  onAuthorClick(event: any) {
    console.log(event.currentTarget);
    this.products = this.productService.getAllProducts().filter((p) => p.author == event.target.value);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
