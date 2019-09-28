import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  options: string[] = ['Tasks', 'Users', 'Administrators'];
  selected: string = this.options[0];

  constructor() { }

  ngOnInit() {
  }
}
