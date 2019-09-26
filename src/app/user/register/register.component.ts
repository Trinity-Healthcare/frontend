import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"]
})
export class RegisterComponent implements OnInit {
  public displayText = "";
  public password1 = "";
  public password2 = "";
  constructor() {}

  ngOnInit() {}
  generateMessage() {
    if (this.password1 == this.password2) {
      this.displayText = "You have been successfully registered";
    } else {
      this.displayText = "The passwords entered do not match";
    }
  }
}
