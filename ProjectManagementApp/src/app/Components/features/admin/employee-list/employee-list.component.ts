// employee-list.component.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeService } from '../../../../Services/core/services/employee.service';
import { Employee } from '../../../../Models/Employee';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  employees: Employee[] = [];
  isLoading = true;
  errorMessage = '';

  constructor(private employeeService: EmployeeService, private router: Router) { }

  ngOnInit(): void {
    this.loadEmployees();
  }

  loadEmployees() {
    this.isLoading = true;
    this.employeeService.getEmployees().subscribe({
      next: (res) => {
        this.employees = res;
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = err.error || 'Error fetching employees';
        this.isLoading = false;
      }
    });
  }

  deleteEmployee(employeeId: number) {
    if (confirm('Are you sure you want to delete this employee?')) {
      this.employeeService.deleteEmployee(employeeId).subscribe({
        next: () => this.loadEmployees(),
        error: (err) => this.errorMessage = err.error || 'Failed to delete employee'
      });
    }
  }

  editEmployee(employeeId: number) {
    this.router.navigate(['/admin/employees/edit', employeeId]);
  }

  createEmployee() {
    this.router.navigate(['/admin/employees/create']);
  }
}
