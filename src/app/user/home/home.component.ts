import { Component, OnInit, OnDestroy } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";
import { TaskServiceService } from "src/app/services/task/task.service";
import { UserService } from "src/app/services/user/user.service";
import { TokenStorageService } from "src/app/services/auth/token-storage.service";
import { UsernameInfo } from "src/app/services/user/username.info";
import { SubmittedTaskService } from "src/app/services/submitted.task/submitted.task.service";
import { SubmittedTaskInfo } from "src/app/services/submitted.task/submitted.task.info";
import { FileService } from "src/app/services/files/azure.file.service";
import EmblaCarousel from "embla-carousel";
import { CategoryService } from "src/app/services/category/category.service";
import { EventService } from 'src/app/services/event/event.service';
import { AppSettingsService } from 'src/app/services/appsettings/appsettings.service';

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})

export class HomeComponent implements OnInit {
  upcomingEvents = null;
  checkinCarousel: EmblaCarousel = null;
  isOperationRunning: boolean = false;
  wasOperationSuccessful: boolean = true;
  selectedTask: any = null;
  basicRegex: RegExp = /^(?=.*[A-Z0-9])[\w.,!""\/$ ]+$/;
  authInfo: any = null;
  userInfo: any = null;
  allTasks: any = null;
  userTasks: any = null;
  allSettings: any = null;

  private _ngUnsubscribe = new Subject();

  constructor(
    private taskService: TaskServiceService,
    private userService: UserService,
    private eventsService : EventService,
    private submittedTaskService: SubmittedTaskService,
    private appSettingsService: AppSettingsService,
    private categoryService: CategoryService,
    private fileService: FileService,
    private token: TokenStorageService,
  ) {
      this.authInfo = {
        token: this.token.getToken(),
        username: this.token.getUsername(),
        authorities: this.token.getAuthorities()
      };
  }

  ngOnInit() {
    this.getUserInfo();

    this.getCalendarEvents();

    this.taskService.getTasks().subscribe(response => {
      this.allTasks = response;
    });

    this.appSettingsService.getAppSettings().subscribe(response => {
      this.allSettings = response;
    });

  }

  ngAfterViewInit() {
    let emblaNode = document.querySelector(".embla") as HTMLElement;
    let options = { loop: true, draggable: false };
    this.checkinCarousel = EmblaCarousel(emblaNode, options);
  }

  ngOnDestroy() {
    this._ngUnsubscribe.next();
    this._ngUnsubscribe.complete();
  }

  trySubmitTask() {
    let today = new Date();
    let userTask = new SubmittedTaskInfo(
      this.selectedTask.taskId,
      this.authInfo.username,
      this.selectedTask.taskPoints,
      today.toISOString(),
      "Not Required",
      this.selectedTask.verificationRequired ? "Pending" : "Approved",
      this.selectedTask.description
    );

    this.isOperationRunning = true;

    this.submittedTaskService.submitTask(userTask).toPromise().then((response) => {
      console.log(response);
      this.wasOperationSuccessful = true;
      this.updateProgress();
    }).catch((e) => {
      this.wasOperationSuccessful = false;
      console.log(e);
    }).finally(() => {
      this.isOperationRunning = false;
    });
  }

  trySubmitPhotoTask(photoUpload: File) {

    this.isOperationRunning = true;

    this.fileService
      .uploadFile(photoUpload)
      .then((photoUrl: string) => {
        let today = new Date();
        let userTask = new SubmittedTaskInfo(
          this.selectedTask.taskId,
          this.authInfo.username,
          this.selectedTask.taskPoints,
          today.toISOString(),
          photoUrl,
          this.selectedTask.verificationRequired ? "Pending" : "Approved",
          this.selectedTask.description
        )
        return this.submittedTaskService.submitTask(userTask).toPromise()
      })
      .then((response) => {
        this.wasOperationSuccessful = true;
        this.updateProgress();
      }).catch(e => {
        this.wasOperationSuccessful = false;
        console.log(e);
      }).finally(() => {
        this.isOperationRunning = false;
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

    if (this.checkinCarousel.selectedScrollSnap() === 0) {
      if (this.selectedTask) {
        shouldGoToNextSlide = true;

        if (selectAlert.style.display !== "none") {
          selectAlert.style.display = "none";
        }
      } else {
        if (selectAlert.style.display === "none") {
          selectAlert.style.display = "block";
        }
      }

    } else if (this.checkinCarousel.selectedScrollSnap() === 1) {

      if ((this.selectedTask.photoRequired && photoField.files.length != 1) ||
        (this.selectedTask.verificationRequired && !this.basicRegex.test(detailsField.value))
      ) {
        if (verifyAlert.style.display === "none") {
          verifyAlert.style.display = "block";
        }
      } else {
        shouldGoToNextSlide = true;

        if (verifyAlert.style.display !== "none") {
          verifyAlert.style.display = "none";
        }

        if (this.selectedTask.photoRequired) {
          this.trySubmitPhotoTask(photoField.files[0]);
        } else {
          this.trySubmitTask();
        }
      }
    } else if (this.checkinCarousel.selectedScrollSnap() === 2) {
      shouldGoToNextSlide = true;
      this.resetCarousel();
    }

    if (shouldGoToNextSlide) {
      this.checkinCarousel.scrollNext();
    }
  }

  resetCarousel()
  {
    let detailsField = document.getElementById(
      "detailsField"
    ) as HTMLTextAreaElement;
    let photoField = document.getElementById(
      "photoUploadField"
    ) as HTMLInputElement;

    if(detailsField)
    {
      detailsField.value = "";
    }

    if(photoField)
    {
      photoField.value = "";
    }

    this.selectedTask = null;
  }

  getProgress() {
    let progress = (this.userInfo.weekTotal / this.userInfo.weekGoal) * 100;
    return `${progress.toFixed(2)}%`;
  }

  getOrdinal(n) {
    return n > 0
      ? ["th", "st", "nd", "rd"][(n > 3 && n < 21) || n % 10 > 3 ? 0 : n % 10]
      : "";
  }

  getUserInfo() {
    let username = new UsernameInfo(this.authInfo.username);

    this.userService.getUser(username).subscribe(response => {
      this.userInfo = response;
    });

    this.categoryService.getAllCategories().subscribe(response => {
      this.userInfo["group"] = response.filter((element) => {
        //Truthy equals because one of these is a string.
        return element.category_id == this.userInfo.category;
      });

      if(this.userInfo["group"].length === 1)
      {
        this.userInfo["group"] = this.userInfo["group"][0];
      }
    });

    this.submittedTaskService.getUserSubmittedTasks(username).subscribe(response => {
      this.userTasks = response;

      this.userTasks.forEach(checkin => {
        checkin._timestamp = new Date(checkin.completionDate);
        //TODO Remove once new database schema is enforced.
      });

    });

    if (!this.fileService.mUserContainer) {
      this.fileService.getUserContainer(this.authInfo.username);
    }
  }

  getCalendarEvents() {
    this.eventsService.getEvents().subscribe(
      response => {
        let aFewEvents = response.slice(0, 3);
        let today = new Date(Date.now());
        this.upcomingEvents = [];

        aFewEvents.forEach(element => {
          element['_date'] = new Date(element.date);
          if (
            element['_date'].toDateString() === today.toDateString() ||
            element['_date'] > today
          ) {
            element['_ordinal'] = this.getOrdinal(element['_date'].getDate());
            element['_month_short'] = element['_date'].toLocaleString("default", {
              month: "short"
            });
            this.upcomingEvents.push(element);
          }
        });

      },
      error => {
        console.log(error);
      }
    );
  }
}
