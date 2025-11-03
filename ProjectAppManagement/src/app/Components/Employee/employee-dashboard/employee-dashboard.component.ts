import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeeService } from '../../../Services/Employees/employee.service';
import { Employee } from '../../../Models/Employee';
import { AuthService } from '../../../Services/Auth/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.css']
})
export class EmployeeDashboardComponent implements OnInit {
  employees: Employee[] = [];
  isLoading = true;
  registerForm!: FormGroup;
  showRegisterForm = false; // 👈 Toggle flag

  constructor(
    private employeeService: EmployeeService,
    private authService: AuthService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.loadEmployees();
  }

  initForm(): void {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      role: ['', [Validators.required]]
    });
  }

  loadEmployees(): void {
    this.isLoading = true;
    this.employeeService.getEmployees().subscribe({
      next: (data) => {
        console.log('✅ Employees loaded:', data);
        this.employees = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('❌ Error fetching employees:', err);
        this.isLoading = false;
      }
    });
  }

  toggleRegisterForm(): void {
    this.showRegisterForm = !this.showRegisterForm;
  }

  onRegister(): void {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    const payload = this.registerForm.value;
    const employeeData = {
      name: payload.name,
      email: payload.email,
      role: Number(payload.role)
    };

    console.log('📤 Registering employee:', employeeData);

    this.authService.register(employeeData).subscribe({
      next: (res) => {
        Swal.fire({
          title: 'Employee Registered!',
          text: 'The employee has been successfully added.',
          icon: 'success',
          confirmButtonColor: '#007bff'
        });

        this.registerForm.reset();
        this.showRegisterForm = false;
        this.loadEmployees();
      },
      error: (err) => {
        console.error('❌ Error registering employee:', err);
        Swal.fire({
          title: 'Registration Failed',
          text: err.error || 'Something went wrong.',
          icon: 'error',
          confirmButtonColor: '#dc3545'
        });
      }
    });
  }
}

