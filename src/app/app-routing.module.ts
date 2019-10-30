import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./user/home/home.component";
import { ActivitiesComponent } from "./user/activities/activities.component";
import { CalendarComponent } from "./user/calendar/calendar.component";
import { LoginComponent } from "./user/login/login.component";
import { RegisterComponent } from "./user/register/register.component";
import { ProfileComponent } from "./user/profile/profile.component";
import { ForgotPasswordComponent } from "./forgot-password/forgot-password.component";
import { ResetPasswordComponent } from "./reset-password/reset-password.component";
import { AuthGuardService as AuthGuard } from "./services/auth/auth-guard.service";
import { AdminDashboardComponent } from "./admin/admin-dashboard/admin-dashboard.component";
import { AdminPatientsComponent } from "./admin/admin-patients/admin-patients.component";
import { AdminTasksComponent } from "./admin/admin-tasks/admin-tasks.component";
import { RoleGuardService } from "./services/auth/role-guard-service.service";
import { LoginGuardService } from "./services/auth/login-guard.service";
import { HistoryComponent } from "./history/history.component";

const routes: Routes = [
  { path: "home", component: HomeComponent, canActivate: [AuthGuard] },
  {
    path: "",
    redirectTo: "/home",
    pathMatch: "full",
    canActivate: [AuthGuard]
  },
  {
    path: "activities",
    component: ActivitiesComponent,
    canActivate: [AuthGuard]
  },
  { path: "calendar", component: CalendarComponent, canActivate: [AuthGuard] },
  {
    path: "login",
    component: LoginComponent,
    canActivate: [LoginGuardService]
  },
  {
    path: "register",
    component: RegisterComponent,
    canActivate: [LoginGuardService]
  },
  { path: "profile", component: ProfileComponent, canActivate: [AuthGuard] },
  {
    path: "reset",
    component: ResetPasswordComponent
  },
  {
    path: "forgot",
    component: ForgotPasswordComponent
  },
  {
    path: "adminpatients",
    component: AdminPatientsComponent,
    canActivate: [RoleGuardService],
    data: { expectedRole: "ROLE_ADMIN" }
  },
  {
    path: "admintasks",
    component: AdminTasksComponent,
    canActivate: [RoleGuardService],
    data: { expectedRole: "ROLE_ADMIN" }
  },
  {
    path: "history",
    component: HistoryComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "admindashboard",
    component: AdminDashboardComponent,
    canActivate: [RoleGuardService],
    data: { expectedRole: "ROLE_ADMIN" }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
