// task-detail.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Task } from '../../../../Models/Task';
import { TaskService } from '../../../../Services/core/services/task.service';

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.css']
})
export class TaskDetailComponent implements OnInit {
  taskId!: number;
  task?: Task;
  isLoading = true;
  errorMessage = '';

  constructor(
    private route: ActivatedRoute,
    private taskService: TaskService
  ) { }

  ngOnInit(): void {
    this.taskId = Number(this.route.snapshot.paramMap.get('taskId'));
    if (this.taskId) {
      this.loadTask();
    } else {
      this.errorMessage = 'Invalid task ID';
      this.isLoading = false;
    }
  }

  loadTask() {
    this.isLoading = true;
    this.taskService.getTaskById(this.taskId).subscribe({
      next: (res) => {
        this.task = res;
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = err.error || 'Failed to load task';
        this.isLoading = false;
      }
    });
  }
}
