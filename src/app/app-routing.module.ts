import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HelloworldComponent } from "./helloworld/helloworld.component";
import { HomeComponent } from "./user/home/home.component";
import { ActivitiesComponent } from "./user/activities/activities.component";
import { CalendarComponent } from "./user/calendar/calendar.component";
import { TeamsComponent } from "./user/teams/teams.component";
import { PatientsComponent } from "./admin/patients/patients.component";
import { LoginComponent } from "./user/login/login.component";
import { RegisterComponent } from "./user/register/register.component";
import { ProfileComponent } from "./user/profile/profile.component";
import { ForgotPasswordComponent } from "./forgot-password/forgot-password.component";
import { ResetPasswordComponent } from "./reset-password/reset-password.component";

const routes: Routes = [
  { path: "home", component: HomeComponent },
  { path: "", redirectTo: "/home", pathMatch: "full" },
  { path: "activities", component: ActivitiesComponent },
  { path: "calendar", component: CalendarComponent },
  { path: "teams", component: TeamsComponent },
  { path: "patients", component: PatientsComponent },
  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent },
  { path: "profile", component: ProfileComponent },
  { path: "reset", component: ResetPasswordComponent },
  { path: "forgot", component: ForgotPasswordComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
