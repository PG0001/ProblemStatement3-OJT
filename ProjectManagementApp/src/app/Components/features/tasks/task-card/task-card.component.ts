import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Task } from '../../../../Models/Task';

@Component({
  selector: 'app-task-card',
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.css']
})
export class TaskCardComponent {
  @Input() task!: Task;
  @Output() openDetail = new EventEmitter<number>();

  onOpenDetail() {
    this.openDetail.emit(this.task.taskId);
  }

  getStatusColor(): string {
    switch (this.task.status) {
      case 'To Do': return '#ffc107';
      case 'In Progress': return '#17a2b8';
      case 'Review': return '#6f42c1';
      case 'Done': return '#28a745';
      default: return '#ccc';
    }
  }
}
