import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth-modal/auth.service';
import { Cart } from '../cart/cart.model';
import { CartService } from '../cart/cart.service';
import { DataStorageService } from '../shared/data-storage.service';
import { Review } from '../shared/review.model';
import { ReviewService } from '../shared/review.service';
import { Wishlist } from '../wishlist/wishlist.model';
import { WishlistService } from '../wishlist/wishlist.service';
import { Product } from './product.model';
import { ProductService } from './product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit, OnDestroy {
  product: Product = null!;
  id: number = 0!;
  subscription: Subscription = null!;
  rating: string = null!;
  isAddedToWishList: boolean = false;
  isAddedToCart: boolean = false;
  isAuthenticated: boolean = false;
  reviews: Review[] = [];


  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private authService: AuthService,
    private reviewService: ReviewService, private dateStorageService: DataStorageService, private cartService: CartService, private wishlistService: WishlistService) { }


  ngOnInit() {
    this.authService.user.subscribe(user => {
      this.isAuthenticated = user ? true : false;
    });

    this.route.params
      .subscribe(
        (params: Params) => {
          console.log(params);
          this.id = +params['id'];
          this.product = this.productService.getProductById(this.id)!;
          console.log(this.product)
        }
      );

    this.subscription = this.reviewService.reviewsChanged
      .subscribe(
        (reviews: Review[]) => {
          this.reviews = reviews;
        }
      );

    this.reviews = this.reviewService.getAllReviews();
    this.rating = "width: " + (this.product.rating * 20) + '%';

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

    this.isAddedToWishList = true;
  }

  onRemove(bookId: number) {
    this.wishlistService.deleteWatchlist(bookId);
    this.dateStorageService.storeWishlist();

    this.isAddedToWishList = false;

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

  onHelpful(number: number) {
    //TODO
  }

  onUnhelpful(number: number) {
    // TODO
  }

  onReviewSubmit(reviewForm: NgForm) {
    if (!reviewForm.valid) {
      return;
    }

    const review: Review = {
      rating: reviewForm.value.rating,
      bookId: this.product.book_id,
      helpful: 0,
      unhelpful: 0,
      reviewTitle: reviewForm.value.replyTitle,
      reviewText: reviewForm.value.replyMsg,
      userId: JSON.parse(localStorage.getItem('userData')!).id,
      date: 'A couple of seconds ago'
    }

    this.reviewService.addReview(review);
    this.dateStorageService.storeReviews();

    reviewForm.reset();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
