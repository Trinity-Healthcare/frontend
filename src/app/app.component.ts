/* 
 *  Copyright (C) 2019 Prime Inc - All Rights Reserved
 *  Unauthorized use of this file and its contents, via any medium is strictly prohibited.
 *  Authored by the Missouri State University Computer Science Department
 *  Fall 2019 CSC 450 - Group 2
 */

import { Component } from "@angular/core";
import { TokenStorageService } from "./services/auth/token-storage.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  title = "Prime Wellness";
  private roles: string[];
  private authority: string;
  public currentYear = (new Date()).getFullYear();

  constructor(private tokenStorage: TokenStorageService) {}

  ngOnInit() {
    if (this.tokenStorage.getToken()) {
      this.roles = this.tokenStorage.getAuthorities();
      this.roles.every(role => {
        if (role === "ROLE_ADMIN") {
          this.authority = "admin";
          return false;
        } else if (role === "ROLE_MODERATOR") {
          this.authority = "moderator";
          return false;
        }
        this.authority = "user";
        return true;
      });
    }
  }
}
