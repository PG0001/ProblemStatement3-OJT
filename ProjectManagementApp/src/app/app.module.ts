import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './Components/features/auth/login/login.component';
import { RegisterComponent } from './Components/features/auth/register/register.component';
import { ProjectListComponent } from './Components/features/projects/project-list/project-list.component';
import { ProjectDetailComponent } from './Components/features/projects/project-detail/project-detail.component';
import { KanbanBoardComponent } from './Components/features/projects/kanban-board/kanban-board.component';
import { ProjectCreateComponent } from './Components/features/projects/project-create/project-create.component';
import { EmployeeCreateComponent } from './Components/features/admin/employee-create/employee-create.component';
import { EmployeeListComponent } from './Components/features/admin/employee-list/employee-list.component';
import { CommentCreateComponent } from './Components/features/comments/comment-create/comment-create.component';
import { CommentListComponent } from './Components/features/comments/comment-list/comment-list.component';
import { DashboardChartsComponent } from './Components/features/dashboard/dashboard-charts/dashboard-charts.component';
import { DashboardSummaryComponent } from './Components/features/dashboard/dashboard-summary/dashboard-summary.component';
import { TaskCardComponent } from './Components/features/tasks/task-card/task-card.component';
import { TaskCreateComponent } from './Components/features/tasks/task-create/task-create.component';
import { TaskDetailComponent } from './Components/features/tasks/task-detail/task-detail.component';
import { ConfirmationDialogComponent } from './Components/shared/components/confirmation-dialog/confirmation-dialog.component';
import { LoaderComponent } from './Components/shared/components/loader/loader.component';
import { SidebarComponent } from './Components/shared/components/sidebar/sidebar.component';
import { ToastNotificationComponent } from './Components/shared/components/toast-notification/toast-notification.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgChartsModule } from 'ng2-charts';
import { TaskListComponent } from './Components/features/tasks/task-list/task-list.component';
import { NavBarComponent } from './Components/shared/components/navbar/navbar.component';
import { AuthGuard } from './Components/Guard/auth-guard/auth-guard.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ProjectListComponent,
    ProjectDetailComponent,
    ProjectCreateComponent,
    KanbanBoardComponent,
    TaskCardComponent,
    TaskDetailComponent,
    TaskCreateComponent,
    CommentListComponent,
    CommentCreateComponent,
    DashboardSummaryComponent,
    DashboardChartsComponent,
    EmployeeListComponent,
    EmployeeCreateComponent,
    SidebarComponent,
    LoaderComponent,
    ConfirmationDialogComponent,
    ToastNotificationComponent,
    TaskListComponent,
    NavBarComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    NgChartsModule
  ],
   
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
