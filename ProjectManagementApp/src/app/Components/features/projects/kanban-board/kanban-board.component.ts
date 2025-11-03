import { Component, OnInit } from '@angular/core';
import { Task } from '../../../../Models/Task';
import { TaskService } from '../../../../Services/core/services/task.service';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

type TaskStatus = 'To Do' | 'In Progress' | 'Review' | 'Done'; // ✅ add this

@Component({
  selector: 'app-kanban-board',
  templateUrl: './kanban-board.component.html',
  styleUrls: ['./kanban-board.component.css']
})
export class KanbanBoardComponent implements OnInit {
  projectId = 1;
  tasks: Task[] = [];
  selectedTaskId?: number;
  showTaskDetail = false;

  // ✅ Use Record to ensure strong typing
  groupedTasks: Record<TaskStatus, Task[]> = {
    'To Do': [],
    'In Progress': [],
    'Review': [],
    'Done': []
  };

  // ✅ A typed list of statuses (instead of string[])
  readonly statuses: TaskStatus[] = ['To Do', 'In Progress', 'Review', 'Done'];

  constructor(private taskService: TaskService) { }

  ngOnInit() {
    this.loadTasks();
  }

  loadTasks() {
    this.taskService.getTasksByProject(this.projectId).subscribe({
      next: (res) => {
        this.tasks = res;
        this.groupByStatus();
      },
      error: (err) => console.error('Error loading tasks', err)
    });
  }

  groupByStatus() {
    for (const status of this.statuses) {
      this.groupedTasks[status] = this.tasks.filter(t => t.status === status);
    }
  }
  openTaskDetail(taskId: number) {
    this.selectedTaskId = taskId;
    this.showTaskDetail = true;
  }

  drop(event: CdkDragDrop<Task[]>, newStatus: TaskStatus) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      const movedTask = event.previousContainer.data[event.previousIndex];
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );

      movedTask.status = newStatus;
      this.taskService.updateTask(movedTask.taskId, { status: newStatus }).subscribe({
        next: () => console.log(`Task moved to ${newStatus}`),
        error: (err) => console.error('Update failed', err)
      });
    }
  }
}
