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
  // onSubmit() {
  //   console.log(this.form);

  //   this.taskInfo = new TaskInfo(
  //     this.form.task_name,
  //     this.form.photo_required,
  //     this.form.point_value
  //   );

  //   this.taskService.createTask(this.taskInfo).subscribe(
  //     data => {
  //       console.log(data);
  //       this.createTaskFailed = false;
  //       this.generateMessage();
  //     },
  //     error => {
  //       console.log(error);
  //       this.createTaskFailed = true;
  //       this.generateMessage();
  //     }
  //   );
  // }
  // this.loginInfo = new AuthLoginInfo(this.form.username, this.form.password);

  //   this.authService.attemptAuth(this.loginInfo).subscribe(
  //     data => {
  //       this.tokenStorage.saveToken(data.accessToken);
  //       this.tokenStorage.saveUsername(data.username);
  //       this.tokenStorage.saveAuthorities(data.authorities);

  //       this.isLoginFailed = false;
  //       this.isLoggedIn = true;
  //       this.roles = this.tokenStorage.getAuthorities();
  //       this.generateMessage();
  //       this.reloadPage();
  //     },
  //     error => {
  //       console.log(error);
  //       this.errorMessage = error.error.message;
  //       this.isLoginFailed = true;
  //       this.generateMessage();
  //     }
  //   );
  createUserTask(task) {
    console.log("task:");
    console.log(task);

    // let username = new UserNameInfo(this.info.username);
    // console.log("username: " + this.info.username);

    // this.userService.getUser(username).subscribe(
    //   data => {
    //     console.log("first");
    //     console.log(data);
    //     this.userdata = data;
    //     console.log("userdata");
    //     console.log(this.userdata);

    //     console.log("this.user");
    //     console.log(this.user);
    //   },
    //   error => {
    //     console.log("Couldn't find user");
    //   }
    // );

    // let user = new userInfo(
    //   this.userdata.id,
    //   this.userdata.name,
    //   this.userdata.username,
    //   this.userdata.email,
    //   this.userdata.password,
    //   this.userdata.role,
    //   this.userdata.currentPointTotal,
    //   this.userdata.pointGoal,
    //   this.userdata.userGroups,
    //   this.userdata.userTasks
    // );
    // console.log("printed userInfo");
    // console.log("user");
    // console.log(user);

    let photourl = "www.notawebsite.com";
    let userTask = new UserTaskInfo(this.info.username, task, photourl);

    console.log("userTask");
    console.log(userTask);

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
