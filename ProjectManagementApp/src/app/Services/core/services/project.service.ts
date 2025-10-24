// project.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Project } from '../../../Models/Project';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private baseUrl = 'https://localhost:7192/api/Projects';

  constructor(private http: HttpClient) { }

  getProjects(page = 1, pageSize = 10, managerId?: number, search?: string): Observable<Project[]> {
    let params = new HttpParams().set('page', page).set('pageSize', pageSize);
    if (managerId) params = params.set('managerId', managerId);
    if (search) params = params.set('search', search);
    return this.http.get<Project[]>(this.baseUrl, { params });
  }

  getProjectById(id: number): Observable<Project> {
    return this.http.get<Project>(`${this.baseUrl}/${id}`);
  }

  createProject(project: Project): Observable<Project> {
    return this.http.post<Project>(this.baseUrl, project);
  }

  updateProject(id: number, project: Project): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, project);
  }

  deleteProject(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
