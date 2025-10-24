// task.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from '../../../Models/Task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private baseUrl = 'https://localhost:7192/api/tasks';

  constructor(private http: HttpClient) { }

  getTasks(projectId: number, status?: string, assigneeId?: number, page = 1, pageSize = 10): Observable<Task[]> {
    let params = new HttpParams().set('page', page).set('pageSize', pageSize);
    if (status) params = params.set('status', status);
    if (assigneeId) params = params.set('assigneeId', assigneeId);
    return this.http.get<Task[]>(`${this.baseUrl}/projects/${projectId}/tasks`, { params });
  }

  getTaskById(taskId: number): Observable<Task> {
    return this.http.get<Task>(`${this.baseUrl}/tasks/${taskId}`);
  }

  createTask(projectId: number, task: Task): Observable<Task> {
    return this.http.post<Task>(`${this.baseUrl}/projects/${projectId}/tasks`, task);
  }

  updateTask(taskId: number, task: Partial<Task>): Observable<any> {
    return this.http.put(`${this.baseUrl}/tasks/${taskId}`, task);
  }

  deleteTask(taskId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/tasks/${taskId}`);
  }
}
