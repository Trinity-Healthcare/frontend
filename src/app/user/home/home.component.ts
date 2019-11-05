import { Component, OnInit, OnDestroy } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";
import { RetrievedTask } from "src/app/services/task/retrievedTask-info";
import { TaskServiceService } from "src/app/services/task/task-service.service";
import { UserService } from "src/app/services/user.service";
import { TokenStorageService } from "src/app/services/auth/token-storage.service";
import { UserNameInfo } from "src/app/services/username-info";
import { UsertaskService } from "src/app/services/usertask/usertask.service";
import { UserTaskInfo } from "src/app/services/usertask/usertask-info";
// import { FileService } from 'src/app/services/file-service';
import EmblaCarousel from 'embla-carousel';

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit {
  mUpcomingEvents = null;
  mCheckinCarousel: EmblaCarousel = null;
  // mFileService: FileService = null;
  selectedTask: any = null;
  info: any;
  userinfo: any = null;
  tasks: any;
  usertasks: any = null;

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

    this.getUserInfo();

    this.getCalendarEvents();

    this.taskService.getTasks().subscribe(response => {
      this.tasks = response;
    });

    // this.mFileService = new FileService();

  }

  ngAfterViewInit() {
    let emblaNode = document.querySelector('.embla') as HTMLElement;
    let options = { loop: false }
    this.mCheckinCarousel = EmblaCarousel(emblaNode, options)
  }

  ngOnDestroy() {
    this._ngUnsubscribe.next();
    this._ngUnsubscribe.complete();
  }

  submitTask(task: RetrievedTask) {
    let today = new Date();

    let photourl = "www.notawebsite.com";
    let userTask = new UserTaskInfo(
      task.taskId,
      this.info.username,
      task.taskPoints,
      today.toISOString(),
      photourl
    );
    console.log(userTask);
    this.userTaskService.createUserTask(userTask).subscribe(
      data => {
        console.log(data);
      },
      error => {
        console.log(error);
      }
    );
  }

  updateProgress()
  {
    setTimeout(() => {
      this.getUserInfo();
    }, 1000);
  }

  advanceCarousel()
  {
    if(!this.selectedTask)
    {
      
    }
  }

  getProgress() {
    let progress = (this.userinfo.weekTotal / this.userinfo.weekGoal) * 100;
    return `${progress.toFixed(2)}%`;
  }

  getOrdinal(n) {
    return n > 0
      ? ["th", "st", "nd", "rd"][(n > 3 && n < 21) || n % 10 > 3 ? 0 : n % 10]
      : "";
  }

  getUserInfo()
  {
    let username = new UserNameInfo(this.info.username);

    this.userService.getUser(username).subscribe(response => {
      this.userinfo = response;
    });

    this.userTaskService.getHistory(username).subscribe(response => {
      this.usertasks = response;

      this.usertasks.forEach((checkin) => {

        checkin.timestamp = new Date(checkin.completionDate);

      });

    });
  }

  getCalendarEvents() {
    this.http.get<any[]>("http://localhost:8080/getEvents").subscribe(
      response => {
        let allEvents = response;
        let today = new Date(Date.now());
        this.mUpcomingEvents = [];

        allEvents.forEach(element => {
          element.date = new Date(element.date);
          if(element.date.toDateString() === today.toDateString() || element.date > today)
          {
            element.ordinal = this.getOrdinal(element.date.getDate());
            element.month_short = element.date.toLocaleString("default", {
              month: "short"
            });
            this.mUpcomingEvents.push(element);
          }
        });
      },
      error => {
        console.log(error);
      }
    );
  }
}
