import { Component, Input, OnInit } from '@angular/core';
import { Cart } from 'src/app/cart/cart.model';
import { CartService } from 'src/app/cart/cart.service';
import { DataStorageService } from 'src/app/shared/data-storage.service';
import { Wishlist } from 'src/app/wishlist/wishlist.model';
import { WishlistService } from 'src/app/wishlist/wishlist.service';
import { Product } from '../../product/product.model';
import { ProductService } from '../../product/product.service';

@Component({
  selector: 'app-weekly-popular-item',
  templateUrl: './weekly-popular-item.component.html',
})
export class WeeklyPopularItemComponent implements OnInit {
  @Input() product: Product = null!;
  @Input() isAuthenticated: boolean = false;
  isAddedToWishlist = false;
  isAddedToCart = false;


  rating: string = 'width: 100%';

  constructor(private productsService: ProductService, private wishlistService: WishlistService, private dateStorageService: DataStorageService, private cartService: CartService) { }

  ngOnInit() {
    this.rating = "width: " + (this.product.rating * 20) + '%';
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
