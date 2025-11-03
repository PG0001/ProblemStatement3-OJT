import { Component, OnInit } from '@angular/core';
import { Project } from '../../../../Models/Project';
import { ProjectService } from '../../../../Services/Projects/project.service';
import { ProjectSummary } from '../../../../Models/ProjectSummary';

@Component({
  selector: 'app-projects-dashboard',
  templateUrl: './projects-dashboard.component.html',
  styleUrls: ['./projects-dashboard.component.css']
})

export class ProjectsDashboardComponent {
  showForm = false; // controls form visibility
  selectedProjectId: number | null = null;

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
