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
    const expectedRole = route.data.expectedRole;
    const token = localStorage.getItem(this.tokenStorage.getToken()); //*
    // const tokenPayload = decode(token);
    if (
      !this.auth.isAuthenticated() ||
      this.tokenStorage.getAuthority() !== expectedRole
    ) {
      this.router.navigate(["login"]);
      return false;
    }
    return true;
  }
}
