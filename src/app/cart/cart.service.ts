import { Injectable } from '@angular/core';

import { Subject } from 'rxjs';

import { Cart } from './cart.model';
@Injectable({ providedIn: 'root' })
export class CartService {
    cartChanged = new Subject<Cart[]>();

    private cart: Cart[] = [];

    setCart(cart: Cart[]) {
        this.cart = [...new Set(cart)];
        this.cartChanged.next(this.cart.slice());
    }

    getAllCarts() {
        return this.cart.slice();
    }

    addCart(cart: Cart) {
        this.cart.push(cart);
        this.cartChanged.next([...new Set(this.cart.slice())])
    }

    deleteCart(bookId: number) {
        let index = this.cart.findIndex((e) => e.book_id == bookId);
        this.cart.splice(index, 1);
        this.cartChanged.next(this.cart.slice());
    }

}
