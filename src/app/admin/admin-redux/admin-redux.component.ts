/* 
 *  Copyright (C) 2019 Prime Inc - All Rights Reserved
 *  Unauthorized use of this file and its contents, via any medium is strictly prohibited.
 *  Authored by the Missouri State University Computer Science Department
 *  Fall 2019 CSC 450 - Group 2
 */

import {
  Component,
  OnInit,
  AfterViewInit,
  ViewChild,
  QueryList,
  ViewChildren,
  OnDestroy,
  ViewEncapsulation
} from "@angular/core";
import {
  API,
  Config,
  DefaultConfig,
  APIDefinition,
  Columns
} from "ngx-easy-table";
import { UserService } from "src/app/services/user/user.service";
import { SubmittedTaskService } from "src/app/services/submitted.task/submitted.task.service";
import { TaskServiceService } from "src/app/services/task/task.service";
import { ActivatedRoute, Router } from "@angular/router";
import { EventService } from "src/app/services/event/event.service";
import { TaskInfo } from "src/app/services/task/task.info";
import { CategoryService } from "src/app/services/category/category.service";
import { NgxSmartModalService } from "ngx-smart-modal";
import { Location } from "@angular/common";
import {
  AdminDialogComponent,
  AdminOperation
} from "../admin-dialog/admin-dialog.component";
import { SubmittedTaskInfo } from "src/app/services/submitted.task/submitted.task.info";
import { UserInfoFull } from "src/app/services/user/user.info.full";
import Swal from "sweetalert2";
import * as xlsx from "xlsx";
import { EventInfo } from "src/app/services/event/event.info";
import { UsernameInfo } from "src/app/services/user/username.info";
import { TokenStorageService } from "src/app/services/auth/token-storage.service";
import { AppSettingsService } from "src/app/services/appsettings/appsettings.service";
import { AppSettingsInfo } from "src/app/services/appsettings/appsettings.info";
import { ImportedUserInfo } from "src/app/services/user/imported.user.info";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { Title } from '@angular/platform-browser';

