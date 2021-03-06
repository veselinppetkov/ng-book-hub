import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Product } from './product.model';
// import { ShoppingListService } from '../shopping-list/shopping-list.service'; // TODO

@Injectable({ providedIn: 'root' })
export class ProductService {
    productsChanged = new Subject<Product[]>();

    private products: Product[] = [];

    // constructor(private slService: ShoppingListService) { } // TODO

    setProducts(products: Product[]) {
        this.products = products;
        this.productsChanged.next(this.products.slice());
    }

    getAllProducts() {
        return this.products.slice();
    }

    getAllCategories() {
        return [...new Set(this.products.map(p => p.category))];
    }

    getAllAuthors() {
        return [...new Set(this.products.map(p => p.author))];
    }

    getProduct(index: number) {
        return this.products[index];
    }

    getProductById(id: number) {
        console.log(this.products);
        return this.products.find((p) => p.book_id == id);
    }

    getProductByTitle(title: string) {
        return this.products.find((p) => p.title.toLocaleLowerCase().includes(title.toLocaleLowerCase()));
    }



    // addIngredientsToShoppingList(ingredients: Ingredient[]) {
    //     this.slService.addIngredients(ingredients);
    // } // TODO

    addProduct(product: Product) {
        this.products.push(product);
        this.productsChanged.next(this.products.slice());
    }

    addProductToWishlist(productId: number) {
        let userData = JSON.parse(localStorage.getItem('userData')!)
        let wishlist = JSON.parse(localStorage.getItem('userData')!).wishlist
        wishlist = [...wishlist, productId];
        localStorage.setItem('userData', JSON.stringify(userData));

        // localStorage.setItem('userData', userData)


        // const wishlist: any[] = [];
        // const productItem = this.getProductById(productId);

        // if (!localStorage.getItem('wishlist')) {
        //     wishlist.push(productItem);
        //     localStorage.setItem('wishlist', JSON.stringify(wishlist))
        // } else if (!wishlist.includes(productItem)) {
        //     const wishlistLocal = JSON.parse(localStorage.getItem('wishlist')!)
        //     wishlistLocal.push(productItem)
        //     localStorage.setItem('wishlist', JSON.stringify(wishlistLocal))
        // }
    }


    updateProduct(index: number, newProduct: Product) {
        this.products[index] = newProduct;
        this.productsChanged.next(this.products.slice());
    }

    deleteProduct(index: number) {
        this.products.splice(index, 1);
        this.productsChanged.next(this.products.slice());
    }
}
