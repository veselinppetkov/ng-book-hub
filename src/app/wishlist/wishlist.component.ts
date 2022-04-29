import { Component, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { Cart } from '../cart/cart.model';
import { CartService } from '../cart/cart.service';
import { ProductService } from '../product/product.service';
import { DataStorageService } from '../shared/data-storage.service';
import { Wishlist } from './wishlist.model';
import { WishlistService } from './wishlist.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
})
export class WishlistComponent implements OnInit, OnDestroy {
  items: any[] = [];
  subscription: Subscription = null!;
  constructor(private wishlistService: WishlistService, private dateStorageService: DataStorageService, private productService: ProductService, private cartService: CartService) { }

  ngOnInit(): void {
    this.items = this.wishlistService.getAllLists().filter(w => w.userId == JSON.parse(localStorage.getItem('userData')!).id)

    this.subscription = this.wishlistService.wishlistChanged
      .subscribe(
        (wishlist: Wishlist[]) => {
          this.items = wishlist;
        }
      );

    this.items = Array.from(new Set(this.items.map(a => a.book_id)))
      .map(id => {
        return this.items.find(a => a.book_id === id)
      })

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

    this.onRemove(bookId)
  }

  onRemove(bookId: number) {
    this.wishlistService.deleteWatchlist(bookId);
    this.dateStorageService.storeWishlist();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}