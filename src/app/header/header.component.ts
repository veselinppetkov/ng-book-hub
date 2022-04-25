import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth-modal/auth.service';
import { DataStorageService } from '../shared/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private authService: AuthService, private dateStorageService: DataStorageService) { }

  ngOnInit() {
    this.dateStorageService.fetchProducts().subscribe();
  }

  onLogout() {
    this.authService.logout();
  }



}
