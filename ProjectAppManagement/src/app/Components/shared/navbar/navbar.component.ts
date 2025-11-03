import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../Services/Auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isLoggedIn = false;
  userRole: string | null = null;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLoggedIn();
    this.userRole = this.authService.getUserRole();
    console.log(this.userRole)
  }

  logout() {
    this.authService.logout();
  }
}
