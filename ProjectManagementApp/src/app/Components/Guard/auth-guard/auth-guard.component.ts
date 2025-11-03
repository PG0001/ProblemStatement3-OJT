// auth.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from '../../../Services/core/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const token = this.authService.getToken();

    if (!token) {
      this.router.navigate(['/auth/login']);
      return false;
    }

    // Optional: Check roles
    const allowedRoles = route.data['roles'] as Array<string>;
    if (allowedRoles && allowedRoles.length > 0) {
      // Example: Check user role logic (if you add it in token)
      const userRole = sessionStorage.getItem('role');
      if (!userRole || !allowedRoles.includes(userRole)) {
        this.router.navigate(['/dashboard']);
        return false;
      }
    }

    return true;
  }
}
