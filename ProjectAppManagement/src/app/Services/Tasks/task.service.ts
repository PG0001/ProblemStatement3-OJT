import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs';
import { Task } from '../../Models/Task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private baseUrl = 'https://localhost:7192/api/tasks';
  private projectBaseUrl = 'https://localhost:7192/api/projects';

  constructor(private http: HttpClient) { }

  // ✅ Get all tasks for a specific project
  getTasksByProject(projectId: number): Observable<Task[]> {
    if (!projectId || projectId <= 0) return of([]);
    return this.http.get<Task[]>(`${this.projectBaseUrl}/${projectId}/tasks`).pipe(
      catchError(() => of([]))
    );
  }

  // ✅ Get tasks with filters (optional)
  getTasks(
    projectId: number,
    status?: string,
    assigneeId?: number,
    page = 1,
    pageSize = 10
  ): Observable<Task[]> {
    if (!projectId || projectId <= 0) return of([]);

    let params = new HttpParams()
      .set('page', page)
      .set('pageSize', pageSize);

    if (status) params = params.set('status', status);
    if (assigneeId) params = params.set('assigneeId', assigneeId);
    console.log(params.toString());
    console.log(`${this.projectBaseUrl}/${projectId}/tasks`);

    return this.http
      .get<Task[]>(`${this.projectBaseUrl}/${projectId}/tasks`, { params })
      .pipe(catchError(() => of([])));
  }

  // ✅ Get single task details
  getTaskById(taskId: number): Observable<Task> {
    return this.http.get<Task>(`${this.baseUrl}/${taskId}`);
  }

  // ✅ Create a new task under a specific project
  createTask(projectId: number, task: Task): Observable<Task> {
    return this.http.post<Task>(`${this.projectBaseUrl}/${projectId}/tasks`, task);
  }

  // ✅ Update a task
  updateTask(taskId: number, task: Partial<Task>): Observable<any> {
    return this.http.put(`${this.baseUrl}/${taskId}`, task);
  }

  // ✅ Delete a task
  deleteTask(taskId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${taskId}`);
  }
}