@Component({
  selector: "app-admin-redux",
  templateUrl: "./admin-redux.component.html",
  styleUrls: ["./admin-redux.component.css"],
  encapsulation: ViewEncapsulation.None
})
export class AdminReduxComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChildren("primaryDataTable") primaryDataTables: QueryList<APIDefinition>;
  @ViewChild("fullActionsTemplate", { static: false })
  fullActionsTemplate: APIDefinition;
  @ViewChild("operationDialogComp", { static: false })
  adminDialogComp: AdminDialogComponent;

  public configuration: Config;
  public selectedView = "";
  public serverData: any = null;
  public viewColumns: { [key: string]: Columns } = null;
  public authInfo: any = null;
  public isResetOpRunning: boolean = false;
  compliantuserdata: any = null;
  noncompliantuserdata: any = null;
  userTasks: any = null;

  private _ngUnsubscribe = new Subject();

  public ADMIN_VIEWS = [
    {
      name: "users",
      allowedColumns: [
        { key: "name", title: "Name" },
        { key: "username", title: "Username" },
        { key: "email", title: "Email" },
        { key: "payroll_code", title: "Payroll Code" },
        { key: "_week_summary", title: "Weekly Status" },
        { key: "_quarter_summary", title: "Quarterly Status" },
        { key: "category.name", title: "Group" },
        { key: "_smoking", title: "Smoking" },
        { key: "_primary_role", title: "Role" }
      ],
      viewColumns: []
    },
    {
      name: "pending",
      allowedColumns: [
        { key: "userId", title: "User" },
        { key: "_associated_task.taskName", title: "Task" },
        { key: "description", title: "Comments" },
        { key: "photo", title: "Photo" },
        { key: "taskPoints", title: "Points" },
        { key: "submitted_on", title: "Submitted On" },
        { key: "status", title: "Status" }
      ],
      viewColumns: []
    },
    {
      name: "groups",
      allowedColumns: [
        { key: "name", title: "Name" },
        { key: "description", title: "Description" },
        { key: "quarterly_goal", title: "Quarterly Goal" }
      ],
      viewColumns: []
    },
    {
      name: "tasks",
      allowedColumns: [
        { key: "taskName", title: "Name" },
        { key: "taskAction", title: "Action" },
        { key: "taskPoints", title: "Points" },
        { key: "taskMax", title: "Maximum" },
        { key: "taskFreq", title: "Frequency" },
        { key: "_verificationRequired", title: "Needs Admin Approval" },
        { key: "_photoRequired", title: "Needs Photo" }
      ],
      viewColumns: []
    },
    {
      name: "events",
      allowedColumns: [
        { key: "title", title: "Name" },
        { key: "description", title: "Description" },
        { key: "date", title: "Date" },
        { key: "start", title: "Start" },
        { key: "end", title: "End" },
        { key: "link", title: "Link" }
      ],
      viewColumns: []
    },
    {
      name: "settings",
      allowedColumns: [
        { key: "_name", title: "Name" },
        { key: "value", title: "Value" }
      ],
      viewColumns: []
    }
  ];

  constructor(
    private userService: UserService,
    private submittedtaskService: SubmittedTaskService,
    private taskService: TaskServiceService,
    private eventsService: EventService,
    private categoryService: CategoryService,
    private location: Location,
    private route: ActivatedRoute,
    private router: Router,
    private token: TokenStorageService,
    private submittedTaskService: SubmittedTaskService,
    private appSettingsService: AppSettingsService,
    public ngxSmartModalService: NgxSmartModalService
  ) {
    this.route.fragment.subscribe((hash: string) => {
      //Default to users if no url value is supplied.
      this.selectedView =
        hash === undefined || hash === null ? this.ADMIN_VIEWS[0].name : hash;
    });
  }

  ngOnInit() {
    this.configuration = { ...DefaultConfig };
    this.configuration.persistState = true;
    this.configuration.orderEnabled = true;
    this.configuration.threeWaySort = true;
    this.configuration.searchEnabled = false;
    this.configuration.horizontalScroll = true;
    this.configuration.resizeColumn = true;
    this.configuration.fixedColumnWidth = true;

    this.authInfo = {
      token: this.token.getToken(),
      username: this.token.getUsername(),
      authorities: this.token.getAuthorities()
    };

    this.userService
      .getCompliantUsers()
      .pipe(takeUntil(this._ngUnsubscribe))
      .subscribe(
        data => {
          this.compliantuserdata = data;
        },
        error => {
          console.log(error);
        }
      );
    this.userService
      .getNonCompliantUsers()
      .pipe(takeUntil(this._ngUnsubscribe))
      .subscribe(
        data => {
          this.noncompliantuserdata = data;
        },
        error => {
          console.log(error);
        }
      );
  }

  ngAfterViewInit() {
    // this.getScreenDimensions();
    this.processServerData();
  }

  ngOnDestroy() {
    // prevent memory leaks
    this._ngUnsubscribe.next();
    this._ngUnsubscribe.complete();
  }

  processServerData() {
    this.serverData = {};

    this.userService
      .getUsers()
      .toPromise()
      .then(data => {
        this.serverData["users"] = this.getProcessedUsers(data);
        return this.taskService.getTasks().toPromise();
      })
      .then(data => {
        this.serverData["tasks"] = this.getProcessedTasks(data);
        return this.submittedtaskService.getAllSubmittedTasks().toPromise();
      })
      .then(data => {
        this.serverData["pending"] = this.getProcessedPending(data);
        return this.eventsService.getEvents().toPromise();
      })
      .then(data => {
        this.serverData["events"] = data;
        return this.categoryService.getAllCategories().toPromise();
      })
      .then(data => {
        this.serverData["groups"] = data;
        this.adminDialogComp.availableGroups = data;
        return this.appSettingsService.getAppSettings().toPromise();
      })
      .then(data => {
        this.serverData["settings"] = this.getProcessedSettings(data);
      })
      .then(() => {
        let isValidView = false;
        this.ADMIN_VIEWS.forEach(view => {
          this.getDataColumns(view);
          if (view.name === this.selectedView) {
            isValidView = true;
          }
        });

        if(isValidView)
        {
          this.onViewChange("");
        }
        else
        {
          this.router.navigate(['/not-found']);
        }

      })
      .catch(e => {
        console.log("Could not get all data from the server.");
        console.log(e);
      });
  }

  isServerDataAvailable() {
    let isAvailable = true;

    if (this.serverData === null) {
      isAvailable = false;
    } else if (
      Object.keys(this.serverData).length !== this.ADMIN_VIEWS.length
    ) {
      isAvailable = false;
    }

    return isAvailable;
  }

  getPendingAmount() {
    let amount = -1;

    if (this.isServerDataAvailable()) {
      amount = this.serverData["pending"].length;
    }

    return amount;
  }

  getCompliantAmount() {
    let amount = "";
    //toFixed returns a string for some reason.

    if (this.compliantuserdata !== null && this.isServerDataAvailable()) {
      amount =
        (
          (parseFloat(this.compliantuserdata.length) /
            this.serverData["users"].length) *
          100.0
        ).toFixed() + "%";
    }

    return amount;
  }

  getQuarterDate() {
    let quarterDate = {};

    if (this.isServerDataAvailable()) {
      this.serverData["settings"].forEach(setting => {
        if (setting.name === "quarter_date") {
          quarterDate = setting;
        }
      });
    }

    return quarterDate;
  }

  getQuarterDateSetting() {
    this.onViewChange("settings");
    return this.getQuarterDate();
  }

  getProcessedUsers(freshUsers: UserInfoFull[]) {
    freshUsers.forEach(element => {
      element.smoker = element.smoker == true ? true : false;

      element["_primary_role"] = this.toUppercase(
        element.roles[0].name.split("_")[1].toLowerCase()
      );
      element["_smoking"] = element.smoker === true ? "Yes" : "No";
      element[
        "_week_summary"
      ] = `${element["week_total"]} / ${element["week_goal"]}`;
      element[
        "_quarter_summary"
      ] = `${element["quarter_total"]} / ${element["quarter_goal"]}`;
    });

    return freshUsers;
  }

  getProcessedPending(freshPending: SubmittedTaskInfo[]) {
    freshPending.forEach(element => {
      element["_associated_task"] = this.serverData.tasks.filter(
        possibleTask => {
          return possibleTask.taskId === element.taskId;
        }
      );

      element["submitted_on"] = new Date(
        element["completionDate"]
      ).toLocaleString("en-US");
      element["_associated_task"] = element["_associated_task"][0];
    });

    return freshPending;
  }

  getProcessedTasks(freshTasks: TaskInfo[]) {
    freshTasks.forEach(element => {
      element.verificationRequired =
        element.verificationRequired == true ? true : false;
      element.photoRequired = element.photoRequired == true ? true : false;
      //These fields are not serialized properly so they must be overwritten.
      element["_verificationRequired"] =
        element.verificationRequired === true ? "Yes" : "No";
      element["_photoRequired"] = element.photoRequired === true ? "Yes" : "No";
    });

    return freshTasks;
  }

  getProcessedEvents(freshEvents: EventInfo[]) {
    freshEvents.forEach(element => {
      if (element.link === null) {
        element.link = "";
      }
    });

    return freshEvents;
  }

  getProcessedSettings(freshSettings: AppSettingsInfo[]) {
    freshSettings.forEach(element => {
      element["_name"] = "";
      let words = element.name.split("_");
      //Settings are in snake case, so we loop through each word and capitalize the first letter and add a space.
      //Don't add a space to the last word.

      for (let i = 0; i < words.length; i++) {
        let word = this.toUppercase(words[i]);
        element["_name"] += i + 1 === words.length ? word : word + " ";
      }
    });

    return freshSettings;
  }

  getDataColumns(view) {
    let actionTemplate = {
      key: "_isActive",
      title: "Actions",
      cellTemplate: this.fullActionsTemplate
    };

    let finalViewColumns = [...view.allowedColumns];

    if (finalViewColumns[finalViewColumns.length - 1].key !== "_isActive") {
      finalViewColumns.push(actionTemplate);
    }

    view.viewColumns = finalViewColumns;
  }

  performOp(opName: string, item: any) {
    let requestedOp = <AdminOperation>{};
    requestedOp.name = opName;
    requestedOp.data =
      item === null ? { ...this.serverData[this.selectedView][0] } : item;
    requestedOp.dataType = this.selectedView;

    if (this.selectedView === "users" && opName.includes("New")) {
      requestedOp.data = new ImportedUserInfo();
    }

    requestedOp.success = () => {
      Swal.fire({
        type: "success",
        title: "Record Updated",
        text: `Saved successfully.`
      }).then(result => {
        console.log("Success");
        this.processServerData();
      });
    };

    requestedOp.failure = () => {
      Swal.fire({
        type: "error",
        title: "An error occured",
        text: "The operation could not be completed."
      }).then(result => {
        console.log("Failure");
      });
    };

    this.adminDialogComp.setOperation(requestedOp);
    this.ngxSmartModalService.getModal("adminDialog").open();
  }

  exportCompliantUsers() {
    let compliantlist = [];
    let headers = ["Name", "Employee Id", "Payroll Code", "Smoking"];
    compliantlist.push(headers);
    for (let i = 0; i < this.compliantuserdata.length; i++) {
      let smoker: string = "No";
      if (this.compliantuserdata[i].smoker === "1") {
        smoker = "Yes";
      }
      let compliantuser = [
        this.compliantuserdata[i].name,
        this.compliantuserdata[i].username,
        this.compliantuserdata[i].payroll_code,
        smoker
      ];
      compliantlist.push(compliantuser);
    }
    console.log(compliantlist);

    let worksheet = xlsx.utils.aoa_to_sheet(compliantlist);
    //let excelbuffer = xlsx.write(workbook, {bookType: 'xlsx',type:'array'});
    let wb = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(wb, worksheet, "compliant");
    xlsx.writeFile(wb, "compliantlist.xlsx");
  }

  exportNonCompliantUsers() {
    let userlist = [];
    let headers = ["Name", "Employee Id", "Payroll Code", "Smoking"];
    userlist.push(headers);
    for (let i = 0; i < this.noncompliantuserdata.length; i++) {
      let smoker: string = "No";
      if (this.noncompliantuserdata[i].smoker === "1") {
        smoker = "Yes";
      }
      let thisuser = [
        this.noncompliantuserdata[i].name,
        this.noncompliantuserdata[i].username,
        this.noncompliantuserdata[i].payroll_code,
        smoker
      ];
      userlist.push(thisuser);
    }
    console.log(userlist);

    let worksheet = xlsx.utils.aoa_to_sheet(userlist);
    //let excelbuffer = xlsx.write(workbook, {bookType: 'xlsx',type:'array'});
    let wb = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(wb, worksheet, "noncompliant");
    xlsx.writeFile(wb, "Non-Compliant Users.xlsx");
  }

  onViewChange(newView: string) {
    if (this.selectedView && newView !== this.selectedView) {
      
      if(newView)
      {
        this.selectedView = newView;
      }

      this.location.replaceState(`/admin#${this.selectedView}`);
    }
  }

  onSearchChange(name: string): void {
    this.primaryDataTables.forEach(child => {
      if (child["id"].startsWith(this.selectedView)) {
        child.apiEvent({
          type: API.onGlobalSearch,
          value: name
        });
      }
    });
  }

  openUserHistory(user: any) {
    this.submittedTaskService
      .getUserTaskHistory(new UsernameInfo(user.username))
      .pipe(takeUntil(this._ngUnsubscribe))
      .subscribe(response => {
        this.userTasks = response;
      });
  }

  toUppercase(s: string) {
    return s.charAt(0).toUpperCase() + s.slice(1);
  }

  toLowercase(s: string) {
    return s.charAt(0).toLowerCase() + s.slice(1);
  }

  getScreenDimensions() {
    const width =
      window.innerWidth ||
      document.documentElement.clientWidth ||
      document.body.clientWidth;

    const height =
      window.innerHeight ||
      document.documentElement.clientHeight ||
      document.body.clientHeight;

    if (width < 1080 && height < 768) {
      document.getElementById("warning-overlay").style.display = "flex";
    }
  }

  closeOverlay() {
    document.getElementById("warning-overlay").style.display = "none";
  }

  resetWeeklyTotals() {
    Swal.fire({
      title: "Are you sure?",
      text:
        "This will reset the total amount of points each user has earned during the week to zero.",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes!"
    }).then(result => {
      if (result.value) {
        this.isResetOpRunning = true;
        this.categoryService
          .resetWeeklyTotals()
          .pipe(takeUntil(this._ngUnsubscribe))
          .subscribe(
            response => {
              console.log(response);
              Swal.fire("Success!", "Weekly totals reset", "success").then(
                result => {
                  if (result.value) {
                    this.processServerData();
                  }
                }
              );
            },
            error => {},
            () => {
              this.isResetOpRunning = false;
            }
          );
      }
    });
  }

  resetQuarterTotals() {
    Swal.fire({
      title: "Are you sure?",
      text:
        "This will reset the total amount of points each user has earned during the quarter to zero.",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes!"
    }).then(result => {
      if (result.value) {
        this.isResetOpRunning = true;
        this.categoryService
          .resetQuarterTotals()
          .pipe(takeUntil(this._ngUnsubscribe))
          .subscribe(
            response => {
              console.log(response);
              Swal.fire("Success!", "Quarter totals reset", "success").then(
                result => {
                  if (result.value) {
                    this.processServerData();
                  }
                }
              );
            },
            error => {},
            () => {
              this.isResetOpRunning = false;
            }
          );
      }
    });
  }
}
