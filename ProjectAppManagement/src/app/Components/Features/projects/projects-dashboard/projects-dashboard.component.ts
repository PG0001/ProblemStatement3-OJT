import { Component, OnInit } from '@angular/core';
import { Project } from '../../../../Models/Project';
import { ProjectService } from '../../../../Services/Projects/project.service';
import { ProjectSummary } from '../../../../Models/ProjectSummary';
import { AuthService } from '../../../../Services/Auth/auth.service';

@Component({
  selector: 'app-projects-dashboard',
  templateUrl: './projects-dashboard.component.html',
  styleUrls: ['./projects-dashboard.component.css']
})

export class ProjectsDashboardComponent implements OnInit {
  showForm = false; // controls form visibility
  selectedProjectId: number | null = null;
  userRole: string | null = null;
  constructor(private projectService: ProjectService, private authservice: AuthService) { }
  ngOnInit(): void 
    {
    this.userRole = this.authservice.getUserRole();
    }
  openAddForm() {
    this.selectedProjectId = null;
    this.showForm = true;
  }

  openEditForm(id: number) {
    this.selectedProjectId = id;
    this.showForm = true;
  }

  onFormClose() {
    this.showForm = false;
  }
}
