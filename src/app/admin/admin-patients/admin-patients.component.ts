import { Component, OnInit } from "@angular/core";
import { UserService } from "src/app/services/user.service";
import { TokenStorageService } from "src/app/services/auth/token-storage.service";
import { userInfo } from "src/app/services/user-info";

@Component({
  selector: "app-admin-patients",
  templateUrl: "./admin-patients.component.html",
  styleUrls: ["./admin-patients.component.css"]
})
export class AdminPatientsComponent implements OnInit {
  info: any;
  users: userInfo[];
  constructor(
    private userService: UserService,
    private token: TokenStorageService
  ) {}

  ngOnInit() {
    this.info = {
      token: this.token.getToken(),
      username: this.token.getUsername(),
      authorities: this.token.getAuthorities()
    };
    // this.userService.getUsers().subscribe(
    //   data => {
    //     this.users = data;
    //     console.log(data);
    //   },
    //   error => {
    //     console.log(error);
    //   }
    // );
  }
}
