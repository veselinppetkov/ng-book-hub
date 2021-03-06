import { Component, Input, OnInit } from '@angular/core';

import { Cart } from 'src/app/cart/cart.model';
import { Product } from 'src/app/product/product.model';
import { Wishlist } from 'src/app/wishlist/wishlist.model';

import { AuthService } from 'src/app/auth-modal/auth.service';
import { CartService } from 'src/app/cart/cart.service';
import { ProductService } from 'src/app/product/product.service';
import { DataStorageService } from 'src/app/shared/data-storage.service';
import { WishlistService } from 'src/app/wishlist/wishlist.service';
@Component({
  selector: 'app-shop-item',
  templateUrl: './shop-item.component.html',
})
export class ShopItemComponent implements OnInit {
  @Input() productItem: Product = null!;
  isAddedToWishlist: Boolean = false;
  isAddedToCart: Boolean = false;
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
    this.rating = "width: " + (this.productItem.rating * 20) + '%';
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


}
