import { Component, OnInit, OnDestroy } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";
import { TaskServiceService } from "src/app/services/task/task-service.service";
import { UserService } from "src/app/services/user.service";
import { TokenStorageService } from "src/app/services/auth/token-storage.service";
import { UserNameInfo } from "src/app/services/username-info";
import { UsertaskService } from "src/app/services/usertask/usertask.service";
import { UserTaskInfo } from "src/app/services/usertask/usertask-info";
import { FileService } from "src/app/services/file-service";
import EmblaCarousel from "embla-carousel";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit {
  mUpcomingEvents = null;
  mCheckinCarousel: EmblaCarousel = null;
  mFileService: FileService = null;
  mSelectedTask: any = null;
  mBasicRegex: RegExp = /^(?=.*[A-Z0-9])[\w.,!"'\/$ ]+$/;
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

    this.mFileService = new FileService();

    this.getUserInfo();

    this.getCalendarEvents();

    this.taskService.getTasks().subscribe(response => {
      this.tasks = response;
    });
  }

  ngAfterViewInit() {
    let emblaNode = document.querySelector(".embla") as HTMLElement;
    let options = { loop: true, draggable: false };
    this.mCheckinCarousel = EmblaCarousel(emblaNode, options);
  }

  ngOnDestroy() {
    this._ngUnsubscribe.next();
    this._ngUnsubscribe.complete();
  }

  trySubmitTask() {
    let today = new Date();
    let userTask = new UserTaskInfo(
      this.mSelectedTask.taskId,
      this.info.username,
      this.mSelectedTask.taskPoints,
      today.toISOString(),
      "",
      this.mSelectedTask.description
    );

    this.userTaskService.createUserTask(userTask).subscribe(
      data => {
        console.log(data);
        this.updateProgress();
        let detailsField = document.getElementById(
          "detailsField"
        ) as HTMLTextAreaElement;
        let photoField = document.getElementById(
          "photoUploadField"
        ) as HTMLInputElement;

        detailsField.value = "";
        photoField.value = "";
      },
      error => {
        console.log(error);
      }
    );
  }

  trySubmitPhotoTask(photoUpload: File) {
    this.mFileService
      .uploadFile(photoUpload)
      .then((photoUrl: string) => {
        let today = new Date();
        let userTask = new UserTaskInfo(
          this.mSelectedTask.taskId,
          this.info.username,
          this.mSelectedTask.taskPoints,
          today.toISOString(),
          photoUrl,
          this.mSelectedTask.description
        );

        this.userTaskService.createUserTask(userTask).subscribe(
          data => {
            console.log(data);
            let detailsField = document.getElementById(
              "detailsField"
            ) as HTMLTextAreaElement;
            let photoField = document.getElementById(
              "photoUploadField"
            ) as HTMLInputElement;

            detailsField.value = "";
            photoField.value = "";
          },
          error => {
            console.log(error);
          }
        );

        this.updateProgress();
      })
      .catch(e => {
        console.log(e);
      });
  }

  updateProgress() {
    setTimeout(() => {
      this.getUserInfo();
    }, 1000);
  }

  advanceCarousel() {
    let shouldGoToNextSlide = false;
    let detailsField = document.getElementById(
      "detailsField"
    ) as HTMLTextAreaElement;
    let photoField = document.getElementById(
      "photoUploadField"
    ) as HTMLInputElement;
    let selectAlert = document.getElementById("selectAlert");
    let verifyAlert = document.getElementById("verifyAlert");

    if (this.mCheckinCarousel.selectedScrollSnap() === 0) {
      if (this.mSelectedTask) {
        shouldGoToNextSlide = true;

        if (selectAlert.style.display !== "none") {
          selectAlert.style.display = "none";
        }
      } else {
        if (selectAlert.style.display === "none") {
          selectAlert.style.display = "block";
        }
      }
    } else if (this.mCheckinCarousel.selectedScrollSnap() === 1) {
      // console.log(this.mBasicRegex.test(detailsField.value));
      // console.log(photoField.files.length);

      if (
        (this.mSelectedTask.verificationRequired &&
          photoField.files.length != 1) ||
        !this.mBasicRegex.test(detailsField.value)
      ) {
        if (verifyAlert.style.display === "none") {
          verifyAlert.style.display = "block";
        }
      } else {
        shouldGoToNextSlide = true;

        if (verifyAlert.style.display !== "none") {
          verifyAlert.style.display = "none";
        }

        if (this.mSelectedTask.verificationRequired) {
          this.trySubmitPhotoTask(photoField.files[0]);
        } else {
          this.trySubmitTask();
        }
      }
    } else if (this.mCheckinCarousel.selectedScrollSnap() === 2) {
      shouldGoToNextSlide = true;
    }

    if (shouldGoToNextSlide) {
      this.mCheckinCarousel.scrollNext();
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

  getUserInfo() {
    let username = new UserNameInfo(this.info.username);

    this.userService.getUser(username).subscribe(response => {
      this.userinfo = response;
    });

    this.userTaskService.getHistory(username).subscribe(response => {
      this.usertasks = response;

      this.usertasks.forEach(checkin => {
        checkin.timestamp = new Date(checkin.completionDate);
      });
    });

    if (!this.mFileService.mUserContainer) {
      this.mFileService.getUserContainer(this.info.username);
    }
  }

  getCalendarEvents() {
    this.http.get<any[]>("http://localhost:8080/getEvents").subscribe(
      response => {
        let allEvents = response;
        let today = new Date(Date.now());
        this.mUpcomingEvents = [];

        allEvents.forEach(element => {
          element.date = new Date(element.date);
          if (
            element.date.toDateString() === today.toDateString() ||
            element.date > today
          ) {
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
