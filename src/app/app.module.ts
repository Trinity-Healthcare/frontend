import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { NgSelectModule } from '@ng-select/ng-select';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import { httpInterceptorProviders } from './services/auth/auth-interceptor';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { HomeComponent } from './user/home/home.component';
import { ActivitiesComponent } from './user/activities/activities.component';

import { CalendarComponent } from './user/calendar/calendar.component';
import { LoginComponent } from './user/login/login.component';
import { RegisterComponent } from './user/register/register.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';

import { AdminTasksComponent } from './admin/admin-tasks/admin-tasks.component';
import { AdminPatientsComponent } from './admin/admin-patients/admin-patients.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { AdminTaskViewComponent } from './admin/admin-dashboard/admin-task-view/admin-task-view.component';
import { AdminUserViewComponent } from './admin/admin-dashboard/admin-user-view/admin-user-view.component';
import { AdminAdminsViewComponent } from './admin/admin-dashboard/admin-admins-view/admin-admins-view.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    ActivitiesComponent,
    CalendarComponent,
    LoginComponent,
    RegisterComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    AdminTasksComponent,
    AdminPatientsComponent,
    AdminDashboardComponent,
    AdminTaskViewComponent,
    AdminUserViewComponent,
    AdminAdminsViewComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgSelectModule,
    FormsModule,
  ],
  providers: [
    httpInterceptorProviders,
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    JwtHelperService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
