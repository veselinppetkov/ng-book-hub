import { Component } from '@angular/core';
import { AuthService } from '../auth-modal/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  constructor(private authService: AuthService) { }

  onLogout() {
    this.authService.logout();
  }



}
