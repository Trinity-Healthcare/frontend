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
  public columns: Columns[] = null;
  public users: FullUser[] = null;
  
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
        this.getDataColumns(this.users[0]);

        this.users.forEach((element) => {
          element.roles[0].name = element.roles[0].name.split('_')[1];
          // element.smoker = true;

          // if(!element.payroll_code)
          // {
          //   element.payroll_code = 'stuff';
          // }

        });

      },
      error => {
        console.log(error);
      }
    );
  }
  
  getDataColumns(sample_data)
  {
    let possibleColumns = Object.keys(sample_data);
    let allowedColumns = possibleColumns.filter((element) => {
      return this.USER_ALLOWED_COLUMNS.indexOf(element) >= 0;
    });

    this.columns = [];

    allowedColumns.forEach((element) => {
      let elementReadable = element.charAt(0).toUpperCase() + element.slice(1);
      let isUnderscorePresent = element.indexOf('_') >= 0;

      if(isUnderscorePresent)
      {
        let split = elementReadable.split('_');
        split[1] = split[1].charAt(0).toUpperCase() + split[1].slice(1);
        elementReadable = `${split[0]} ${split[1]}`
      }

      this.columns.push({ key : element, title : elementReadable});
    });
  }

}
