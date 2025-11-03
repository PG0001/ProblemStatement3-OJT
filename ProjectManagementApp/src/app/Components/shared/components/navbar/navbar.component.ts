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
  userName : string | null = ''
  constructor(private authService: AuthService, private router: Router) { }
  ngoninit() {
    this.Role = sessionStorage.getItem('role') || '';
    this.userName = sessionStorage.getItem('employeeName');
  
  }

  get isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  get employeeName(): string | null {
    return sessionStorage.getItem('employeeName');
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }
}
