import { Component, OnInit } from "@angular/core";
import { UserService } from "src/app/services/user.service";

@Component({
  selector: "app-admin-user-view",
  templateUrl: "./admin-user-view.component.html",
  styleUrls: ["./admin-user-view.component.css"]
})
export class AdminUserViewComponent implements OnInit {
  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userService.getUsers().subscribe(
      data => {
        console.log(data);
      },
      error => {
        console.log(error);
      }
    );
  }
}
