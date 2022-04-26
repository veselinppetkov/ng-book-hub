import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth-modal/auth.service';
import { ProductService } from '../product/product.service';
import { DataStorageService } from '../shared/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private authService: AuthService, private dateStorageService: DataStorageService, private productService: ProductService, private router: Router) { }

  onSearchSubmit(form: NgForm) {
    if (!form.valid) {
      throw new Error(`Form is invalid`)
    }

    const searchedBook = this.productService.getProductByTitle(form.value.searched);

    if (searchedBook != undefined) {
      this.router.navigate([`/product/${searchedBook?.book_id}`])
    }

    form.reset();
  }

  ngOnInit() {
    this.dateStorageService.fetchProducts().subscribe();
  }

  ngAfterViewInit() {
    this.dateStorageService.fetchProducts().subscribe();
  }

  onLogout() {
    this.authService.logout();
  }



}
