import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectService } from '../../../../Services/core/services/project.service';

@Component({
  selector: 'app-project-create',
  templateUrl: './project-create.component.html',
  styleUrls: ['./project-create.component.css']
})
export class ProjectCreateComponent implements OnInit {
  projectForm!: FormGroup;
  isEdit = false;
  projectId!: number;
  isSubmitting = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private projectService: ProjectService
  ) { }

  ngOnInit(): void {
    this.projectForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      description: [''],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      managerId: ['', Validators.required]
    });

    this.projectId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.projectId) {
      this.isEdit = true;
      this.loadProject();
    }
  }

  get f() {
    return this.projectForm.controls;
  }

  loadProject() {
    this.projectService.getProject(this.projectId).subscribe({
      next: (data) => this.projectForm.patchValue(data),
      error: (err) => console.error('Error loading project', err)
    });
  }

  onSubmit() {
    if (this.projectForm.invalid) return;

    this.isSubmitting = true;
    const payload = this.projectForm.value;

    const request$ = this.isEdit
      ? this.projectService.updateProject(this.projectId, payload)
      : this.projectService.createProject(payload);

    request$.subscribe({
      next: () => {
        this.isSubmitting = false;
        alert(this.isEdit ? 'Project updated!' : 'Project created!');
        this.router.navigate(['/projects']);
      },
      error: (err) => {
        this.isSubmitting = false;
        console.error('Error saving project', err);
        alert('Failed to save project.');
      }
    });
  }
}
