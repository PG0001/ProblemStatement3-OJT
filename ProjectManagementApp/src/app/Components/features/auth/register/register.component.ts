// register.component.ts
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../../Services/core/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm: FormGroup;
  roles = ['Admin', 'Manager', 'Employee'];
  isSubmitting = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      role: ['Employee', Validators.required] // default to Employee
    });
  }

  get f() { return this.registerForm.controls; }

  onSubmit() {
    if (this.registerForm.invalid) return;

    this.isSubmitting = true;
    this.errorMessage = '';

    const payload = this.registerForm.value;
    this.authService.register(payload).subscribe({
      next: () => {
        this.isSubmitting = false;
        alert('Employee registered successfully!');
        this.router.navigate(['/projects']); // redirect after success
      },
      error: (err) => {
        this.isSubmitting = false;
        this.errorMessage = err.error || 'Registration failed';
      }
    });
  }
}
