import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Components/features/auth/login/login.component';
import { RegisterComponent } from './Components/features/auth/register/register.component';
import { EmployeeListComponent } from './Components/features/admin/employee-list/employee-list.component';
import { EmployeeCreateComponent } from './Components/features/admin/employee-create/employee-create.component';
import { ProjectListComponent } from './Components/features/projects/project-list/project-list.component';
import { ProjectCreateComponent } from './Components/features/projects/project-create/project-create.component';
import { ProjectDetailComponent } from './Components/features/projects/project-detail/project-detail.component';
import { TaskListComponent } from './Components/features/tasks/task-list/task-list.component';
import { TaskCreateComponent } from './Components/features/tasks/task-create/task-create.component';
import { TaskDetailComponent } from './Components/features/tasks/task-detail/task-detail.component';
import { DashboardSummaryComponent } from './Components/features/dashboard/dashboard-summary/dashboard-summary.component';
import { DashboardChartsComponent } from './Components/features/dashboard/dashboard-charts/dashboard-charts.component';
import { AuthGuard } from './Components/Guard/auth-guard/auth-guard.component';
const routes: Routes = [
  { path: '', redirectTo: '/projects', pathMatch: 'full' },

  // Auth
  { path: 'auth/login', component: LoginComponent },
  { path: 'auth/register', component: RegisterComponent },

  // Admin
  { path: 'admin/employees', component: EmployeeListComponent, canActivate: [AuthGuard], data: { roles: ['Admin'] } },
  { path: 'admin/employees/create', component: EmployeeCreateComponent, canActivate: [AuthGuard], data: { roles: ['Admin'] } },

  // Projects
  { path: 'projects', component: ProjectListComponent, canActivate: [AuthGuard] },
  { path: 'projects/create', component: ProjectCreateComponent, canActivate: [AuthGuard] },
  { path: 'projects/:id', component: ProjectDetailComponent, canActivate: [AuthGuard] },

  // Tasks
  { path: 'tasks', component: TaskListComponent, canActivate: [AuthGuard] },
  { path: 'tasks/create', component: TaskCreateComponent, canActivate: [AuthGuard] },
  { path: 'tasks/:id', component: TaskDetailComponent, canActivate: [AuthGuard] },

  // Dashboard
  { path: 'dashboard/:projectId', component: DashboardSummaryComponent, canActivate: [AuthGuard] },
  { path: 'dashboard-charts/:projectId', component: DashboardChartsComponent, canActivate: [AuthGuard] },

  // Wildcard
  { path: '**', redirectTo: '/projects' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
