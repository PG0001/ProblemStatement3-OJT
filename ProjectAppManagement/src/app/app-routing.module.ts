import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Components/Auth/login/login.component';
import { RegisterComponent } from './Components/Auth/register/register.component';
import { ProjectsDashboardComponent } from './Components/Features/projects/projects-dashboard/projects-dashboard.component';
import { ProjectFormComponent } from './Components/Features/projects/project-form/project-form.component';
import { TaskDashboardComponent } from './Components/Features/Tasks/task-dashboard/task-dashboard.component';
import { TaskFormComponent } from './Components/Features/Tasks/task-form/task-form.component';
import { TaskDetailComponent } from './Components/Features/Tasks/task-detail/task-detail.component';
import { DashboardSummaryComponent } from './Components/Features/DashboardSummary/dashboardsummary/dashboardsummary.component';
import { RoleGuard } from './guards/role.guard';
import { EmployeeDashboardComponent } from './Components/Employee/employee-dashboard/employee-dashboard.component';

const routes: Routes = [
  // Default redirect
  { path: '', redirectTo: 'Login', pathMatch: 'full' },

  // Auth routes
  { path: 'Login', component: LoginComponent },
  { path: 'Register', component: RegisterComponent },
  { path: 'Employee', component: EmployeeDashboardComponent },

  // Unauthorized page
  {
    path: 'unauthorized',
    loadComponent: () =>
      import('./Components/shared/unauthorized/unauthorized.component').then(
        (m) => m.UnauthorizedComponent
      ),
  },

  // ✅ Project routes (protected for Manager/Admin)
  {
    path: 'projects',
    component: ProjectsDashboardComponent,
    canActivate: [RoleGuard],
    data: { roles: ['Manager', 'Admin','Employee'] },
  },
  {
    path: 'projects/add',
    component: ProjectFormComponent,
    canActivate: [RoleGuard],
    data: { roles: ['Manager', 'Admin'] },
  },
  {
    path: 'projects/edit/:id',
    component: ProjectFormComponent,
    canActivate: [RoleGuard],
    data: { roles: ['Manager', 'Admin'] },
  },
  {
    path: 'projects/dashboard/:projectId',
    component: DashboardSummaryComponent,
    canActivate: [RoleGuard],
    data: { roles: ['Manager', 'Admin', 'Employee'] },
  },

  // ✅ Task routes (protected for Employee/Manager/Admin)
  {
    path: 'projects/:projectId/tasks',
    component: TaskDashboardComponent,
    canActivate: [RoleGuard],
    data: { roles: ['Employee', 'Manager', 'Admin'] },
  },
  {
    path: 'projects/:projectId/tasks/add',
    component: TaskFormComponent,
    canActivate: [RoleGuard],
    data: { roles: ['Manager', 'Admin'] },
  },
  {
    path: 'projects/:projectId/tasks/edit/:id',
    component: TaskFormComponent,
    canActivate: [RoleGuard],
    data: { roles: ['Manager', 'Admin'] },
  },
  {
    path: 'projects/:projectId/tasks/detail/:taskId',
    component: TaskDetailComponent,
    canActivate: [RoleGuard],
    data: { roles: ['Employee', 'Manager', 'Admin'] },
  },

  // Wildcard route
  { path: '**', redirectTo: 'Login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
