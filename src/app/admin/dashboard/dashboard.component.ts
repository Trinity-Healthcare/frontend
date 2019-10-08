import { Component, OnInit, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, AfterViewInit {

  options: string[] = ['Tasks', 'Users', 'Administrators'];
  selected: string = this.options[0];

  columns: HTMLCollectionOf<Element>;

  numUsers: number[] = [1, 2, 3, 4, 5, 6, 7];

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    this.columns = document.getElementsByClassName('dashboard-column');
  }

  // show details on clicked column
  animateColumn(event) {
    const target = event.target || event.srcElement || event.currentTarget;
    if (target.classList.contains('dashboard-column-enlarged')) {
      target.classList.add('dashboard-column-contracted');
      target.classList.remove('dashboard-column-enlarged');
    } else {
      this.parseColumns(() => {
        target.classList.add('dashboard-column-enlarged');
        target.classList.remove('dashboard-column-contracted');
      });
    }
  }

  // formats columns to have only one/zero columns showing details at a time
  parseColumns(callback) {
    for (let i = 0; i < this.columns.length; i++) {
      if (this.columns[i].classList.contains('dashboard-column-enlarged')) {
        this.columns[i].classList.add('dashboard-column-contracted');
        this.columns[i].classList.remove('dashboard-column-enlarged');
      }
    }
    callback();
  }
}
