import { Injectable } from "@angular/core";
import { AuthService } from "./auth.service";
import { Router } from "@angular/router";
import { TokenStorageService } from "./token-storage.service";

@Injectable({
  providedIn: "root"
})
export class LoginGuardService {
  authorities: any;
  admin: boolean = false;

  constructor(
    public auth: AuthService,
    public router: Router,
    private token: TokenStorageService
  ) {}

  canActivate(): boolean {
    this.authorities = this.token.getAuthorities();
    if (
      this.authorities == "ROLE_ADMIN" ||
      this.authorities == "ROLE_MODERATOR"
    ) {
      this.admin = true;
    }

    if (this.auth.isAuthenticated()) {
      if (this.admin) {
        this.router.navigate(["admin-dashboard"]);
      } else {
        this.router.navigate(["/"]);
      }
      return false;
    }
    return true;
  }
}
