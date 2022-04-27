import { Injectable } from '@angular/core';
import {
    Resolve,
    ActivatedRouteSnapshot,
    RouterStateSnapshot
} from '@angular/router';

import { DataStorageService } from '../shared/data-storage.service';
import { Product } from './product.model';
import { ProductService } from './product.service';

@Injectable({ providedIn: 'root' })
export class RecipesResolverService implements Resolve<Product[]> {
    constructor(
        private dataStorageService: DataStorageService,
        private productService: ProductService
    ) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const products = this.productService.getAllProducts();

        if (products.length === 0) {
            return this.dataStorageService.fetchProducts();
        } else {
            return products;
        }
    }
}
