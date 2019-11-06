import { Injectable } from "@angular/core";
import { CanActivate, Router, ActivatedRouteSnapshot } from "@angular/router";
import { AuthService } from "./auth.service";
import decode from "jwt-decode";
import { TokenStorageService } from "./token-storage.service";

@Injectable({
  providedIn: "root"
})
export class RoleGuardService implements CanActivate {
  constructor(
    public auth: AuthService,
    public router: Router,
    private tokenStorage: TokenStorageService
  ) {}
  canActivate(route: ActivatedRouteSnapshot): boolean {
    let expectedRole: boolean = false;
    const token = localStorage.getItem(this.tokenStorage.getToken()); //*
    // const tokenPayload = decode(token);
    expectedRole = false;
    for (let i = 0; i < route.data.expectedRole.length; i++) {
      if (this.tokenStorage.getAuthority() == route.data.expectedRole[i]) {
        expectedRole = true;
      }
    }
    if (!this.auth.isAuthenticated() || expectedRole != true) {
      this.router.navigate(["login"]);
      return false;
    }
    return true;
  }
}
