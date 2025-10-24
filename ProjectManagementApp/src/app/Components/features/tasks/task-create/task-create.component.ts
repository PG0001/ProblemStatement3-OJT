// task-create.component.ts
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TaskService } from '../../../../Services/core/services/task.service';
import { AuthService } from '../../../../Services/core/services/auth.service';

@Component({
  selector: 'app-task-create',
  templateUrl: './task-create.component.html',
  styleUrls: ['./task-create.component.css']
})
export class TaskCreateComponent {
  @Input() projectId!: number;
  @Output() taskCreated = new EventEmitter<void>();

  taskForm: FormGroup;
  isSubmitting = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private taskService: TaskService,
    private authService: AuthService
  ) {
    this.taskForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', Validators.required],
      assigneeId: [''],
      dueDate: ['', Validators.required],
      status: ['To Do', Validators.required]
    });
  }

  get f() { return this.taskForm.controls; }

  onSubmit() {
    if (this.taskForm.invalid) return;

    const employeeId = this.authService.getEmployeeId();
    if (!employeeId) {
      this.errorMessage = 'Employee not logged in';
      return;
    }

    this.isSubmitting = true;
    this.errorMessage = '';

    const payload = {
      ...this.taskForm.value,
      createdBy: employeeId
    };

    this.taskService.createTask(this.projectId, payload).subscribe({
      next: () => {
        this.isSubmitting = false;
        this.taskForm.reset({ status: 'To Do' });
        this.taskCreated.emit(); // notify parent to reload tasks
      },
      error: (err) => {
        this.isSubmitting = false;
        this.errorMessage = err.error || 'Failed to create task';
      }
    });
  }
}
