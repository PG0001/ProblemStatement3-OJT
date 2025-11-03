import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Components/features/auth/login/login.component';
import { RegisterComponent } from './Components/features/auth/register/register.component';
import { DashboardSummaryComponent } from './Components/features/dashboard/dashboard-summary/dashboard-summary.component';
import { DashboardChartsComponent } from './Components/features/dashboard/dashboard-charts/dashboard-charts.component';
import { ProjectListComponent } from './Components/features/projects/project-list/project-list.component';
import { ProjectDetailComponent } from './Components/features/projects/project-detail/project-detail.component';
import { ProjectCreateComponent } from './Components/features/projects/project-create/project-create.component';
import { TaskListComponent } from './Components/features/tasks/task-list/task-list.component';
import { TaskCreateComponent } from './Components/features/tasks/task-create/task-create.component';
import { TaskDetailComponent } from './Components/features/tasks/task-detail/task-detail.component';
import { EmployeeListComponent } from './Components/features/admin/employee-list/employee-list.component';
import { EmployeeCreateComponent } from './Components/features/admin/employee-create/employee-create.component';
import { AuthGuard } from './Components/Guard/auth-guard/auth-guard.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  {
    path: '',
    canActivate: [AuthGuard],
    children: [
      { path: 'dashboard', component: DashboardSummaryComponent },
      { path: 'dashboard/charts', component: DashboardChartsComponent },
      { path: 'projects', component: ProjectListComponent },
      { path: 'project/create', component: ProjectCreateComponent },
      { path: 'project/:id', component: ProjectDetailComponent },
      { path: 'tasks', component: TaskListComponent },
      { path: 'task/create', component: TaskCreateComponent },
      { path: 'task/:id', component: TaskDetailComponent },
      { path: 'employees', component: EmployeeListComponent },
      { path: 'employee/create', component: EmployeeCreateComponent },
    ],
  },

  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
