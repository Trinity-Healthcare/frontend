import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-reset-password",
  templateUrl: "./reset-password.component.html",
  styleUrls: ["./reset-password.component.css"]
})
export class ResetPasswordComponent implements OnInit {
  public displayClass = "classNone";
  public displayText = "";
  public password1 = "";
  public password2 = "";
  constructor() {}

  ngOnInit() {}
  generateMessage() {
    if (this.password1 == this.password2) {
      this.displayText = "Your password has been successfully changed";
    }
  }
  // resetSuccess() {
  //   this.displayClass = "classFlex";
  // }
}
