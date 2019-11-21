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

import { CalendarComponent } from "./user/calendar/calendar.component";
import { LoginComponent } from "./user/login/login.component";
import { RegisterComponent } from "./user/register/register.component";
import { ForgotPasswordComponent } from "./forgot-password/forgot-password.component";
import { ResetPasswordComponent } from "./reset-password/reset-password.component";

import { AdminReduxComponent } from './admin/admin-redux/admin-redux.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AdminDialogComponent } from './admin/admin-dialog/admin-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    CalendarComponent,
    LoginComponent,
    RegisterComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    AdminReduxComponent,
    NotFoundComponent,
    AdminDialogComponent,
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
    BrowserAnimationsModule,
    CommonModule,
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
