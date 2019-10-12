import { Component, OnInit } from "@angular/core";
import { UsertaskService } from "../services/usertask/usertask.service";
import { UserService } from "../services/user.service";
import { TokenStorageService } from "../services/auth/token-storage.service";
import { UserTaskInfo } from "../services/usertask/usertask-info";
import { RetrievedUserTaskInfo } from "../services/usertask/retrievedUserTask-info";
import { UserNameInfo } from "../services/username-info";

@Component({
  selector: "app-history",
  templateUrl: "./history.component.html",
  styleUrls: ["./history.component.css"]
})
export class HistoryComponent implements OnInit {
  info: any;
  usertasks: RetrievedUserTaskInfo[];

  constructor(
    private userTaskService: UsertaskService,
    private userService: UserService,
    private token: TokenStorageService
  ) {}

  ngOnInit() {
    this.info = {
      token: this.token.getToken(),
      username: this.token.getUsername(),
      authorities: this.token.getAuthorities()
    };
    let username = new UserNameInfo(this.info.username);
    this.userTaskService.getHistory(username).subscribe(
      data => {
        console.log(data);
        this.usertasks = data;
      },
      error => {
        console.log(error);
      }
    );
  }
}
