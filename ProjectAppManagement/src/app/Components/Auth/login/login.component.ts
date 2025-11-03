import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../Services/Auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  isSubmitting = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    // ✅ Redirect if already logged in
    if (this.authService.isLoggedIn()) {
      const role = this.authService.getUserRole();
      this.redirectBasedOnRole(role);
    }

    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  get f() {
    return this.loginForm.controls;
  }

  onSubmit(): void {
    if (this.loginForm.invalid) return;

    this.isSubmitting = true;
    this.errorMessage = '';

    this.authService.login(this.loginForm.value).subscribe({
      next: res => {
        console.log('✅ Login response:', res);
        this.isSubmitting = false;

        // ✅ Redirect based on role after login
        const role = this.authService.getUserRole();
        this.redirectBasedOnRole(role);
      },
      error: err => {
        console.error('❌ Login failed:', err);
        this.isSubmitting = false;
        this.errorMessage = err.error?.message || 'Invalid email or user not found.';
      }
    });
  }

  // ✅ Smart redirection based on role
  private redirectBasedOnRole(role: string | null): void {
    switch (role) {
      case 'Admin':
      case 'Manager':
        this.router.navigate(['/projects']);
        break;
      case 'Employee':
        // If you have a route like `/projects/:id/tasks`, you can navigate accordingly
        this.router.navigate(['/projects']);
        break;
      default:
        this.router.navigate(['/unauthorized']);
        break;
    }
  }
}
