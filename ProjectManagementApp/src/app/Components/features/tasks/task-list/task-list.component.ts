import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { TaskService } from '../../../../Services/core/services/task.service';
import { Task } from '../../../../Models/Task';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  @Input() projectId: number = 0;

  tasks: Task[] = [];
  loading = true;
  errorMessage = '';
  selectedStatus = '';
  selectedAssigneeId?: number;

  page = 1;
  pageSize = 10;

  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.loading = true;
    this.errorMessage = '';

    this.taskService.getTasks(this.projectId, this.selectedStatus, this.selectedAssigneeId, this.page, this.pageSize)
      .subscribe({
        next: (data) => {
          console.log('Tasks loaded:', data);
          this.tasks = Array.isArray(data) ? data : [];
          this.loading = false;
        },

        error: (err) => {
          console.error('Task load error:', err);
          // Try to extract message safely
          if (err.error?.message) {
            this.errorMessage = err.error.message;
          } else if (typeof err.error === 'string') {
            this.errorMessage = err.error;
          } else {
            this.errorMessage = 'Failed to load tasks';
          }
          this.loading = false;
        }
      });
  }


  onStatusChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const value = selectElement.value;
    console.log('Selected status:', value);

    this.selectedStatus = value;  // ✅ correct variable
    this.loadTasks();
  }


  onPageChange(page: number): void {
    this.page = page;
    this.loadTasks();
  }
}
