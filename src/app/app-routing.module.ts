/* 
 *  Copyright (C) 2019 Prime Inc - All Rights Reserved
 *  Unauthorized use of this file and its contents, via any medium is strictly prohibited.
 *  Authored by the Missouri State University Computer Science Department
 *  Fall 2019 CSC 450 - Group 2
 */

import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./user/home/home.component";
import { LoginComponent } from "./user/login/login.component";
import { RegisterComponent } from "./user/register/register.component";
import { ForgotPasswordComponent } from "./forgot-password/forgot-password.component";
import { AuthGuardService as AuthGuard } from "./services/auth/auth-guard.service";
import { RoleGuardService } from "./services/auth/role-guard-service.service";
import { LoginGuardService } from "./services/auth/login-guard.service";
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
    path: "forgot",
    component: ForgotPasswordComponent
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