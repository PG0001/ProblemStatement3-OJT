// sidebar.component.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../../Services/core/services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  constructor(private authService: AuthService, private router: Router) { }

  get isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  get employeeRole(): string | null {
    return sessionStorage.getItem('employeeRole');
  }

  navigate(path: string) {
    this.router.navigate([path]);
  }
}
