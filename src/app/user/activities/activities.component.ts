import { Component, OnInit } from "@angular/core";
import { TaskServiceService } from "src/app/services/task/task.service";
import { TaskInfo } from "src/app/services/task/task.info";
import { UserService } from "src/app/services/user/user.service";
import { TokenStorageService } from "src/app/services/auth/token-storage.service";
import { UsernameInfo } from "src/app/services/user/username.info";
import { SubmittedTaskService } from "src/app/services/submitted.task/submitted.task.service";
@Component({
  selector: "app-activities",
  templateUrl: "./activities.component.html",
  styleUrls: ["./activities.component.css"]
})
export class ActivitiesComponent implements OnInit {
  info: any;
  tasks: TaskInfo[];
  user: any;
  userdata: any;
  displayText = "";
  failed = false;

  constructor(
    private taskService: TaskServiceService,
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
      console.log(response);
    });
  }

  createUserTask(task) {
    console.log("task:");
    console.log(task);

    let photourl = "www.notawebsite.com";
    // let userTask = new UserTaskInfo(this.info.username, task, 2, "", photourl);

    let username = new UsernameInfo(this.info.username);

    console.log("userTask");
    // console.log(userTask);

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
  }
  generateMessage() {
    if (this.failed == false) {
      this.displayText = "Activity succeeded in being marked as complete";
    } else {
      this.displayText = "Activity failed to be marked as complete";
    }
  }
}
