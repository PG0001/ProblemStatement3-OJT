// task-card.component.ts
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Task } from '../../../../Models/Task';

@Component({
  selector: 'app-task-card',
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.css']
})
export class TaskCardComponent {
  @Input() task!: Task;
  @Input() showActions: boolean = true; // whether to show move buttons
  @Input() columns: string[] = ['To Do', 'In Progress', 'Review', 'Done'];

  @Output() statusChanged = new EventEmitter<{ taskId: number, newStatus: string }>();

  constructor() { }

  moveLeft() {
    const index = this.columns.indexOf(this.task.status);
    if (index > 0) {
      this.statusChanged.emit({ taskId: this.task.taskId, newStatus: this.columns[index - 1] });
    }
  }

  moveRight() {
    const index = this.columns.indexOf(this.task.status);
    if (index < this.columns.length - 1) {
      this.statusChanged.emit({ taskId: this.task.taskId, newStatus: this.columns[index + 1] });
    }
  }
}
