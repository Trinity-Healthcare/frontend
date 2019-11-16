import { Component, OnInit } from "@angular/core";
import { UserService } from "src/app/services/user/user.service";
import { TokenStorageService } from "src/app/services/auth/token-storage.service";
import { UserInfo } from "src/app/services/user/user.info";

@Component({
  selector: "app-admin-patients",
  templateUrl: "./admin-patients.component.html",
  styleUrls: ["./admin-patients.component.css"]
})
export class AdminPatientsComponent implements OnInit {
  info: any;
  users: UserInfo[];
  constructor(
    private token: TokenStorageService
  ) {}

  ngOnInit() {
    this.info = {
      token: this.token.getToken(),
      username: this.token.getUsername(),
      authorities: this.token.getAuthorities()
    };
  }
}
