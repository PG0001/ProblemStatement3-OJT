// comment.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Comment } from '../../../Models/Comment';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private baseUrl = 'https://localhost:7192/api';

  constructor(private http: HttpClient) { }

  getComments(taskId: number): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${this.baseUrl}/tasks/${taskId}/comments`);
  }

  addComment(taskId: number, payload: { content: string }): Observable<Comment> {
    return this.http.post<Comment>(`${this.baseUrl}/tasks/${taskId}/comments`, payload);
  }
}
