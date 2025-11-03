import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Project } from '../../../../Models/Project';
import { ProjectService } from '../../../../Services/Projects/project.service';
import { AuthService } from '../../../../Services/Auth/auth.service';

@Component({
  selector: 'app-project-form',
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.css']
})
export class ProjectFormComponent implements OnInit {
  @Input() projectId: number | null = null;
  @Output() closeForm = new EventEmitter<void>();

  projectForm!: FormGroup;
  isEditMode = false;

  constructor(private fb: FormBuilder, private projectService: ProjectService, private authService: AuthService) { }

  ngOnInit(): void {
    this.projectForm = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      startDate: [''],
      endDate: ['']
    });


    if (this.projectId) {
      this.isEditMode = true;
      this.loadProject();
    }
  }

  loadProject() {
    this.projectService.getProject(this.projectId!).subscribe((project: Project) => {
      this.projectForm.patchValue(project);
    });
  }

  onSubmit() {

    if (this.projectForm.invalid) return;
    const employeeId = this.authService.getEmployeeId();


    if (!employeeId) {
      alert('Unable to identify logged-in manager. Please log in again.');
      return;
    }

    const projectPayload = {
      ...this.projectForm.value,
      managerId: employeeId
    };

    if (this.isEditMode) {
      this.projectService.updateProject(this.projectId!, projectPayload).subscribe(() => {
        alert('Project updated successfully!');
        this.closeForm.emit();
      });
    } else {
      this.projectService.createProject(projectPayload).subscribe(() => {
        alert('Project added successfully!');
        this.closeForm.emit();
      });
    }
  }


  cancel() {
    this.closeForm.emit();
  }
}
