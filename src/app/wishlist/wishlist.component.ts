import { Component, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
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
  constructor(private wishlistService: WishlistService, private dateStorageService: DataStorageService) { }

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

  onRemove(bookId: number) {
    this.wishlistService.deleteWatchlist(bookId);
    this.dateStorageService.storeWishlist();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}