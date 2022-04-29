import { Component, OnInit } from '@angular/core';
import { WishlistService } from './wishlist.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
})
export class WishlistComponent implements OnInit {
  items: any[] = [];
  constructor(private wishlistService: WishlistService) { }

  ngOnInit(): void {
    this.items = this.wishlistService.getAllLists().filter(w => w.userId == JSON.parse(localStorage.getItem('userData')!).id)

  }
}
