import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommentService } from '../../../../Services/Comments/comment.service';
import { TaskService } from '../../../../Services/Tasks/task.service';
import { TaskComment } from '../../../../Models/Comment';
import { Task } from '../../../../Models/Task'; // ✅ Make sure you have this model
@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.css']
})
export class TaskDetailComponent implements OnInit {
  @Input() taskId!: number;

  task?: Task; // ✅ store task details
  comments: TaskComment[] = [];
  newComment = '';
  loadingComments = false;
  loadingTask = false;

  constructor(
    private route: ActivatedRoute,
    private taskService: TaskService,
    private commentService: CommentService
  ) { }

  ngOnInit(): void {
    const taskId = this.route.snapshot.paramMap.get('taskId');

    console.log('Loaded taskId from route:', taskId);
    if (taskId) {
      this.loadTaskDetails(+taskId);
    }
  }

  loadTaskDetails(taskId: number): void {
    this.loadingTask = true;
    this.taskService.getTaskById(taskId).subscribe({
      next: (task) => {
        this.task = task;
        this.taskId = task.taskId!;
        this.loadComments();
        this.loadingTask = false;
      },
      error: () => {
        console.error('Failed to load task details');
        this.loadingTask = false;
      }
    });
  }

  goBack(): void {
    window.history.back();
  }

  loadComments(): void {
    this.loadingComments = true;
    this.commentService.getComments(this.taskId).subscribe({
      next: (res) => {
        this.comments = res.sort(
          (a, b) =>
            new Date(b.createdAt ?? '').getTime() -
            new Date(a.createdAt ?? '').getTime()
        );
        console.log('Comments loaded:', this.comments);
        this.loadingComments = false;
      },
      error: () => {
        console.error('Failed to load comments');
        this.loadingComments = false;
      }
    });
  }

  addComment(): void {
    if (!this.newComment.trim()) return;

    const comment = { text: this.newComment };
    this.commentService.addComment(this.taskId, comment).subscribe({
      next: (res) => {
        this.comments.unshift(res);
        this.newComment = '';
      },
      error: () => console.error('Failed to add comment')
    });
  }
}
