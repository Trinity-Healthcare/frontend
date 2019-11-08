import { Component, OnInit, AfterViewInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

import { RetrievedTask } from "src/app/services/task/retrievedTask-info";

import { TaskServiceService } from "src/app/services/task/task-service.service";
import { FullUser } from "src/app/services/full-user";
import { UserService } from "src/app/services/user.service";

import * as xlsx from "xlsx";

@Component({
  selector: "app-admin-dashboard",
  templateUrl: "./admin-dashboard.component.html",
  styleUrls: ["./admin-dashboard.component.css"]
})
export class AdminDashboardComponent implements OnInit, AfterViewInit {
  options: string[] = ["tasks", "users"];
  selected: string;

  taskBeingEdited: RetrievedTask;

  userBeingEdited: FullUser;

  tasks: RetrievedTask[];
  users: FullUser[];
  compliantuserdata: FullUser[];

  columnEnlarged: boolean[] = [];

  columns: HTMLCollectionOf<Element>;
  editButtons: HTMLCollectionOf<Element>;
  dropdown: HTMLSelectElement;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private taskService: TaskServiceService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.selected = this.route.snapshot.params.selectedDropdown;
    if (this.selected === undefined) {
      this.selected = "tasks";
    }

    this.taskService.getTasks().subscribe(
      data => {
        this.tasks = data;
        console.log(this.tasks);
        for (let i = 0; i < this.tasks.length; i++) {
          this.columnEnlarged.push(false);
        }
      },
      error => {
        console.log(error);
      }
    );
    this.userService.getUsers().subscribe(
      data => {
        this.users = data;
        console.log(data);
      },
      error => {
        console.log(error);
      }
    );
    this.userService.getCompliantUsers().subscribe(
      data => {
        this.compliantuserdata = data;
        console.log(this.compliantuserdata);
      },
      error => {
        console.log(error);
      }
    );
  }

  ngAfterViewInit(): void {
    this.columns = document.getElementsByClassName("dashboard-column");
    this.editButtons = document.getElementsByClassName("edit-button");
    this.dropdown = document.getElementById("dropdown") as HTMLSelectElement;
  }

  editClicked(index): void {
    if (this.selected == "tasks") {
      this.taskBeingEdited = this.tasks[index];
      this.animateColumn(this.columns[index]);
      for (let i = 0; i < this.columns.length; i++) {
        if (this.columnEnlarged[i] === true && i !== index) {
          this.columnEnlarged[i] = false;
          this.editButtons[i].firstChild.nodeValue = "edit";
        }
      }
      if (this.columnEnlarged[index]) {
        this.editButtons[index].firstChild.nodeValue = "edit";
      }
      if (!this.columnEnlarged[index]) {
        this.editButtons[index].firstChild.nodeValue = "done";
      }
      this.columnEnlarged[index] = !this.columnEnlarged[index];
    }
    if (this.selected == "users") {
      this.userBeingEdited = this.users[index];
      this.animateColumn(this.columns[index]);
      for (let i = 0; i < this.columns.length; i++) {
        if (this.columnEnlarged[i] === true && i !== index) {
          this.columnEnlarged[i] = false;
          this.editButtons[i].firstChild.nodeValue = "edit";
        }
      }
      if (this.columnEnlarged[index]) {
        this.editButtons[index].firstChild.nodeValue = "edit";
      }
      if (!this.columnEnlarged[index]) {
        this.editButtons[index].firstChild.nodeValue = "done";
      }
      this.columnEnlarged[index] = !this.columnEnlarged[index];
    }
  }

  // dasbboard column expands when user clicks to show details
  animateColumn(target): void {
    if (target.classList.contains("dashboard-column-enlarged")) {
      target.classList.add("dashboard-column-contracted");
      target.classList.remove("dashboard-column-enlarged");
    } else {
      this.parseColumns(() => {
        target.classList.add("dashboard-column-enlarged");
        target.classList.remove("dashboard-column-contracted");
      });
    }
  }

  // formats columns to have only one/zero columns showing details at a time
  parseColumns(callback): void {
    for (let i = 0; i < this.columns.length; i++) {
      if (this.columns[i].classList.contains("dashboard-column-enlarged")) {
        this.columns[i].classList.add("dashboard-column-contracted");
        this.columns[i].classList.remove("dashboard-column-enlarged");
      }
    }
    callback();
  }

  // fixes visual bug when changing dropdown
  shrinkAllColumns(): void {
    for (let i = 0; i < this.columnEnlarged.length; i++) {
      if (this.columnEnlarged[i] === true) {
        this.columns[i].classList.remove("dashboard-column-enlarged");
        this.columns[i].classList.add("dashboard-column-contracted");
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

  exportCompliantUsers() {
    let compliantlist = [];
    let headers = ["Name", "Employee Id", "Payroll Code"];
    compliantlist.push(headers);
    for (let i = 0; i < this.compliantuserdata.length; i++) {
      let compliantuser = [
        this.compliantuserdata[i].name,
        this.compliantuserdata[i].username,
        this.compliantuserdata[i].payrollcode
      ];
      compliantlist.push(compliantuser);
    }
    console.log(compliantlist);

    let worksheet = xlsx.utils.aoa_to_sheet(compliantlist);
    //let excelbuffer = xlsx.write(workbook, {bookType: 'xlsx',type:'array'});
    let wb = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(wb, worksheet, "compliant");
    xlsx.writeFile(wb, "compliantlist.xlsx");
  }
}
