// task-list.component.ts
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Task } from '../../../../Models/Task';
import { TaskService } from '../../../../Services/core/services/task.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  @Input() projectId!: number;

  tasks: Task[] = [];
  isLoading = true;
  errorMessage = '';

  searchStatus: string = '';
  assigneeId?: number;

  page: number = 1;
  pageSize: number = 10;

  constructor(
    private taskService: TaskService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks() {
    this.isLoading = true;
    this.taskService.getTasks(this.projectId, this.searchStatus, this.assigneeId, this.page, this.pageSize)
      .subscribe({
        next: (res) => {
          this.tasks = res;
          this.isLoading = false;
        },
        error: (err) => {
          this.errorMessage = err.error || 'Failed to load tasks';
          this.isLoading = false;
        }
      });
  }

  filterTasks() {
    this.page = 1; // reset page
    this.loadTasks();
  }

  viewTask(taskId: number) {
    this.router.navigate(['/tasks', taskId]);
  }
}
