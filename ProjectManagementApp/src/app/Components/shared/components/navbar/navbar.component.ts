// nav-bar.component.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../../Services/core/services/auth.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavBarComponent {
  Role: string = '';
  constructor(private authService: AuthService, private router: Router) { }
  ngoninit() {
    this.Role = localStorage.getItem('role') || '';
  }

  get isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  get employeeName(): string | null {
    return localStorage.getItem('employeeName');
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }
}
