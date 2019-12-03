/* 
 *  Copyright (C) 2019 Prime Inc - All Rights Reserved
 *  Unauthorized use of this file and its contents, via any medium is strictly prohibited.
 *  Authored by the Missouri State University Computer Science Department
 *  Fall 2019 CSC 450 - Group 2
 */

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
      this.authorities.includes("ROLE_ADMIN") ||
      this.authorities.includes("ROLE_MODERATOR")
    ) {
      this.admin = true;
    }

    if (this.auth.isAuthenticated()) {
      if (this.admin) {
        this.router.navigate(["/admin"]);
      } else {
        this.router.navigate(["/"]);
      }
      return false;
    }
    return true;
  }
}
