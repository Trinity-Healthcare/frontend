import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgSelectModule } from "@ng-select/ng-select";
import { TableModule } from 'ngx-easy-table';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';
import { NgxSmartModalModule, NgxSmartModalService } from 'ngx-smart-modal';
import { JwtHelperService, JWT_OPTIONS } from "@auth0/angular-jwt";
import { httpInterceptorProviders } from "./services/auth/auth-interceptor";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { NavComponent } from "./nav/nav.component";
import { HomeComponent } from "./user/home/home.component";
import { ActivitiesComponent } from "./user/activities/activities.component";

import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { TabViewModule } from 'primeng/tabview';
import { InputTextModule } from 'primeng/inputtext';

import { CalendarComponent } from "./user/calendar/calendar.component";
import { LoginComponent } from "./user/login/login.component";
import { RegisterComponent } from "./user/register/register.component";
import { ForgotPasswordComponent } from "./forgot-password/forgot-password.component";
import { ResetPasswordComponent } from "./reset-password/reset-password.component";

import { AdminPatientsComponent } from "./admin/admin-patients/admin-patients.component";
import { AdminDashboardComponent } from "./admin/admin-dashboard/admin-dashboard.component";
import { AdminTaskViewComponent } from "./admin/admin-dashboard/admin-task-view/admin-task-view.component";
import { AdminUserViewComponent } from "./admin/admin-dashboard/admin-user-view/admin-user-view.component";
import { AdminAdminsViewComponent } from "./admin/admin-dashboard/admin-admins-view/admin-admins-view.component";
import { AdminReduxComponent } from './admin/admin-redux/admin-redux.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AdminEventViewComponent } from './admin/admin-dashboard/admin-event-view/admin-event-view.component';
import { AdminDialogComponent } from './admin/admin-dialog/admin-dialog.component';

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
    AdminPatientsComponent,
    AdminDashboardComponent,
    AdminTaskViewComponent,
    AdminUserViewComponent,
    AdminAdminsViewComponent,
    AdminEventViewComponent,
    AdminReduxComponent,
    NotFoundComponent,
    AdminDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgSelectModule,
    NgxSmartModalModule.forRoot(),
    FormlyModule.forRoot(),
    FormlyBootstrapModule,
    ReactiveFormsModule,
    TableModule,
    FormsModule,
    FormsModule,
    DialogModule,
    BrowserAnimationsModule,
    ButtonModule,
    TabViewModule,
    CommonModule,
    InputTextModule,
  ],
  providers: [
    httpInterceptorProviders,
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    JwtHelperService,
    NgxSmartModalService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
