// comment.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TaskComment } from '../../Models/Comment';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private baseUrl = 'https://localhost:7192/api';

  constructor(private http: HttpClient) { }

  getComments(taskId: number): Observable<TaskComment[]> {
    return this.http.get<TaskComment[]>(`${this.baseUrl}/tasks/${taskId}/comments`);
  }

  addComment(taskId: number, payload: { text: string }): Observable<TaskComment> {
    const employeeId = sessionStorage.getItem('employeeId');
    return this.http.post<TaskComment>(`${this.baseUrl}/tasks/${taskId}/comments?EmpID=${employeeId}`, payload);
  }
}
