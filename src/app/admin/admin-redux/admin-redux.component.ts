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
  public serverData: any = {};

  public ADMIN_VIEWS = [
    {
      name : 'users',
      allowed_columns : [
        { key: "name", title: "Name" },
        { key: "username", title: "Username" },
        { key: "email", title: "Email" },
        { key: "payroll_code", title: "Payroll Code" },
        { key: "_week_summary", title: "Weekly Status" },
        { key: "_quarter_summary", title: "Quarterly Status" },
        { key: "category.name", title: "Group" },
        { key: "_smoking", title: "Smoking" },
        { key: "_primary_role", title: "Role" }
      ]
    },
    {
      name : 'pending',
      allowed_columns : [
        { key: "userId", title: "User" },
        { key: "_associated_task.taskName", title: "Task" },
        { key: "description", title: "Comments" },
        { key: "photo", title: "Photo" },
        { key: "taskPoints", title: "Points" },
        { key: "_time", title: "Time" },
        { key: "status", title: "Status" }
      ],
    },
    {
      name : 'groups',
      allowed_columns : [
        { key: "name", title: "Name" },
        { key: "description", title: "Description" },
        { key: "quarterly_goal", title: "Quarterly Goal" }
      ],
    },
    {
      name : 'tasks',
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
    private location: Location,
    private route: ActivatedRoute,
    public ngxSmartModalService: NgxSmartModalService
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
  }

  processServerData() {    
    this.userService.getUsers().toPromise().then((data) => {
      this.serverData['users'] = this.getProcessedUsers(data);
      return this.taskService.getTasks().toPromise();
    }).then((data) => {
      this.serverData['tasks'] = data;
      return this.submittedtaskService.getAllSubmittedTasks().toPromise();
    }).then((data) => {
      this.serverData['pending'] = this.getProcessedPending(data);
      return this.eventsService.getEvents().toPromise();
    }).then((data) => {
      this.serverData['events'] = data;
      return this.categoryService.getAllCategories().toPromise();
    }).then((data) => {
      this.serverData['groups'] = data;
      this.adminDialogComp.availableGroups = data;
    }).then(() => {
      this.ADMIN_VIEWS.forEach((view) => {
        if(view.name === this.selectedView)
        {
          this.onViewChange("");
        }
      });
    }).catch((e) => {
      console.log("Could not get all data from the server.");
      console.log(e);
    });


  }

  isServerDataAvailable() {
    return Object.keys(this.serverData).length === this.ADMIN_VIEWS.length;
  }

  getPendingAmount()
  {
    let amount = -1;

    if(this.isServerDataAvailable())
    {
      amount = this.serverData['pending'].length;
    }

    return amount;
  }

  getProcessedUsers(freshUsers: FullUser[]) {
    freshUsers.forEach(element => {
      element["_primary_role"] = element.roles[0].name.split("_")[1];
      element["_smoking"] = element.smoker == true ? "Yes" : "No";
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

      element['_associated_task'] = this.serverData.tasks.filter((possibleTask) => {
        return possibleTask.taskId === element.taskId;
      });

      element['_associated_task'] = element['_associated_task'][0];

      element["_time"] = new Date(element["completionDate"]).toLocaleString(
        "en-US",
        { timeZone: "America/Chicago" }
      );
    });

    return freshPending;
  }

  getDataColumns(base_columns) {
    let actionTemplate = {
      key: "_isActive",
      title: "Actions",
      cellTemplate: this.actionsTemplate
    };

    let viewColumns = base_columns;

    if (viewColumns[viewColumns.length - 1].key !== "_isActive") {
      viewColumns.push(actionTemplate);
    }

    return viewColumns;
  }

  performOp(opName : string, item : any)
  {    
    let requestedOp = <AdminOperation>{};
    requestedOp.name = opName;
    requestedOp.data = item === null ? this.serverData[this.selectedView][0] : item;
    requestedOp.dataType = this.selectedView;
    
    requestedOp.operation = () => {
      console.log("Hello world!");
    }

    this.adminDialogComp.setOperation(requestedOp);
    this.ngxSmartModalService.getModal('adminDialog').open();
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
