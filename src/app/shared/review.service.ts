import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Review } from './review.model';

@Injectable({ providedIn: 'root' })
export class ReviewService {
    reviewsChanged = new Subject<Review[]>();

    private reviews: Review[] = [];

    setReviews(reviews: Review[]) {
        this.reviews = reviews;
        this.reviewsChanged.next(this.reviews.slice());
    }

    getAllReviews() {
        return this.reviews.slice();
    }

    addReview(review: Review) {
        this.reviews.push(review);
        this.reviewsChanged.next(this.reviews.slice())
    }

}
