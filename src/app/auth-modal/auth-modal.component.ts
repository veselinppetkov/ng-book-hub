import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { Observable } from 'rxjs';

import { AuthResponseData, AuthService } from './auth.service';

@Component({
  selector: 'app-auth-modal',
  templateUrl: './auth-modal.component.html',
})
export class AuthModalComponent {
  isLoading: boolean = false;
  error: any = null;

  constructor(private authService: AuthService, private router: Router) { }

  onLoginSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }

    let authObs: Observable<AuthResponseData>;

    const email = form.value.signInEmail;
    const password = form.value.signInPassword;

    console.log(email, password);

    this.isLoading = true;

    authObs = this.authService.login(email, password);

    // authObs.subscribe(resData => {
    //   console.log(resData);
    //   this.isLoading = false;
    //   this.router.navigate(['/'])
    // }, errorMessage => {
    //   this.error = errorMessage;
    //   this.isLoading = false;
    // }
    // );

    authObs.subscribe({
      next: resData => {
        console.log(resData);
        this.isLoading = false;
        this.router.navigate(['/'])
      },
      error: errorMessage => {
        this.error = errorMessage;
        this.isLoading = false;
      }
    });

    form.reset();
  }

  onRegisterSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }

    let authObs: Observable<AuthResponseData>;

    const email = form.value.registerEmail;
    const password = form.value.registerPassword;
    const repass = form.value.registerRepass;

    if (repass != password) {
      throw new Error(`Passwords don't match`)
    }

    console.log(email, password, repass);

    this.isLoading = true;

    authObs = this.authService.signup(email, password);

    // authObs.subscribe(resData => {
    //   console.log(resData);
    //   this.isLoading = false;
    //   this.router.navigate(['/'])
    // }, errorMessage => {
    //   this.error = errorMessage;
    //   this.isLoading = false;
    // }
    // );

    authObs.subscribe({
      next: resData => {
        console.log(resData);
        this.isLoading = false;
        this.router.navigate(['/'])
      },
      error: errorMessage => {
        this.error = errorMessage;
        this.isLoading = false;
      }
    });

    form.reset();
  }


}
