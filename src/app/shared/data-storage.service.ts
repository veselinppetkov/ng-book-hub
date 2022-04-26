import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';

import { Product } from '../product/product.model';
import { ProductService } from '../product/product.service';

@Injectable({ providedIn: 'root' })
export class DataStorageService {
    constructor(private http: HttpClient, private productService: ProductService) { }

    storeProducts() {
        const products = this.productService.getAllProducts();
        this.http
            .put(
                'https://ng-book-hub-default-rtdb.europe-west1.firebasedatabase.app/books.json',
                products
            )
            .subscribe(response => {
                console.log(response);
            });
    }

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
}
