import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, tap } from 'rxjs';

export interface LoginResponse {
  token: string;
  employeeId: number;
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
  private tokenSubject = new BehaviorSubject<string | null>(sessionStorage.getItem('token'));
  private employeeIdSubject = new BehaviorSubject<number | null>(
    sessionStorage.getItem('employeeId') ? Number(sessionStorage.getItem('employeeId')) : null
  );

  token$ = this.tokenSubject.asObservable();
  employeeId$ = this.employeeIdSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) { }

  // 🔹 LOGIN
  login(payload: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.baseUrl}/login`, payload).pipe(
      tap(res => {
        this.setSession(res.token, res.employeeId);
      })
    );
  }

  // 🔹 REGISTER
  register(payload: RegisterRequest): Observable<RegisterResponse> {
    console.log(payload)
    var resp = this.http.post<RegisterResponse>(`${this.baseUrl}/register`, payload, { responseType: 'text' as 'json' });
    console.log(resp)
    return resp;
  }

  // 🔹 SET SESSION
  // 🔹 SET SESSION (Safe)
  private setSession(token?: string, employeeId?: number): void {
    if (!token) {
      console.warn('⚠️ No token provided — skipping session storage.');
      return;
    }

    this.tokenSubject.next(token);
    sessionStorage.setItem('token', token);

    if (employeeId !== undefined && employeeId !== null) {
      this.employeeIdSubject.next(employeeId);
      sessionStorage.setItem('employeeId', employeeId.toString());
    } else {
      console.warn('⚠️ No employeeId provided — session set with token only.');
    }
  }

  // 🔹 GETTERS
  getToken(): string | null {
    return this.tokenSubject.value;
  }

  getEmployeeId(): number | null {
    return this.employeeIdSubject.value;
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  // 🔹 LOGOUT
  logout(): void {
    this.tokenSubject.next(null);
    this.employeeIdSubject.next(null);
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('employeeId');
    this.router.navigate(['/login']);
  }
}
