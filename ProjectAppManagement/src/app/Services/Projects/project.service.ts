import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProjectSummary } from '../../Models/ProjectSummary';
import { Project } from '../../Models/Project';

interface PaginatedResult<T> {
  items: T[];
  totalCount: number;
}

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private baseUrl = 'https://localhost:7192/api/projects';

  constructor(private http: HttpClient) { }

  // ✅ Updated to handle pagination + search properly
  getProjects(page = 1, pageSize = 10, search = ''): Observable<PaginatedResult<Project>> {
    let params = new HttpParams()
      .set('page', page)
      .set('pageSize', pageSize)
      .set('search', search);

    return this.http.get<PaginatedResult<Project>>(this.baseUrl, { params });
  }

  getProject(id: number): Observable<Project> {
    return this.http.get<Project>(`${this.baseUrl}/${id}`);
  }

  createProject(project: Partial<Project>): Observable<Project> {
    return this.http.post<Project>(this.baseUrl, project);
  }

  updateProject(id: number, project: Partial<Project>): Observable<Project> {
    return this.http.put<Project>(`${this.baseUrl}/${id}`, project);
  }

  deleteProject(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  getProjectSummary(projectId: number): Observable<ProjectSummary> {
    return this.http.get<ProjectSummary>(
      `https://localhost:7192/api/dashboard/project-summary/${projectId}`
    );
  }
}
