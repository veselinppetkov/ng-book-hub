import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProductService } from '../product/product.service';
import { DataStorageService } from '../shared/data-storage.service';
import { WishlistService } from '../wishlist/wishlist.service';
import { Cart } from './cart.model';
import { CartService } from './cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
})
export class CartComponent implements OnInit {
  items: any[] = [];
  subscription: Subscription = null!;
  subtotal: any = 0;
  total: any = [];

  constructor(private dateStorageService: DataStorageService, private productService: ProductService, private cartService: CartService) { }

  ngOnInit(): void {
    this.items = this.cartService.getAllCarts().filter(c => c.userId == JSON.parse(localStorage.getItem('userData')!).id)

    this.subscription = this.cartService.cartChanged
      .subscribe(
        (cart: Cart[]) => {
          this.items = cart;
          this.subtotal = this.total.reduce(((a: any, b: any): any => a + b))
        }
      );

    this.items = Array.from(new Set(this.items.map(a => a.book_id)))
      .map(id => {
        return this.items.find(a => a.book_id === id)
      })


    this.items.forEach((el) => this.total.push(Number(el.price)))
    this.subtotal = this.total.reduce(((a: any, b: any): any => a + b))
  }

  onRemove(bookId: number) {
    this.total = this.total - Number(this.productService.getProductById(bookId)!.price)
    this.cartService.deleteCart(bookId)
    this.dateStorageService.storeCart();
  }

}
