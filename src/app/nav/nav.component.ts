import { Component, OnInit } from "@angular/core";
import * as $ from "jquery";
import { TokenStorageService } from "../services/auth/token-storage.service";
import { JwtHelperService } from "@auth0/angular-jwt";
import { AuthService } from "../services/auth/auth.service";
@Component({
  selector: "app-nav",
  templateUrl: "./nav.component.html",
  styleUrls: ["./nav.component.css"]
})
export class NavComponent implements OnInit {
  public loggedin: boolean;
  public admin: boolean = false;
  tokenInfo: any;

  constructor(
    private token: TokenStorageService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.tokenInfo = {
      token: this.token.getToken(),
      username: this.token.getUsername(),
      authorities: this.token.getAuthorities()
    };

    this.loggedin = this.authService.isAuthenticated();

    if (this.tokenInfo.authorities == "ROLE_ADMIN") {
      this.admin = true;
    }
  }


  logout() {
    this.token.signOut();
    window.location.reload();
  }
}
