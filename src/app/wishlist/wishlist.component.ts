import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
})
export class WishlistComponent implements OnInit {
  items: any[] = [];
  constructor() { }

  ngOnInit(): void {
    this.items = JSON.parse(localStorage.getItem('wishlist')!)
  }

}
