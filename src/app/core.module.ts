import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ProductService } from './product/product.service';
import { AuthInterceptorService } from './auth-modal/auth.interceptor.service';
import { APP_BASE_HREF } from '@angular/common';

@NgModule({
    providers: [
        ProductService,
        { provide: APP_BASE_HREF, useValue: '' }, {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptorService,
            multi: true
        }
    ]
})
export class CoreModule { }
