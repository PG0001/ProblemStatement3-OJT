import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

interface LoginResponse { token: string; employeeId: number; } // include employeeId
interface LoginRequest { email: string; }
interface RegisterRequest { name: string; email: string; role: string; }
interface RegisterResponse { message: string; }

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'https://localhost:7192/api/Authentication';
  private tokenSubject = new BehaviorSubject<string | null>(localStorage.getItem('token'));
  private employeeIdSubject = new BehaviorSubject<number | null>(
    localStorage.getItem('employeeId') ? Number(localStorage.getItem('employeeId')) : null
  );

  token$ = this.tokenSubject.asObservable();
  employeeId$ = this.employeeIdSubject.asObservable();

  constructor(private http: HttpClient) { }

  login(payload: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.baseUrl}/login`, payload)
      .pipe(tap(res => {
        this.tokenSubject.next(res.token);
        this.employeeIdSubject.next(res.employeeId);
        console.log('Login successful, token and employeeId stored.');
        localStorage.setItem('token', res.token);
        localStorage.setItem('employeeId', res.employeeId.toString());
      }));
  }

  register(payload: RegisterRequest): Observable<RegisterResponse> {
    return this.http.post<RegisterResponse>(`${this.baseUrl}/register`, payload);
  }

  getToken(): string | null {
    return this.tokenSubject.value;
  }

  getEmployeeId(): number | null {
    return this.employeeIdSubject.value;
  }

  setToken(token: string, employeeId: number ) {
    this.tokenSubject.next(token);
    this.employeeIdSubject.next(employeeId);

    localStorage.setItem('token', token);
    localStorage.setItem('employeeId', employeeId.toString());
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  logout() {
    this.tokenSubject.next(null);
    this.employeeIdSubject.next(null);

    localStorage.removeItem('token');
    localStorage.removeItem('employeeId');
  }
}
