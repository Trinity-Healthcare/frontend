import { Component, OnInit, Input } from "@angular/core";
import { UserService } from "src/app/services/user.service";

import * as xlsx from "xlsx";
import * as filesaver from "file-saver";
import { FullUser } from "src/app/services/full-user";

@Component({
  selector: "app-admin-user-view",
  templateUrl: "./admin-user-view.component.html",
  styleUrls: ["./admin-user-view.component.css"]
})
export class AdminUserViewComponent implements OnInit {
  @Input() user: FullUser;
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
