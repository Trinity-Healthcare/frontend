import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-forgot-password",
  templateUrl: "./forgot-password.component.html",
  styleUrls: ["./forgot-password.component.css"]
})
export class ForgotPasswordComponent implements OnInit {
  public displayClass = "classNone";
  public displayText = "";
  constructor() {}

  ngOnInit() {}

  messageSent() {
    this.displayClass = "classFlex";
  }
  generateMessage(text) {
    this.displayText =
      "Check your inbox. Password retrieval instructions have been sent to " +
      text;
  }
}
