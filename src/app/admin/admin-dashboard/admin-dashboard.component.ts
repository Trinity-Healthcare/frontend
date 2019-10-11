import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Task } from './Task';
import { TASKS } from './MOCK-TASKS';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit, AfterViewInit {

  options: string[] = ['Tasks', 'Users', 'Administrators'];
  selected: string;

  tasks: Task[] = TASKS;
  showDetails: boolean[] = [];
  columns: HTMLCollectionOf<Element>;


  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.selected = this.route.snapshot.params.selectedView.charAt(0).toUpperCase() +
      this.route.snapshot.params.selectedView.slice(1);
    for (let i = 0; i < this.tasks.length; i++) {
        this.showDetails.push(true);
    }
  }

  ngAfterViewInit(): void {
    this.columns = document.getElementsByClassName('dashboard-column');
  }

  editClicked(index) {
    this.animateColumn(this.columns[index]);
    for (let i = 0; i < this.showDetails.length; i++) {
      if (this.showDetails[i] === false && i !== index) {
        this.showDetails[i] = true;
      }
    }
    this.showDetails[index] = !this.showDetails[index];
  }

  // dasbboard column expands when user clicks to show details
  animateColumn(target) {
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
