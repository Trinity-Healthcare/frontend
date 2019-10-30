import { Component, OnInit, OnDestroy } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";
import { RetrievedTask } from "src/app/services/task/retrievedTask-info";
import { TaskServiceService } from "src/app/services/task/task-service.service";
import { UserService } from "src/app/services/user.service";
import { TokenStorageService } from "src/app/services/auth/token-storage.service";
import { UserNameInfo } from "src/app/services/username-info";
import { UsertaskService } from "src/app/services/usertask/usertask.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit {
  mPoints = 10;
  mGoal = 50;
  mUpcomingEvents = null;
  mSelectedActivity: any;
  info: any;
  userinfo: any;
  tasks: any;
  usertasks: any;

  // mAvailableActivities = [
  //   {id: 1, name: 'Jogging'},
  //   {id: 2, name: 'Rockclimbing'},
  //   {id: 3, name: 'Swimming'},
  //   {id: 4, name: 'Lab Visit'},
  //   {id: 5, name: 'Dental Visit'},
  //   {id: 6, name: 'Swimming'},
  //   {id: 7, name: 'Swimming'},
  //   {id: 8, name: 'Swimming'},
  //   {id: 9, name: 'Swimming'},
  //   {id: 10, name: 'Swimming'},
  //   {id: 11, name: 'Other'}
  // ];

  private _ngUnsubscribe = new Subject();

  constructor(
    private http: HttpClient,
    private taskService: TaskServiceService,
    private userService: UserService,
    private token: TokenStorageService,
    private userTaskService: UsertaskService
  ) {}

  ngOnInit() {
    this.info = {
      token: this.token.getToken(),
      username: this.token.getUsername(),
      authorities: this.token.getAuthorities()
    };
    this.getCalendarEvents();
    this.taskService.getTasks().subscribe(response => {
      this.tasks = response;
      console.log(response);
    });
    let username = new UserNameInfo(this.info.username);
    this.userService.getUser(username).subscribe(response => {
      this.userinfo = response;
      console.log(response);
    });
    this.userTaskService.getHistory(username).subscribe(response => {
      this.usertasks = response;
      console.log(response);
    });
  }

  ngOnDestroy() {
    this._ngUnsubscribe.next();
    this._ngUnsubscribe.complete();
  }

  getProgress() {
    let progress = (this.mPoints / this.mGoal) * 100;
    return `${progress.toFixed(2)}%`;
  }

  getCalendarEvents() {
    this.http.get("http://localhost:8080/getEvents").subscribe(
      response => {
        this.mUpcomingEvents = response;

        this.mUpcomingEvents.forEach(element => {
          element.date = element.date.split("-")[1][1];
          element.start =
            element.start.split(":00 ")[0] + element.start.split(":00")[1];
          console.log(element.date);
        });
      },
      error => {
        console.log(error);
      }
    );
  }
}
