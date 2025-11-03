import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TaskService } from '../../../../Services/Tasks/task.service';
import { Task } from '../../../../Models/Task';
import { EmployeeService } from '../../../../Services/Employees/employee.service';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent implements OnInit {
  @Input() projectId!: number;
  @Input() taskId: number | null = null;
  @Output() closeForm = new EventEmitter<void>();

  taskForm!: FormGroup;
  isEditMode = false;
  employees: any[] = [];

  constructor(
    private fb: FormBuilder,
    private taskService: TaskService,
    private employeeService: EmployeeService
  ) { }

  ngOnInit(): void {
    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      assignedToId: [null], // 👈 renamed to match Task interface
      priority: ['Medium'],
      status: ['To Do'],
      dueDate: ['']
    });

    this.loadEmployees();

    if (this.taskId) {
      this.isEditMode = true;
      this.loadTask();
    }
  }

  loadEmployees() {
    this.employeeService.getEmployees().subscribe({
      next: (data) => (this.employees = data),
      error: (err) => console.error('Error fetching employees:', err)
    });
  }

  loadTask() {
    this.taskService.getTaskById(this.taskId!).subscribe({
      next: (task: Task) => {
        const formattedDueDate = task.dueDate ? task.dueDate.split('T')[0] : '';
        this.taskForm.patchValue({
          title: task.title,
          description: task.description,
          priority: task.priority,
          status: task.status,
          dueDate: formattedDueDate,
          assignedToId: task.assignedToId || null
        });
      },
      error: (err) => {
        console.error('Error loading task:', err);
        alert('❌ Failed to load task details.');
      }
    });
  }

  onSubmit() {
    if (this.taskForm.invalid) {
      alert('⚠️ Please fill out all required fields.');
      return;
    }

    const formValue = this.taskForm.value;

    // Build payload cleanly
    const taskData: any = {
      title: formValue.title,
      description: formValue.description,
      status: formValue.status || 'To Do',
      priority: formValue.priority || 'Medium',
      dueDate: formValue.dueDate
    };

    // ✅ Only include assignedToId if it's not null or empty
    if (formValue.assignedToId && formValue.assignedToId !== '') {
      taskData.assignedToId = formValue.assignedToId;
    }

    if (this.isEditMode && this.taskId) {
      this.taskService.updateTask(this.taskId, taskData).subscribe({
        next: () => {
          alert('✅ Task updated successfully!');
          this.closeForm.emit();
        },
        error: (err) => {
          console.error('Error updating task:', err);
          alert('❌ Failed to update task. Please try again.');
        }
      });
    } else {
      const newTask: any = {
        projectId: this.projectId,
        title: formValue.title,
        description: formValue.description,
        status: formValue.status || 'To Do',
        priority: formValue.priority || 'Medium',
        dueDate: formValue.dueDate,
        createdDate: new Date().toISOString()
      };

      // ✅ Again, only add assignedToId if valid
      if (formValue.assignedToId && formValue.assignedToId !== '') {
        newTask.assignedToId = formValue.assignedToId;
      }

      this.taskService.createTask(this.projectId, newTask).subscribe({
        next: () => {
          alert('✅ Task created successfully!');
          this.closeForm.emit();
        },
        error: (err) => {
          console.error('Error creating task:', err);
          alert('❌ Failed to create task. Please check project or assignee.');
        }
      });
    }
  }

  cancel() {
    this.closeForm.emit();
  }
}
