import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth-modal/auth.service';
import { Cart } from 'src/app/cart/cart.model';
import { CartService } from 'src/app/cart/cart.service';

import { Product } from 'src/app/product/product.model';
import { ProductService } from 'src/app/product/product.service';
import { DataStorageService } from 'src/app/shared/data-storage.service';
import { Wishlist } from 'src/app/wishlist/wishlist.model';
import { WishlistService } from 'src/app/wishlist/wishlist.service';

@Component({
  selector: 'app-bestseller-item',
  templateUrl: './bestseller-item.component.html',
})
export class BestsellerItemComponent implements OnInit {
  @Input() bestseller: Product = null!;
  @Input() index: number = 0!;
  isAddedToWishlist = false;
  isAddedToCart = false;
  isAuthenticated: boolean = false;

  wishlist: Wishlist[] = [];
  cart: Cart[] = [];

  rating: string = 'width: 100%';

  constructor(
    private authService: AuthService,
    private wishlistService: WishlistService,
    private dateStorageService: DataStorageService,
    private productsService: ProductService,
    private cartService: CartService) { }

  ngOnInit() {
    this.cartService.cartChanged
      .subscribe(
        (cart: Cart[]) => {
          this.cart = cart;
        }
      );

    this.wishlistService.wishlistChanged
      .subscribe(
        (wishlist: Wishlist[]) => {
          this.wishlist = wishlist;
        }
      );

    this.authService.user.subscribe(user => {
      this.isAuthenticated = user ? true : false;
    });

    this.rating = "width: " + (this.bestseller.rating * 20) + '%';
  }

  onWishlist(bookId: number) {
    const book = this.productsService.getProductById(bookId)!

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
    const book = this.productsService.getProductById(bookId)!

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

}
