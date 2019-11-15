import { Component, OnInit, ViewChild } from '@angular/core';
import { Columns, API, Config, DefaultConfig, APIDefinition } from 'ngx-easy-table';
import { UserService } from 'src/app/services/user.service';
import { FullUser } from 'src/app/services/full-user';
import { UsertaskService } from 'src/app/services/usertask/usertask.service';
import { RetrievedUserTaskInfo } from 'src/app/services/usertask/retrievedUserTask-info';
import { TaskServiceService } from 'src/app/services/task/task-service.service';
import { ActivatedRoute } from '@angular/router';
import { EventService } from 'src/app/services/event/event.service';
import { RetrievedTask } from 'src/app/services/task/retrievedTask-info';

@Component({
  selector: 'app-admin-redux',
  templateUrl: './admin-redux.component.html',
  styleUrls: ['./admin-redux.component.css']
})
export class AdminReduxComponent implements OnInit {
  @ViewChild('primaryDataTable', { static: false }) primaryDataTable: APIDefinition;
  @ViewChild('itemActionsTemplate', { static: false }) actionsTemplate: APIDefinition;

  public configuration: Config;
  public selectedView: string = '';
  public selectedViewTab: HTMLElement = null;
  public selectedViewData: any = null;
  public selectedViewColumns: Columns[] = null;

  public serverData: any = null;

  private readonly ALLOWED_COLUMNS = {
    'users' : [
      { key: 'name', title : 'Name'},
      { key: 'username', title : 'Username' },
      { key : 'email', title : 'Email' },
      { key : 'payroll_code', title : 'Payroll Code'},
      { key : 'week_summary', title : 'Weekly Status'},
      { key : 'quarter_summary', title : 'Quarterly Status'},
      { key : 'category.name', title : 'Group' },
      { key : 'smoking', title : 'Smoking' },
      { key : 'primary_role', title : 'Role'}
    ],

    'pending' : [
      { key: 'userId', title : 'User'},
      { key: 'associated_task.taskName', title : 'Task'},
      { key: 'description', title : 'Comments' },
      { key: 'photo', title : 'Photo' },
      { key : 'taskPoints', title : 'Points' },
      { key : 'time', title : 'Time'},
      { key : 'status', title : 'Status'}
    ],

    'tasks' : [
      { key: 'taskName', title : 'Name'},
      { key: 'taskAction', title : 'Action'},
      { key: 'taskPoints', title : 'Points' },
      { key : 'taskMax', title : 'Maximum' },
      { key : 'taskFreq', title : 'Time'},
      { key : 'verificationRequired', title : 'Needs Admin Approval'},
      { key : 'photoRequired', title : 'Needs Photo'}
    ],

    'events' : [
      { key: 'title', title : 'Name'},
      { key: 'description', title : 'Description'},
      { key: 'date', title : 'Points' },
      { key : 'start', title : 'Start' },
      { key : 'end', title : 'End'},
      { key : 'link', title : 'Link'}
    ]
  };

  public ADMIN_VIEWS = [
    'users',
    'pending',
    'groups',
    'tasks',
    'events'
  ]

  constructor(
    private userService: UserService,
    private userTaskService: UsertaskService,
    private taskService: TaskServiceService,
    private eventsService: EventService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.configuration = { ...DefaultConfig };
    // this.configuration.orderEnabled = true;
    // this.configuration.threeWaySort = true;

    this.route.fragment.subscribe((hash: string) => {
      this.selectedView = hash === null ? this.ADMIN_VIEWS[0] : hash
    });
  }

  ngAfterViewInit() {
    this.serverData = {};
    this.userService.getUsers().toPromise().then((data) => {
      this.serverData['users'] = this.getProcessedUsers(data);
      return this.taskService.getTasks().toPromise();
    }).then((data) => {
      this.serverData['tasks'] = this.getProcessedTasks(data);
      console.log(data);
      return this.userTaskService.getAllUserTasks().toPromise();
    }).then((data) => {
      this.serverData['pending'] = this.getProcessedPending(data);
      return this.eventsService.getEvents().toPromise();
    }).then((data) => {
      this.serverData['events'] = data;
    }).then(() => {
      
      if(this.ADMIN_VIEWS.includes(this.selectedView))
      { 
        this.onViewChange('');
      }
      else
      {
        console.log("An invalid view was specified for the data table.");
      }

    }).catch((e) => {
      console.log(e);
    });
  }

  getProcessedUsers(freshUsers : FullUser[])
  {
    freshUsers.forEach((element) => {
      element['primary_role'] = element.roles[0].name.split('_')[1];
      element['smoking'] = element['smoker'] == true ? 'Yes' : 'No';
      element['week_summary'] = `${ element['week_total'] } / ${ element['week_goal'] }`;
      element['quarter_summary'] = `${ element['quarter_total'] } / ${ element['quarter_goal'] }`;
    });

    return freshUsers;
  }

  getProcessedPending(freshPending : RetrievedUserTaskInfo[])
  {
    freshPending.forEach((element) => {

      element['associated_task'] = this.serverData.tasks.filter((possibleTask) => {
        return possibleTask.taskId === element.taskId;
      });

      element['associated_task'] = element['associated_task'][0];
      element['time'] = new Date(element['completionDate']).toLocaleString('en-US', { timeZone : 'America/Chicago'});
    });

    return freshPending;
  }

  getProcessedTasks(freshTasks : RetrievedTask[])
  {
    freshTasks.forEach((element) => {
      element['verificationRequired'] = Boolean(element['verificationRequired']) === true ? 'Yes' : 'No';
      element['photoRequired'] = Boolean(element['photoRequired']) === true ? 'Yes' : 'No';
    });

    return freshTasks;
  }
  
  getDataColumns(base_columns)
  {
    let actionTemplate = { key : 'isActive', title : 'Actions',  cellTemplate: this.actionsTemplate };
    let viewColumns = base_columns;

    if(viewColumns[viewColumns.length - 1].key !== 'isActive')
    {
      viewColumns.push(actionTemplate);
    }

    return viewColumns;
  }

  editItem(itemIndex : Number) {
    console.log(itemIndex);
  }

  deleteItem(itemIndex : Number) {
    console.log(itemIndex);
    this.serverData.users = [...this.serverData.users.filter((_v, k) => k !== itemIndex)];
  }

  onViewChange(newView : string)
  {
    if(newView !== this.selectedView)
    {
      if(newView !== '' && this.selectedView)
      {
        this.selectedView = newView;
      }
      
      this.selectedViewData =  this.serverData[this.selectedView];
      this.selectedViewColumns = this.getDataColumns(this.ALLOWED_COLUMNS[this.selectedView]);
    }
  }

  toUpperCase(s : string)
  {
    return s.charAt(0).toUpperCase() + s.slice(1);
  }

  toLowerCase(s : string)
  {
    return s.charAt(0).toLowerCase() + s.slice(1);
  }

  onSearchChange(name: string): void {
    this.primaryDataTable.apiEvent({
      type: API.onGlobalSearch, value: name,
    });
  }
}
