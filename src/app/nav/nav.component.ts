import { Component, OnInit } from "@angular/core";
import * as $ from "jquery";
@Component({
  selector: "app-nav",
  templateUrl: "./nav.component.html",
  styleUrls: ["./nav.component.css"]
})
export class NavComponent implements OnInit {
  public loggedin: boolean = true;
  public admin: boolean = false;
  constructor() {}

  ngOnInit() {}

  login() {
    this.loggedin = true;
  }

  logout() {
    this.loggedin = false;
  }
}
