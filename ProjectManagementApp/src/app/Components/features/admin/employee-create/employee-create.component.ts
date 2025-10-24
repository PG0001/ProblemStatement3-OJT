import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../../Services/core/services/auth.service';

@Component({
  selector: 'app-employee-create',
  templateUrl: './employee-create.component.html',
  styleUrls: ['./employee-create.component.css']
})

export class EmployeeCreateComponent {
  employeeForm: FormGroup;
  roles = ['Admin', 'Manager', 'Employee'];
  isSubmitting = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.employeeForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      role: ['Employee', Validators.required]  // default to Employee
    });
  }

  onSubmit() {
    if (this.employeeForm.invalid) return;

    this.isSubmitting = true;
    this.errorMessage = '';

    const payload = this.employeeForm.value;
    this.authService.register(payload).subscribe({
      next: () => {
        this.isSubmitting = false;
        alert('Employee created successfully!');
        this.router.navigate(['/admin/employees']); // navigate to employee list
      },
      error: (err) => {
        this.isSubmitting = false;
        this.errorMessage = err.error || 'Something went wrong';
      }
    });
  }

  get f() {
    return this.employeeForm.controls;
  }
}
