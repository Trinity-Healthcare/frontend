import { Component, OnInit, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, AfterViewInit {

  options: string[] = ['Tasks', 'Users', 'Administrators'];
  selected: string = this.options[2];

  elements: HTMLCollectionOf<Element>;

  numUsers: number[] = [1, 2, 3, 4, 5, 6, 7];

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit(): void {

    this.elements = document.getElementsByClassName('employee-div');

    for (let i = 0; i < this.elements.length; i++) {
      this.elements[i].addEventListener('click', () => {
        this.parseEmployeeDivs(this.elements[i]);
      });
    }

  }

  parseEmployeeDivs(clickedElement) {

    for (let i = 0; i < this.elements.length; i++) {
      if (this.elements[i].classList.contains('employee-div-enlarged')) {
        this.elements[i].classList.remove('employee-div-enlarged');
        this.elements[i].classList.add('employee-div-contracted');
      }
    }

    clickedElement.classList.add('employee-div-enlarged');

  }
}
