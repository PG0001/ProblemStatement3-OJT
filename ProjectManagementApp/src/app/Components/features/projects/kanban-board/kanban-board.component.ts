// kanban-board.component.ts
import { Component, Input, OnInit } from '@angular/core';
import { Task } from '../../../../Models/Task';
import { TaskService } from '../../../../Services/core/services/task.service';

@Component({
  selector: 'app-kanban-board',
  templateUrl: './kanban-board.component.html',
  styleUrls: ['./kanban-board.component.css']
})
export class KanbanBoardComponent implements OnInit {
  @Input() projectId!: number;

  tasks: Task[] = [];
  columns = ['To Do', 'In Progress', 'Review', 'Done'];
  isLoading = true;
  errorMessage = '';

  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
    if (this.projectId) {
      this.loadTasks();
    }
  }

  loadTasks() {
    this.isLoading = true;
    this.taskService.getTasks(this.projectId).subscribe({
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


  getTasksByStatus(status: string): Task[] {
    return this.tasks.filter(t => t.status === status);
  }

  // Optional: update task status when moved to another column
  updateTaskStatus(taskId: number, newStatus: string) {
    const task = this.tasks.find(t => t.taskId === taskId);
    if (!task) return;
    const updatedTask: Partial<Task> = {
      ...task,
      status: 'In Progress' as 'In Progress' // cast to correct union type
    };
    this.taskService.updateTask(taskId, updatedTask).subscribe({
      next: () => this.loadTasks(),
      error: err => console.error(err)
    });
  }
}
