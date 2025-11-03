import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../Services/Auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const token = this.authService.getToken();

    if (!token) {
      this.router.navigate(['/Login']);
      return false;
    }

    const userRole = this.authService.getUserRole(); // ✅ from decoded token
    const allowedRoles = route.data['roles'] as string[];

    console.log('🧩 Checking access -> UserRole:', userRole, 'Allowed:', allowedRoles);

    // ✅ Case-insensitive check for safety
    if (userRole && allowedRoles.map(r => r.toLowerCase()).includes(userRole.toLowerCase())) {
      return true;
    }

    // ❌ Access denied
    this.router.navigate(['/unauthorized']);
    return false;
  }
}
