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

  // Mapping role names to numeric IDs
  roleMapping: { [key: string]: number } = {
    Admin: 1,
    Manager: 2,
    Employee: 3
  };

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

  get f() {
    return this.registerForm.controls;
  }

  onSubmit() {
    if (this.registerForm.invalid) return;

    this.isSubmitting = true;
    this.errorMessage = '';

    const formValue = this.registerForm.value;

    // Convert role name to corresponding numeric ID
    const payload = {
      name: formValue.name,
      email: formValue.email,
      role: this.roleMapping[formValue.role]
    };

    this.authService.register(payload).subscribe({
      next: (res) => {
        console.log(res); // "Employee created successfully"
        alert(res);
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error(err);
        this.errorMessage = 'Registration failed.';
      }
    });

  }
}
