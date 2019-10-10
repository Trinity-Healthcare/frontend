import { Component, OnInit } from "@angular/core";
import { SignUpInfo } from "src/app/services/auth/signup-info";
import { AuthService } from "src/app/services/auth/auth.service";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"]
})
export class RegisterComponent implements OnInit {
  form: any = {};
  signupInfo: SignUpInfo;
  isSignedUp = false;
  isSignUpFailed = false;
  errorMessage = "";
  public displayText = "";
  public password = "";
  public password2 = "";

  constructor(private authService: AuthService) {}

  ngOnInit() {}

  onSubmit() {
    console.log(this.form);

    this.signupInfo = new SignUpInfo(
      this.form.name,
      this.form.username,
      this.form.email,
      this.form.password
    );

    this.authService.signUp(this.signupInfo).subscribe(
      data => {
        console.log(data);
        console.log(this.signupInfo);
        this.isSignedUp = true;
        this.isSignUpFailed = false;
        this.generateMessage();
      },
      error => {
        console.log(error);
        this.errorMessage = error.error.message;
        this.isSignUpFailed = true;
        this.generateMessage();
      }
    );
  }
  generateMessage() {
    if (this.isSignUpFailed == false) {
      this.displayText = "You have been successfully registered";
    } else {
      this.displayText = "Registration Failed";
    }
  }
}
