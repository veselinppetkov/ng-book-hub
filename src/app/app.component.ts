import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth-modal/auth.service';
import { DataStorageService } from './shared/data-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'book-hub';

  constructor(private authService: AuthService) { };

  ngOnInit() {
    this.authService.autoLogin();
  }


}
