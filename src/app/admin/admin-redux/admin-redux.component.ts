import {
  Component,
  OnInit,
  AfterViewInit,
  ViewChild,
  QueryList,
  ViewChildren,
} from "@angular/core";
import { API, Config, DefaultConfig, APIDefinition } from 'ngx-easy-table';
import { UserService } from 'src/app/services/user/user.service';
import { FullUser } from 'src/app/services/user/user.info.full';
import { UsertaskService } from 'src/app/services/usertask/usertask.service';
import { RetrievedUserTaskInfo } from 'src/app/services/usertask/retrievedUserTask-info';
import { TaskServiceService } from 'src/app/services/task/task.service';
import { ActivatedRoute } from '@angular/router';
import { EventService } from 'src/app/services/event/event.service';
import { RetrievedTask } from 'src/app/services/task/retrievedTask-info';
import { CategoryService } from 'src/app/services/category/category.service';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { Location } from "@angular/common";

@Component({
  selector: "app-admin-redux",
  templateUrl: "./admin-redux.component.html",
  styleUrls: ["./admin-redux.component.css"]
})
export class AdminReduxComponent implements OnInit, AfterViewInit {
  @ViewChildren("primaryDataTable") primaryDataTables: QueryList<APIDefinition>;
  @ViewChild("itemActionsTemplate", { static: false })
  actionsTemplate: APIDefinition;

  public configuration: Config;
  public selectedView = "";
  public selectedViewTab: HTMLElement = null;
  public selectedViewData: any = null;
  public serverData: any = null;
  public isDialogVisible: boolean = false;

  public ADMIN_VIEWS = ["users", "pending", "groups", "tasks", "events"];

  public readonly ALLOWED_COLUMNS = {
    users: [
      { key: "name", title: "Name" },
      { key: "username", title: "Username" },
      { key: "email", title: "Email" },
      { key: "payroll_code", title: "Payroll Code" },
      { key: "week_summary", title: "Weekly Status" },
      { key: "quarter_summary", title: "Quarterly Status" },
      { key: "category.name", title: "Group" },
      { key: "smoking", title: "Smoking" },
      { key: "primary_role", title: "Role" }
    ],

    pending: [
      { key: "userId", title: "User" },
      { key: "associated_task.taskName", title: "Task" },
      { key: "description", title: "Comments" },
      { key: "photo", title: "Photo" },
      { key: "taskPoints", title: "Points" },
      { key: "time", title: "Time" },
      { key: "status", title: "Status" }
    ],

    groups: [
      { key: "name", title: "Name" },
      { key: "description", title: "Description" },
      { key: "quarterly_goal", title: "Quarterly Goal" }
    ],

    tasks: [
      { key: "taskName", title: "Name" },
      { key: "taskAction", title: "Action" },
      { key: "taskPoints", title: "Points" },
      { key: "taskMax", title: "Maximum" },
      { key: "taskFreq", title: "Time" },
      { key: "verificationRequired", title: "Needs Admin Approval" },
      { key: "photoRequired", title: "Needs Photo" }
    ],

    events: [
      { key: "title", title: "Name" },
      { key: "description", title: "Description" },
      { key: "date", title: "Points" },
      { key: "start", title: "Start" },
      { key: "end", title: "End" },
      { key: "link", title: "Link" }
    ]
  };

  constructor(
    private userService: UserService,
    private userTaskService: UsertaskService,
    private taskService: TaskServiceService,
    private eventsService: EventService,
    private categoryService: CategoryService,
    public ngxSmartModalService: NgxSmartModalService,
    private location: Location,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.configuration = { ...DefaultConfig };
    this.configuration.persistState = true;
    this.configuration.orderEnabled = true;
    this.configuration.threeWaySort = true;
    this.configuration.searchEnabled = false;

    this.route.fragment.subscribe((hash: string) => {
      this.selectedView = hash === null ? this.ADMIN_VIEWS[0] : hash;
    });
  }

  ngAfterViewInit() {
    this.processServerData();
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
        return this.userTaskService.getAllUserTasks().toPromise();
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
      })
      .then(() => {
        if (this.ADMIN_VIEWS.includes(this.selectedView)) {
          this.onViewChange("");
        } else {
          console.log("An invalid view was specified for the data table.");
        }
      })
      .catch(e => {
        console.log(e);
      });
  }

  isServerDataAvailable() {
    let isAvailable = true;

    if (!this.serverData) {
      isAvailable = false;
    } else {
      isAvailable =
        Object.keys(this.serverData).length === this.ADMIN_VIEWS.length;
    }

    return isAvailable;
  }

  addActive(data : any[]) {
   data.forEach((element) => {
    element['isActive'] = false;
   }); 
  }

  getProcessedUsers(freshUsers: FullUser[]) {
    freshUsers.forEach(element => {
      element["primary_role"] = element.roles[0].name.split("_")[1];
      //Truthy equals because smoking is a boolean string.
      element["smoking"] = element["smoker"] == true ? "Yes" : "No";
      element[
        "week_summary"
      ] = `${element["week_total"]} / ${element["week_goal"]}`;
      element[
        "quarter_summary"
      ] = `${element["quarter_total"]} / ${element["quarter_goal"]}`;
    });
    
    this.addActive(freshUsers);

    return freshUsers;
  }

  getProcessedPending(freshPending: RetrievedUserTaskInfo[]) {
    freshPending.forEach(element => {
      element["associated_task"] = this.serverData.tasks.filter(
        possibleTask => {
          return possibleTask.taskId === element.taskId;
        }
      );

      element["associated_task"] = element["associated_task"][0];
      element["time"] = new Date(element["completionDate"]).toLocaleString(
        "en-US",
        { timeZone: "America/Chicago" }
      );
    });

    this.addActive(freshPending);

    return freshPending;
  }

  getProcessedTasks(freshTasks: RetrievedTask[]) {
    freshTasks.forEach(element => {
      element["verificationRequired"] =
        Boolean(element["verificationRequired"]) === true ? "Yes" : "No";
      element["photoRequired"] =
        Boolean(element["photoRequired"]) === true ? "Yes" : "No";
    });

    this.addActive(freshTasks);

    return freshTasks;
  }

  getDataColumns(base_columns) {
    let actionTemplate = {
      key: "isActive",
      title: "Actions",
      cellTemplate: this.actionsTemplate
    };
    let viewColumns = base_columns;

    if (viewColumns[viewColumns.length - 1].key !== "isActive") {
      viewColumns.push(actionTemplate);
    }

    return viewColumns;
  }

  editItem(item : any) {
    this.ngxSmartModalService.getModal('adminDialog').open();
    console.log(item);
  }

  deleteItem(item: any) {
    console.log(item);
  }

  onViewChange(newView: string) {
    if (this.selectedView && newView !== this.selectedView && newView !== "") {
      this.selectedView = newView;
    }
    this.location.replaceState(`/admin-redux#${this.selectedView}`);
  }

  onSearchChange(name: string): void {
    this.primaryDataTables.forEach(child => {
      child.apiEvent({
        type: API.onGlobalSearch,
        value: name
      });
    });
  }

  toUppercase(s: string) {
    return s.charAt(0).toUpperCase() + s.slice(1);
  }

  toLowercase(s: string) {
    return s.charAt(0).toLowerCase() + s.slice(1);
  }
}
