import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';

import { Product } from '../product/product.model';
import { Cart } from '../cart/cart.model';
import { Wishlist } from '../wishlist/wishlist.model';
import { Review } from './review.model';

import { ProductService } from '../product/product.service';
import { ReviewService } from './review.service';
import { WishlistService } from '../wishlist/wishlist.service';
import { CartService } from '../cart/cart.service';

@Injectable({ providedIn: 'root' })
export class DataStorageService {
    constructor(
        private http: HttpClient,
        private productService: ProductService,
        private reviewService: ReviewService,
        private wishlistService: WishlistService,
        private cartService: CartService) { }

    fetchProducts() {
        return this.http.get<Product[]>(
            'https://ng-book-hub-default-rtdb.europe-west1.firebasedatabase.app/books.json'
        ).pipe(map(products => {
            return products.map(product => {
                return {
                    ...product
                };
            });
        }),
            tap(products => {
                this.productService.setProducts(products);
            }))
    }

    storeReviews() {
        const reviews = this.reviewService.getAllReviews();

        this.http
            .put(
                'https://ng-book-hub-default-rtdb.europe-west1.firebasedatabase.app/reviews.json',
                reviews
            )
            .subscribe(response => {
                console.log(response);
            });
    }

    fetchReviews() {
        return this.http.get<Review[]>(
            'https://ng-book-hub-default-rtdb.europe-west1.firebasedatabase.app/reviews.json'
        ).pipe(map(reviews => {
            return reviews.map(review => {
                return {
                    ...review
                };
            });
        }),
            tap(reviews => {
                this.reviewService.setReviews(reviews);
            }))
    }

    storeWishlist() {
        const wishlist = this.wishlistService.getAllLists();

        this.http
            .put(
                'https://ng-book-hub-default-rtdb.europe-west1.firebasedatabase.app/wishlist.json',
                wishlist
            )
            .subscribe(response => {
                console.log(response);
            });
    }

    fetchWishlist() {
        return this.http.get<Wishlist[]>(
            'https://ng-book-hub-default-rtdb.europe-west1.firebasedatabase.app/wishlist.json'
        ).pipe(map(wishlist => {
            return wishlist.map(wishlist => {
                return {
                    ...wishlist
                };
            });
        }),
            tap(wishlist => {
                this.wishlistService.setWishlist(wishlist);
            }))
    }

    storeCart() {
        const cart = this.cartService.getAllCarts();

        this.http
            .put(
                'https://ng-book-hub-default-rtdb.europe-west1.firebasedatabase.app/cart.json',
                cart
            )
            .subscribe(response => {
                console.log(response);
            });
    }

    fetchCart() {
        return this.http.get<Cart[]>(
            'https://ng-book-hub-default-rtdb.europe-west1.firebasedatabase.app/cart.json'
        ).pipe(map(cart => {
            return cart.map(cart => {
                return {
                    ...cart
                };
            });
        }),
            tap(cart => {
                this.cartService.setCart(cart)
            }))
    }
}
