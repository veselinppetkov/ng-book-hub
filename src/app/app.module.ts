import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core.module';
import { CarouselModule } from 'ngx-owl-carousel-o';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { IntroComponent } from './intro/intro.component';
import { BestsellerComponent } from './bestseller/bestseller.component';
import { WeeklyPopularComponent } from './weekly-popular/weekly-popular.component';
import { AuthModalComponent } from './auth-modal/auth-modal.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ProductComponent } from './product/product.component';
import { ShopComponent } from './shop/shop.component';
import { AboutComponent } from './about/about.component';
import { CartComponent } from './cart/cart.component';
import { ProfileComponent } from './profile/profile.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { BestsellerItemComponent } from './bestseller/bestseller-item/bestseller-item.component';
import { WeeklyPopularItemComponent } from './weekly-popular/weekly-popular-item/weekly-popular-item.component';
import { ShopItemComponent } from './shop/shop-item/shop-item.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    IntroComponent,
    BestsellerComponent,
    AuthModalComponent,
    PageNotFoundComponent,
    ProductComponent,
    ShopComponent,
    AboutComponent,
    CartComponent,
    ProfileComponent,
    WishlistComponent,
    BestsellerItemComponent,
    WeeklyPopularItemComponent,
    WeeklyPopularComponent,
    ShopItemComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    SharedModule,
    CoreModule,
    BrowserAnimationsModule,
    CarouselModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
