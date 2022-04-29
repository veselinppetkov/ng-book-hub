import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Wishlist } from './wishlist.model';


@Injectable({ providedIn: 'root' })
export class WishlistService {
    wishlistChanged = new Subject<Wishlist[]>();

    private wishlist: Wishlist[] = [];

    setWishlist(wishlist: Wishlist[]) {
        this.wishlist = [...new Set(wishlist)];
        this.wishlistChanged.next(this.wishlist.slice());
    }

    getAllLists() {
        return this.wishlist.slice();
    }

    addList(wishlist: Wishlist) {
        this.wishlist.push(wishlist);
        this.wishlistChanged.next([...new Set(this.wishlist.slice())])
    }

    deleteWatchlist(index: number) {
        this.wishlist.splice(index, 1);
        this.wishlistChanged.next(this.wishlist.slice());
    }



}
