// dashboard.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProjectSummary } from '../../Models/ProjectSummary';
export interface TaskChartData {
  status: string;
  count: number;
}
@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private baseUrl = 'https://localhost:7192/api/dashboard';

  constructor(private http: HttpClient) { }

  getProjectSummary(projectId: number): Observable<ProjectSummary> {
    return this.http.get<ProjectSummary>(`${this.baseUrl}/project-summary/${projectId}`);
  }
  getTaskChartData(projectId: number): Observable<TaskChartData[]> {
    return this.http.get<TaskChartData[]>(`${this.baseUrl}/task-chart/${projectId}`);
  }
}
