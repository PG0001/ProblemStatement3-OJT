// src/app/Services/core/services/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

export interface LoginResponse {
  token: string;
  employeeId: number;
  role?: string | number;
}

export interface LoginRequest {
  email: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  role: number;
}

export interface RegisterResponse {
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'https://localhost:7192/api/Authentication';

  // 🔹 Existing subjects
  private tokenSubject = new BehaviorSubject<string | null>(sessionStorage.getItem('token'));
  private employeeIdSubject = new BehaviorSubject<number | null>(
    sessionStorage.getItem('employeeId') ? Number(sessionStorage.getItem('employeeId')) : null
  );

  // 🔹 NEW subject for login status
  private loggedInSubject = new BehaviorSubject<boolean>(!!sessionStorage.getItem('token'));
  isLoggedIn$ = this.loggedInSubject.asObservable();

  token$ = this.tokenSubject.asObservable();
  employeeId$ = this.employeeIdSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) { }

  // 🔹 LOGIN
  login(payload: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.baseUrl}/login`, payload).pipe(
      tap(res => {
        console.log('Login response:', res);
        this.setSession(res.token, res.employeeId, res.role);
      })
    );
  }

  // 🔹 REGISTER
  register(payload: RegisterRequest): Observable<RegisterResponse> {
    return this.http.post<RegisterResponse>(`${this.baseUrl}/register`, payload, {
      responseType: 'text' as 'json'
    });
  }

  // 🔹 SET SESSION
  private setSession(token?: string, employeeId?: number, role?: any): void {
    if (!token) {
      console.warn('⚠️ No token provided — skipping session storage.');
      return;
    }

    this.tokenSubject.next(token);
    sessionStorage.setItem('token', token);

    if (employeeId !== undefined && employeeId !== null) {
      this.employeeIdSubject.next(employeeId);
      sessionStorage.setItem('employeeId', employeeId.toString());
    }

    if (role) {
      const roleString = this.mapRole(role);
      sessionStorage.setItem('role', roleString);
    } else {
      const decoded: any = jwtDecode(token);
      if (decoded['role']) {
        sessionStorage.setItem('role', decoded['role']);
      }
    }

    // ✅ Update login state
    this.loggedInSubject.next(true);
  }

  private mapRole(role: any): string {
    if (typeof role === 'string') return role;
    switch (Number(role)) {
      case 1: return 'Admin';
      case 2: return 'Manager';
      case 3: return 'Employee';
      default: return 'Employee';
    }
  }

  getToken(): string | null {
    return this.tokenSubject.value;
  }

  getEmployeeId(): number | null {
    return this.employeeIdSubject.value;
  }

  getUserRole(): string | null {
    const storedRole = sessionStorage.getItem('role');
    if (storedRole) return storedRole;

    const token = this.getToken();
    if (!token) return null;

    try {
      const decoded: any = jwtDecode(token);
      console.log('Decoded token for role:', decoded);
      return decoded['role'] || null;
    } catch (e) {
      console.error('Error decoding token:', e);
      return null;
    }
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  // 🔹 LOGOUT
  logout(): void {
    this.tokenSubject.next(null);
    this.employeeIdSubject.next(null);
    sessionStorage.clear();

    // ✅ Update login state
    this.loggedInSubject.next(false);

    this.router.navigate(['/login']);
  }
}
