import { NgModule } from '@angular/core';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './Components/Auth/login/login.component';
import { RegisterComponent } from './Components/Auth/register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ProjectListComponent } from './Components/Features/projects/project-list/project-list.component';
import { ProjectFormComponent } from './Components/Features/projects/project-form/project-form.component';
import { ProjectsDashboardComponent } from './Components/Features/projects/projects-dashboard/projects-dashboard.component';
import { AuthInterceptor } from './Services/interceptors/auth-interceptor.service';
import { TaskFormComponent } from './Components/Features/Tasks/task-form/task-form.component';
import { TaskListComponent } from './Components/Features/Tasks/task-list/task-list.component';
import { TaskDashboardComponent } from './Components/Features/Tasks/task-dashboard/task-dashboard.component';
import { TaskDetailComponent } from './Components/Features/Tasks/task-detail/task-detail.component';
import { DashboardSummaryComponent } from './Components/Features/DashboardSummary/dashboardsummary/dashboardsummary.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { NavbarComponent } from './Components/shared/navbar/navbar.component';
import { UnauthorizedComponent } from './Components/shared/unauthorized/unauthorized.component';
import { EmployeeDashboardComponent } from './Components/Employee/employee-dashboard/employee-dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ProjectListComponent,
    ProjectFormComponent,
    ProjectsDashboardComponent,
    TaskDashboardComponent,
    TaskFormComponent,
    TaskListComponent,
    TaskDetailComponent,
    DashboardSummaryComponent,
    NavbarComponent,
    EmployeeDashboardComponent
    
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    NgxPaginationModule,
    //NgChartsModule,
    DragDropModule,
    UnauthorizedComponent
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
