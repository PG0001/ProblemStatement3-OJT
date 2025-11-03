// comment-list.component.ts
import { Component, Input, OnInit } from '@angular/core';
import { CommentService } from '../../../../Services/core/services/comment.service';
import { Comment } from '../../../../Models/Comment'; 
@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.css']
})
export class CommentListComponent implements OnInit {
  @Input() taskId!: number;

  @Input() projectId!: number;
  comments: Comment[] = [];
  isLoading = true;
  errorMessage = '';

  constructor(private commentService: CommentService) { }

  ngOnInit(): void {
    if (this.taskId) {
      this.loadComments();
    }
  }

  loadComments() {
    this.isLoading = true;
    this.commentService.getComments(this.taskId).subscribe({
      next: (res) => {
        this.comments = res;
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = err.error || 'Failed to load comments';
        this.isLoading = false;
      }
    });
  }

  // Called by CommentCreateComponent when a new comment is added
  refreshComments() {
    this.loadComments();
  }
}
