import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs';
import { Task } from '../../../Models/Task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private baseUrl = 'https://localhost:7192/api/tasks';

  constructor(private http: HttpClient) { }

  // ✅ Get all tasks for a project
  getTasks(
    projectId: number,
    status?: string,
    assigneeId?: number,
    page = 1,
    pageSize = 10
  ): Observable<Task[]> {

    // 🛑 Don't even make the request if projectId is invalid
    if (!projectId || projectId <= 0) {
      return of([]); // immediately return an empty array
    }

    let params = new HttpParams()
      .set('page', page)
      .set('pageSize', pageSize);

    if (status) params = params.set('status', status);
    if (assigneeId) params = params.set('assigneeId', assigneeId);

    return this.http
      .get<Task[] | { message: string }>(
        `https://localhost:7192/api/projects/${projectId}/tasks`,
        { params }
      )
      .pipe(
        map((response) => {
          // If backend sends an object with "message", just return empty
          if (!Array.isArray(response)) {
            return [];
          }
          return response;
        }),
        catchError(() => {
          // 🧹 No console.error — completely silent
          return of([]); // always return a safe empty array
        })
      );
  }

  // ✅ Get task details
  getTaskById(taskId: number): Observable<Task> {
    return this.http.get<Task>(`${this.baseUrl}/${taskId}`);
  }

  // ✅ Create a new task under a project
  createTask(projectId: number, task: Task): Observable<Task> {
    return this.http.post<Task>(`https://localhost:7192/api/projects/${projectId}`, task);
  }
  // ✅ task.service.ts
  getTasksByProject(projectId: number): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.baseUrl}/projects/${projectId}/tasks`);
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
