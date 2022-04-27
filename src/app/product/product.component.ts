import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Product } from './product.model';
import { ProductService } from './product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
})
export class ProductComponent implements OnInit {
  product: Product = null!;
  id: number = 0!;
  rating: string = null!;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute) { }


  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          console.log(params);
          this.id = +params['id'];
          this.product = this.productService.getProductById(this.id)!;
          console.log(this.product)
        }
      );

    this.rating = "width: " + (this.product.rating * 20) + '%';
  }

  onWishlist(productId: number) {
    this.productService.addProductToWishlist(productId);
    console.log(`This is logged in component`)
  }

}
