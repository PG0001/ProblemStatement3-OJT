import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Project } from '../../../../Models/Project';
import { ProjectService } from '../../../../Services/Projects/project.service';
import { Router } from '@angular/router';
import { AuthService } from '../../../../Services/Auth/auth.service';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent implements OnInit {
  projects: Project[] = [];

  searchTerm: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 8;
  totalItems: number = 0;
  userRole: string | null = null;

  @Output() editProject = new EventEmitter<number>();

  constructor(private projectService: ProjectService, private router: Router, private authservice: AuthService) { }

  ngOnInit(): void {
    this.loadProjects();
    this.userRole = this.authservice.getUserRole();
  }

  loadProjects() {
    this.projectService.getProjects(this.currentPage, this.itemsPerPage, this.searchTerm)
      .subscribe((response: any) => {
        this.projects = response.items;
        this.totalItems = response.totalCount;
      });
  }

  // Called when user types in search box
  onSearchChange() {
    this.currentPage = 1;
    this.loadProjects();
  }



  get totalPages(): number {
    return Math.ceil(this.totalItems / this.itemsPerPage);
  }

  get pagesArray(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  onEdit(id: number) {
    this.editProject.emit(id);
  }

  goToTasks(projectId: number) {
    this.router.navigate(['/projects', projectId, 'tasks']);
  }

  onDelete(id: number) {
    if (confirm('Are you sure you want to delete this project?')) {
      this.projectService.deleteProject(id).subscribe(() => {
        this.loadProjects();
      });
    }
  }
  startPage = 1;
  endPage = 1;
  visiblePages: number[] = [];

  updateVisiblePages() {
    const totalVisible = 5; // max pages to show at once
    this.startPage = Math.max(1, this.currentPage - Math.floor(totalVisible / 2));
    this.endPage = Math.min(this.totalPages, this.startPage + totalVisible - 1);

    // Adjust if near the end
    if (this.endPage - this.startPage + 1 < totalVisible) {
      this.startPage = Math.max(1, this.endPage - totalVisible + 1);
    }

    this.visiblePages = Array.from({ length: this.endPage - this.startPage + 1 }, (_, i) => this.startPage + i);
  }

  changePage(page: number) {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
    this.loadProjects(); // your method to fetch projects
    this.updateVisiblePages();
  }

  // Call updateVisiblePages() after loading projects and setting totalPages

}
