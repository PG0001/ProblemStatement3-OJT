import { Component, EventEmitter, Input, OnChanges, SimpleChanges, Output } from '@angular/core';
import { TaskService } from '../../../../Services/Tasks/task.service';
import { Task } from '../../../../Models/Task';
import { AuthService } from '../../../../Services/Auth/auth.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnChanges {
  @Input() projectId!: number;
  @Input() refreshKey!: number;
  @Output() editTask = new EventEmitter<number>();
  @Output() deleteTask = new EventEmitter<number>();

  tasks: Task[] = [];
  filteredTasks: Task[] = [];
  paginatedTasks: Task[] = [];

  // 🔍 Filtering
  searchTerm: string = '';

  // 📄 Pagination
  currentPage = 1;
  itemsPerPage = 5;
  totalPages = 0;
  pagesArray: number[] = [];
  userRole: string | null = null;

  constructor(private taskService: TaskService, private authservice: AuthService) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['refreshKey'] || changes['projectId']) {
      this.loadTasks();
    }
    this.userRole = this.authservice.getUserRole();
  }

  loadTasks(): void {
    if (!this.projectId) return;
    this.taskService.getTasks(this.projectId).subscribe({
      next: (data) => {
        this.tasks = data;
        this.applyFilterAndPagination();
      },
      error: (err) => console.error('❌ Error loading tasks:', err),
    });
  }

  // 🔍 Filter logic
  onSearchChange(): void {
    this.currentPage = 1;
    this.applyFilterAndPagination();
  }
  applyFilterAndPagination(): void {
    const term = this.searchTerm.toLowerCase();

    this.filteredTasks = this.tasks.filter(t =>
      (t.title && t.title.toLowerCase().includes(term)) ||
      (t.status && t.status.toLowerCase().includes(term)) ||
      (t.priority && t.priority.toLowerCase().includes(term))
    );

    this.totalPages = Math.ceil(this.filteredTasks.length / this.itemsPerPage);
    this.pagesArray = Array.from({ length: this.totalPages }, (_, i) => i + 1);
    this.paginatedTasks = this.filteredTasks.slice(
      (this.currentPage - 1) * this.itemsPerPage,
      this.currentPage * this.itemsPerPage
    );
  }

  changePage(page: number): void {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
    this.applyFilterAndPagination();
  }

  onEdit(taskId: number): void {
    this.editTask.emit(taskId);
  }

  onDelete(taskId: number): void {
    this.deleteTask.emit(taskId);
  }
}
