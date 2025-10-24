// login.component.ts
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../../Services/core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  isSubmitting = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  
  }

  get f() { return this.loginForm.controls; }
  onSubmit() {
    if (this.loginForm.invalid) return;

    this.isSubmitting = true;
    this.errorMessage = '';

    this.authService.login(this.loginForm.value).subscribe({
      next: (res) => {
        // res should contain both token and employeeId from backend
        this.authService.setToken(res.token, res.employeeId);

        this.isSubmitting = false;

        // Optional: check role if returned from backend
        // const isAdmin = res.role === 'Admin';

        this.router.navigate(['/projects']); // redirect to project list
      },
      error: (err) => {
        this.isSubmitting = false;
        this.errorMessage = err.error || 'Login failed';
      }
    });
  }

}
