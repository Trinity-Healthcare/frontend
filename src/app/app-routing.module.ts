import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./user/home/home.component";
import { ActivitiesComponent } from "./user/activities/activities.component";
import { CalendarComponent } from "./user/calendar/calendar.component";
import { LoginComponent } from "./user/login/login.component";
import { RegisterComponent } from "./user/register/register.component";
import { ForgotPasswordComponent } from "./forgot-password/forgot-password.component";
import { ResetPasswordComponent } from "./reset-password/reset-password.component";
import { AuthGuardService as AuthGuard } from "./services/auth/auth-guard.service";
import { AdminDashboardComponent } from "./admin/admin-dashboard/admin-dashboard.component";
import { AdminPatientsComponent } from "./admin/admin-patients/admin-patients.component";
import { RoleGuardService } from "./services/auth/role-guard-service.service";
import { LoginGuardService } from "./services/auth/login-guard.service";
import { AdminAdminsViewComponent } from "./admin/admin-dashboard/admin-admins-view/admin-admins-view.component";
import { AdminTaskViewComponent } from "./admin/admin-dashboard/admin-task-view/admin-task-view.component";
import { AdminReduxComponent } from './admin/admin-redux/admin-redux.component';
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [
  { path: "home", 
    component: HomeComponent, 
    canActivate: [AuthGuard] 
  },
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
  { path: "calendar", 
    component: CalendarComponent, 
    canActivate: [AuthGuard] 
  },
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
    data: { expectedRole: ["ROLE_ADMIN", "ROLE_MODERATOR"] }
  },
  {
    path: "admin-dashboard/:selectedView",
    component: AdminDashboardComponent,
    canActivate: [RoleGuardService],
    data: { expectedRole: ["ROLE_ADMIN", "ROLE_MODERATOR"] }
  },
  {
    path: "admin-dashboard",
    redirectTo: "admin-dashboard/tasks",
    pathMatch: "full"
  },
  {
    path: "admin-redux",
    component: AdminReduxComponent,
    canActivate: [RoleGuardService],
    data: { expectedRole: ["ROLE_ADMIN", "ROLE_MODERATOR"] }
  },
  { path: '**', component: 
    NotFoundComponent 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}