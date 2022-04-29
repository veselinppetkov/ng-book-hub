import { Component, OnInit } from '@angular/core';

import { AuthService } from '../auth-modal/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
})
export class ProfileComponent implements OnInit {
  user: string = ''

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('userData')!).email;
  }
  onLogout() {
    this.authService.logout();
  }

}
