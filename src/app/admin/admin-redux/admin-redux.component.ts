import { Component, OnInit } from '@angular/core';
import { Columns, Config, DefaultConfig } from 'ngx-easy-table';
import { UserService } from "src/app/services/user.service";
import { FullUser } from 'src/app/services/full-user';

@Component({
  selector: 'app-admin-redux',
  templateUrl: './admin-redux.component.html',
  styleUrls: ['./admin-redux.component.css']
})
export class AdminReduxComponent implements OnInit {

  public configuration: Config;
  public columns: Columns[];
  public users: FullUser[] = null;
  
  private USER_ALLOWED_COLUMNS = [
    'name',
    'username',
    'email',
    'payroll_code',
    'category',
    'week_total',
    'week_goal',
    'quarter_total',
    'quarter_goal',
    'roles'
  ];

  

  constructor(
    private userService: UserService
  ) { }

  ngOnInit() {
    this.configuration = { ...DefaultConfig };
    this.configuration.orderEnabled = true;
    this.configuration.threeWaySort = true;

    this.userService.getUsers().subscribe(
      data => {
        this.users = data;
        let possibleColumns = Object.keys(this.users[0]);
        let allowedColumns = possibleColumns.filter((element) => {
          return !this.USER_ALLOWED_COLUMNS.indexOf(element);
        });

        console.log(allowedColumns);

        console.log(data);
      },
      error => {
        console.log(error);
      }
    );
  }

}
