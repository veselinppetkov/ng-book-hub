import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth-modal/auth.service';
import { DataStorageService } from '../shared/data-storage.service';
import { Review } from '../shared/review.model';
import { ReviewService } from '../shared/review.service';
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
  addedToWishList: boolean = false;
  isAuthenticated: boolean = false;
  reviews: Review[] = [];


  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private authService: AuthService,
    private reviewService: ReviewService, private dateStorageService: DataStorageService) { }


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

  onWishlist(productId: number) {
    this.productService.addProductToWishlist(productId)
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
