import { Component, OnInit } from "@angular/core";
import {
  Task,
  TaskServiceService
} from "src/app/services/task/task-service.service";
import { RetrievedTask } from "src/app/services/task/retrievedTask-info";
import { UserService } from "src/app/services/user.service";
import { TokenStorageService } from "src/app/services/auth/token-storage.service";
import { UserTaskInfo } from "src/app/services/usertask/usertask-info";
import { userInfo } from "src/app/services/user-info";
import { UserNameInfo } from "src/app/services/username-info";
import { UsertaskService } from "src/app/services/usertask/usertask.service";
@Component({
  selector: "app-activities",
  templateUrl: "./activities.component.html",
  styleUrls: ["./activities.component.css"]
})
export class ActivitiesComponent implements OnInit {
  info: any;
  tasks: RetrievedTask[];
  user: any;
  userdata: any;
  displayText = "";
  failed = false;

  constructor(
    private taskService: TaskServiceService,
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
    this.taskService.getTasks().subscribe(response => {
      this.tasks = response;
    });
  }

  createUserTask(task) {
    console.log("task:");
    console.log(task);

    let photourl = "www.notawebsite.com";
    let userTask = new UserTaskInfo(this.info.username, task, photourl);

    let username = new UserNameInfo(this.info.username);

    console.log("userTask");
    console.log(userTask);

    this.userService.getUser(username).subscribe(
      data => {
        console.log(data);
      },
      error => {
        console.log(error);
      }
    );
    this.userService.getUsers().subscribe(
      data => {
        console.log(data);
      },
      error => {
        console.log(error);
      }
    );

    this.userTaskService.createUserTask(userTask).subscribe(
      data => {
        console.log(data);
        this.generateMessage();
      },
      error => {
        console.log(error);
        this.generateMessage();
      }
    );
  }
  generateMessage() {
    if (this.failed == false) {
      this.displayText = "Activity succeeded in being marked as complete";
    } else {
      this.displayText = "Activity failed to be marked as complete";
    }
  }
}
