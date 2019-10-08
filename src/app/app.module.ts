import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HelloworldComponent } from './helloworld/helloworld.component';
import { HttpClientModule } from '@angular/common/http';
import { NavComponent } from './nav/nav.component';
import { HomeComponent } from './user/home/home.component';
import { ActivitiesComponent } from './user/activities/activities.component';

import { TeamsComponent } from "./user/teams/teams.component";
import { CalendarComponent } from "./user/calendar/calendar.component";
import { LoginComponent } from "./user/login/login.component";
import { RegisterComponent } from "./user/register/register.component";
import { ProfileComponent } from "./user/profile/profile.component";
import { ForgotPasswordComponent } from "./forgot-password/forgot-password.component";
import { ResetPasswordComponent } from "./reset-password/reset-password.component";
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { FormsModule } from "@angular/forms";

import { httpInterceptorProviders } from "./services/auth/auth-interceptor";

import { JwtHelperService, JWT_OPTIONS } from "@auth0/angular-jwt";
import { AdminTasksComponent } from './admin/admin-tasks/admin-tasks.component';
import { AdminPatientsComponent } from './admin/admin-patients/admin-patients.component';

@NgModule({
  declarations: [
    AppComponent,
    HelloworldComponent,
    NavComponent,
    HomeComponent,
    ActivitiesComponent,
    TeamsComponent,
    CalendarComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    AdminTasksComponent,
    AdminPatientsComponent,
    DashboardComponent
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, FormsModule],
  providers: [
    httpInterceptorProviders,
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    JwtHelperService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
