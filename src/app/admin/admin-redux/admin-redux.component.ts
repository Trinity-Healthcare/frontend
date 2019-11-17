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
import { SubmittedTaskService } from 'src/app/services/submitted.task/submitted.task.service';
import { TaskServiceService } from 'src/app/services/task/task.service';
import { ActivatedRoute } from '@angular/router';
import { EventService } from 'src/app/services/event/event.service';
import { TaskInfo } from 'src/app/services/task/task.info';
import { CategoryService } from 'src/app/services/category/category.service';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { Location } from "@angular/common";
import { AdminDialogComponent, AdminOperation } from '../admin-dialog/admin-dialog.component';
import { EventInfo } from 'src/app/services/event/event.info';
import { UserInfo } from 'src/app/services/user/user.info';
import { SubmittedTaskInfo } from 'src/app/services/submitted.task/submitted.task.info';
import { CategoryInfo } from 'src/app/services/category/category.info';

@Component({
  selector: "app-admin-redux",
  templateUrl: "./admin-redux.component.html",
  styleUrls: ["./admin-redux.component.css"]
})
export class AdminReduxComponent implements OnInit, AfterViewInit {
  @ViewChildren("primaryDataTable") primaryDataTables: QueryList<APIDefinition>;
  @ViewChild("itemActionsTemplate", { static: false }) actionsTemplate: APIDefinition;
  @ViewChild("operationDialogComp", { static: false }) adminDialogComp : AdminDialogComponent;

  public configuration: Config;
  public selectedView = "";
  public serverData: any = null;

  public ADMIN_VIEWS = [
    {
      name : 'users',
      item_type : UserInfo,
      allowed_columns : [
        { key: "name", title: "Name" },
        { key: "username", title: "Username" },
        { key: "email", title: "Email" },
        { key: "payroll_code", title: "Payroll Code" },
        { key: "week_summary", title: "Weekly Status" },
        { key: "quarter_summary", title: "Quarterly Status" },
        { key: "category.name", title: "Group" },
        { key: "smoking", title: "Smoking" },
        { key: "primary_role", title: "Role" }
      ]
    },
    {
      name : 'pending',
      item_type : SubmittedTaskInfo,
      allowed_columns : [
        { key: "userId", title: "User" },
        { key: "associated_task.taskName", title: "Task" },
        { key: "description", title: "Comments" },
        { key: "photo", title: "Photo" },
        { key: "taskPoints", title: "Points" },
        { key: "time", title: "Time" },
        { key: "status", title: "Status" }
      ],
    },
    {
      name : 'groups',
      item_type : CategoryInfo,
      allowed_columns : [
        { key: "name", title: "Name" },
        { key: "description", title: "Description" },
        { key: "quarterly_goal", title: "Quarterly Goal" }
      ],
    },
    {
      name : 'tasks',
      item_type : TaskInfo,
      allowed_columns : [
        { key: "taskName", title: "Name" },
        { key: "taskAction", title: "Action" },
        { key: "taskPoints", title: "Points" },
        { key: "taskMax", title: "Maximum" },
        { key: "taskFreq", title: "Time" },
        { key: "verificationRequired", title: "Needs Admin Approval" },
        { key: "photoRequired", title: "Needs Photo" }
      ],
    },
    {
      name : 'events',
      item_type : EventInfo,
      allowed_columns : [
        { key: "title", title: "Name" },
        { key: "description", title: "Description" },
        { key: "date", title: "Points" },
        { key: "start", title: "Start" },
        { key: "end", title: "End" },
        { key: "link", title: "Link" }
      ],
    },
  ]


  constructor(
    private userService: UserService,
    private submittedtaskService: SubmittedTaskService,
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
      this.selectedView = hash === null ? this.ADMIN_VIEWS[0].name : hash;
    });
  }

  ngAfterViewInit() {
    this.processServerData();
    this.ADMIN_VIEWS.forEach((view) => {
      if(view.name === this.selectedView)
      {
        this.onViewChange("");
      }
    });
  }

  processServerData() {
    this.serverData = {};
    
    this.eventsService.getEvents().subscribe(data => {
      this.serverData["events"] = data;
    }, error => {
      console.log("An error occured while getting events from the server.");
    });

    this.categoryService.getAllCategories().subscribe(data => {
      this.serverData["groups"] = data;
    }, error => {
      console.log("An error occured while getting events from the server.");
    });

    this.userService.getUsers().subscribe(data => {
      this.serverData["users"] = this.getProcessedUsers(data);
    }, error => {
      console.log("An error occured while getting users from the server.");
    });

    this.taskService.getTasks().subscribe(data => {
      this.serverData["tasks"] = (data);
    }, error => {
      console.log("An error occured while getting tasks from the server.");
    });

    this.submittedtaskService.getAllSubmittedTasks().subscribe(data => {
      this.serverData["pending"] = this.getProcessedPending(data);
    }, error => {
      console.log("An error occured while getting pending tasks from the server.");
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

  getProcessedUsers(freshUsers: FullUser[]) {
    freshUsers.forEach(element => {
      element["primary_role"] = element.roles[0].name.split("_")[1];
      //Truthy equals because smoker is a boolean string.
      element["smoking"] = element["smoker"] == true ? "Yes" : "No";
      element[
        "week_summary"
      ] = `${element["week_total"]} / ${element["week_goal"]}`;
      element[
        "quarter_summary"
      ] = `${element["quarter_total"]} / ${element["quarter_goal"]}`;
    });
    
    return freshUsers;
  }

  getProcessedPending(freshPending: SubmittedTaskInfo[]) {
    freshPending.forEach(element => {
      element["time"] = new Date(element["completionDate"]).toLocaleString(
        "en-US",
        { timeZone: "America/Chicago" }
      );
    });

    return freshPending;
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

  newItem()
  {    
    let newOp = <AdminOperation>{};
    newOp.name = 'New';
    // newOp.new = EventInfo

    console.log(EventInfo.name);


    this.adminDialogComp.setOperation(newOp);
    this.ngxSmartModalService.getModal('adminDialog').open();
  }

  editItem(item : any) {
    let editOp = <AdminOperation>{};
    editOp.name = 'Edit';
    // newOp.new = EventInfo

    console.log(item.type);

    this.adminDialogComp.setOperation(editOp);
    this.ngxSmartModalService.getModal('adminDialog').open();
  }

  deleteItem(item: any) {
    this.ngxSmartModalService.getModal('adminDialog').open();
    console.log(this.adminDialogComp);
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
