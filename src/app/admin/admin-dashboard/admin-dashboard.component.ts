import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Task } from './Task';
import { TASKS } from './MOCK-TASKS';

import { User } from './User';
import { USERS } from './MOCK-USERS';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'],
})
export class AdminDashboardComponent implements OnInit, AfterViewInit {
  options: string[] = ['tasks', 'users', 'administrators'];
  selected: string;

  tasks: Task[] = TASKS;
  users: User[] = USERS;

  columnEnlarged: boolean[] = [];

  columns: HTMLCollectionOf<Element>;
  editButtons: HTMLCollectionOf<Element>;
  dropdown: HTMLSelectElement;

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.selected = this.route.snapshot.params.selectedDropdown;
    if (this.selected === undefined) {
      this.selected = 'tasks';
    }
    for (let i = 0; i < this.tasks.length; i++) {
      this.columnEnlarged.push(false);
    }
  }

  ngAfterViewInit(): void {
    this.columns = document.getElementsByClassName('dashboard-column');
    this.editButtons = document.getElementsByClassName('edit-button');
    this.dropdown = document.getElementById('dropdown') as HTMLSelectElement;
  }

  editClicked(index): void {
    this.animateColumn(this.columns[index]);
    for (let i = 0; i < this.columns.length; i++) {
      if (this.columnEnlarged[i] === true && i !== index) {
        this.columnEnlarged[i] = false;
        this.editButtons[i].firstChild.nodeValue = 'edit';
      }
    }
    if (this.columnEnlarged[index]) {
      this.editButtons[index].firstChild.nodeValue = 'edit';
    }
    if (!this.columnEnlarged[index]) {
      this.editButtons[index].firstChild.nodeValue = 'done';
    }
    this.columnEnlarged[index] = !this.columnEnlarged[index];
  }

  // dasbboard column expands when user clicks to show details
  animateColumn(target): void {
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
  parseColumns(callback): void {
    for (let i = 0; i < this.columns.length; i++) {
      if (this.columns[i].classList.contains('dashboard-column-enlarged')) {
        this.columns[i].classList.add('dashboard-column-contracted');
        this.columns[i].classList.remove('dashboard-column-enlarged');
      }
    }
    callback();
  }

  // fixes visual bug when changing dropdown
  shrinkAllColumns(): void {
    for (let i = 0; i < this.columnEnlarged.length; i++) {
      if (this.columnEnlarged[i] === true) {
        this.columns[i].classList.remove('dashboard-column-enlarged');
        this.columns[i].classList.add('dashboard-column-contracted');
        this.columnEnlarged[i] = false;
      }
    }
  }

  dropdownChanged(): void {
    const index = this.dropdown.selectedIndex;
    const param = this.dropdown.options[index].value.toLocaleLowerCase();
    this.selected = param;
    this.shrinkAllColumns();
    this.router.navigate([`admin-dashboard/${param}`]);
  }
}
