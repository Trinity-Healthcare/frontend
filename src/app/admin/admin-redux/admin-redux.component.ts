import { Component, OnInit, ViewChild } from '@angular/core';
import { Columns, API, Config, DefaultConfig, APIDefinition } from 'ngx-easy-table';
import { UserService } from "src/app/services/user.service";
import { FullUser } from 'src/app/services/full-user';
import { UsertaskService } from 'src/app/services/usertask/usertask.service';
import { UserTaskInfo } from 'src/app/services/usertask/usertask-info';
import { RetrievedUserTaskInfo } from 'src/app/services/usertask/retrievedUserTask-info';

@Component({
  selector: 'app-admin-redux',
  templateUrl: './admin-redux.component.html',
  styleUrls: ['./admin-redux.component.css']
})
export class AdminReduxComponent implements OnInit {
  @ViewChild('primaryDataTable', { static: false }) primaryDataTable: APIDefinition;

  public configuration: Config;
  public userColumns: Columns[] = null;
  public users: FullUser[] = null;
  public pendingColumns: Columns[] = null;
  public pending: RetrievedUserTaskInfo[] = null; 
  
  private USER_ALLOWED_COLUMNS = [
    'name',
    'username',
    'email',
    'payroll_code',
    'category',
    'smoker',
    'week_total',
    'quarter_total',
    'roles'
  ];

  public ADMIN_VIEWS = [
    'users',
    'pending',
    'groups',
    'tasks',
    'events'
  ]

  private SUBMITTED_TASK_ALLOWED_COLUMNS = [
    'name',
  ];

  constructor(
    private userService: UserService,
    private userTaskService: UsertaskService,
  ) { }

  ngOnInit() {
    this.configuration = { ...DefaultConfig };
    this.configuration.orderEnabled = true;
    this.configuration.threeWaySort = true;

    this.userService.getUsers().subscribe(
      data => {
        this.users = data;
        this.userColumns = this.getDataColumns(this.USER_ALLOWED_COLUMNS, this.users[0]);

        this.users.forEach((element) => {
          element.roles[0].name = element.roles[0].name.split('_')[1];
        });

      },
      error => {
        console.log(error);
      }
    );

    this.userTaskService.getAllUserTasks().subscribe(
      data => {
        this.pending = data;
        // this.pendingColumns = this.getDataColumns(this.SUBMITTED_TASK_ALLOWED_COLUMNS, this.pending[0])
      },
      error => {
        console.log(error);
      }
    );
    
  }
  
  getDataColumns(filter, sample_data)
  {
    let viewColumns = [];
    let possibleColumns = Object.keys(sample_data);
    let allowedColumns = possibleColumns.filter((element) => {
      return filter.indexOf(element) >= 0;
    });

    allowedColumns.forEach((element) => {
      let elementReadable = element.charAt(0).toUpperCase() + element.slice(1);
      let isUnderscorePresent = element.indexOf('_') >= 0;

      if(isUnderscorePresent)
      {
        let split = elementReadable.split('_');
        split[1] = split[1].charAt(0).toUpperCase() + split[1].slice(1);
        elementReadable = `${split[0]} ${split[1]}`
      }

      viewColumns.push({ key : element, title : elementReadable});
    });

    viewColumns.push ({ key : 'isActive', title : 'Edit'});
    viewColumns.push ({ key : 'isActive', title : 'Delete'});

    return viewColumns;
  }

  onChange(name: string): void {
    this.primaryDataTable.apiEvent({
      type: API.onGlobalSearch, value: name,
    });
  }
}
