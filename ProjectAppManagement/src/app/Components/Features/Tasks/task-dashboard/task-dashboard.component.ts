import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { ActivatedRoute, Router } from '@angular/router';
import { Task } from '../../../../Models/Task';
import { TaskService } from '../../../../Services/Tasks/task.service';
import { Project } from '../../../../Models/Project';
import { ProjectService } from '../../../../Services/Projects/project.service';
import { AuthService } from '../../../../Services/Auth/auth.service';

@Component({
  selector: 'app-task-dashboard',
  templateUrl: './task-dashboard.component.html',
  styleUrls: ['./task-dashboard.component.css']
})
export class TaskDashboardComponent implements OnInit {
  projectId!: number;
  project: Project | null = null;

  tasks: Task[] = [];
  columns: Task['status'][] = ['To Do', 'In Progress', 'Review', 'Done'];

  isFormVisible = false;
  selectedTaskId: number | null = null;
  refreshKey = 0;
  userRole: string | null = null;
  constructor(
    private route: ActivatedRoute,
    private authservice: AuthService,
    private taskService: TaskService,
    private projectService: ProjectService,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.projectId = Number(this.route.snapshot.paramMap.get('projectId'));
    if (this.projectId) {
      this.loadProjectDetails();
      this.loadTasks();
    }
    this.userRole = this.authservice.getUserRole();
  }

  // ✅ Fetch project details by ID
  loadProjectDetails(): void {
    this.projectService.getProject(this.projectId).subscribe({
      next: (data: Project) => (this.project = data),
      error: () => console.error('Failed to load project details')
    });
  }

  // ✅ Fetch all tasks for the project
  loadTasks(): void {
    this.taskService.getTasksByProject(this.projectId).subscribe({
      next: (data: Task[]) => (this.tasks = data),
      error: () => console.error('Failed to load tasks')
    });
  }

  getTasksByStatus(status: Task['status']): Task[] {
    return this.tasks.filter(t => t.status === status);
  }

  openTaskForm(taskId?: number) {
    this.selectedTaskId = taskId || null;
    this.isFormVisible = true;
  }

  onFormClosed() {
    this.isFormVisible = false;
    this.selectedTaskId = null;
    this.loadTasks(); // ✅ Refresh task list after closing form
    this.refreshKey++; 
  }

  editTask(taskId: number) {
    this.openTaskForm(taskId);
  }

  deleteTask(taskId: number) {
    if (confirm('Are you sure you want to delete this task?')) {
      this.taskService.deleteTask(taskId).subscribe(() => {
        this.loadTasks()
        this.refreshKey++;
      });
    }
  }
  openTaskDetail(taskId: number) {
    console.log(`Navigating to task detail for task ID: ${taskId}`);
    console.log(this.projectId);
    this.router.navigate([`/projects/${this.projectId}/tasks/detail`, taskId]);

  }
  drop(event: CdkDragDrop<Task[]>, newStatus: Task['status']) {
    if (event.previousContainer === event.container) {
      // Moving within the same column
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      // Moving to another column
      const task = event.previousContainer.data[event.previousIndex];
      const previousStatus = task.status;

      // Update locally first
      task.status = newStatus;

      // Move task visually right away (optimistic update)
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );

      // ✅ Send the full updated task to backend
      this.taskService.updateTask(task.taskId, task).subscribe({
        next: () => {
          console.log(`✅ Task ${task.taskId} moved to ${newStatus}`);
          // Refresh from backend after a short delay (for sync)
          setTimeout(() => this.loadTasks(), 300);
          this.refreshKey++; 
        },
        error: (err) => {
          console.error('❌ Failed to update task:', err);
          // Roll back to old state if update fails
          task.status = previousStatus;
          this.loadTasks();
        }
      });
    }
  }

}
