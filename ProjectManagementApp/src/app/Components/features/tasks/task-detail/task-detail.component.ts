import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { TaskService } from '../../../../Services/core/services/task.service';
import { Task } from '../../../../Models/Task';
import { CommentService } from '../../../../Services/core/services/comment.service';

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.css']
})
export class TaskDetailComponent implements OnChanges {
  @Input() taskId!: number | null;
  task: Task | null = null;
  comments: any[] = [];
  newComment = '';
  loading = false;

  constructor(
    private taskService: TaskService,
    private commentService: CommentService
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['taskId'] && this.taskId) {
      this.loadTaskDetail();
      this.loadComments();
    }
  }

  loadTaskDetail() {
    if (!this.taskId) return;
    this.loading = true;
    this.taskService.getTaskById(this.taskId).subscribe({
      next: (data) => {
        this.task = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading task:', err);
        this.loading = false;
      }
    });
  }

  loadComments() {
    if (!this.taskId) return;
    this.commentService.getComments(this.taskId).subscribe({
      next: (data) => (this.comments = data),
      error: (err) => console.error('Error loading comments:', err)
    });
  }

  addComment() {
    if (!this.taskId || !this.newComment.trim()) return;
    this.commentService.addComment(this.taskId, { content: this.newComment }).subscribe({
      next: () => {
        this.newComment = '';
        this.loadComments();
      },
      error: (err) => console.error('Failed to add comment:', err)
    });

  }
}
