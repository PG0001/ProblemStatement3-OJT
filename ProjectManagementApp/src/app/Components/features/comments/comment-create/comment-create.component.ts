// comment-create.component.ts
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommentService } from '../../../../Services/core/services/comment.service';
import { AuthService } from '../../../../Services/core/services/auth.service';

@Component({
  selector: 'app-comment-create',
  templateUrl: './comment-create.component.html',
  styleUrls: ['./comment-create.component.css']
})
export class CommentCreateComponent {
  @Input() taskId!: number;          // ID of the task to comment on
  @Output() commentAdded = new EventEmitter<void>(); // notify parent to refresh comments

  commentForm: FormGroup;
  isSubmitting = false;
  errorMessage = '';

  constructor(private fb: FormBuilder, private commentService: CommentService, private authService: AuthService) {
    this.commentForm = this.fb.group({
      content: ['', [Validators.required, Validators.minLength(3)]]
    });
  }

  get f() { return this.commentForm.controls; }

  onSubmit() {
    if (this.commentForm.invalid || !this.taskId) return;

    const employeeId = this.authService.getEmployeeId();
    if (!employeeId) return alert('Employee not logged in');

    this.isSubmitting = true;
    this.errorMessage = '';

    this.commentService.addComment(this.taskId, this.commentForm.value).subscribe({
      next: () => {
        this.isSubmitting = false;
        this.commentForm.reset();
        this.commentAdded.emit(); // notify parent component
      },
      error: (err) => {
        this.isSubmitting = false;
        this.errorMessage = err.error || 'Failed to add comment';
      }
    });
  }
}
