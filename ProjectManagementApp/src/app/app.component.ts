import { Component } from '@angular/core';
import { AuthService } from './Services/core/services/auth.service';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Project Management App';
  isLoggedIn = false;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    // Initialize login state
    this.isLoggedIn = this.authService.isLoggedIn();

    // Watch for route or login changes
    this.authService.token$.subscribe(token => {
      this.isLoggedIn = !!token;
    });

    // Optional: Update login state on route changes
    this.router.events.pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.isLoggedIn = this.authService.isLoggedIn();
      });
  }

  logout() {
    this.authService.logout();
  }
}
