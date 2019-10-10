import { Component, OnInit } from "@angular/core";
import { AuthLoginInfo } from "src/app/services/auth/login-info";
import { AuthService } from "src/app/services/auth/auth.service";
import { TokenStorageService } from "src/app/services/auth/token-storage.service";
import { generate } from "rxjs";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  form: any = {};
  public displayText = "";
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = "";
  roles: string[] = [];
  private loginInfo: AuthLoginInfo;

  constructor(
    private authService: AuthService,
    private tokenStorage: TokenStorageService
  ) {}

  ngOnInit() {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getAuthorities();
    }
  }

  onSubmit() {
    console.log(this.form);

    this.loginInfo = new AuthLoginInfo(this.form.username, this.form.password);

    this.authService.attemptAuth(this.loginInfo).subscribe(
      data => {
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUsername(data.username);
        this.tokenStorage.saveAuthorities(data.authorities);

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.tokenStorage.getAuthorities();
        this.generateMessage();
        //this.reloadPage();
      },
      error => {
        console.log(error);
        this.errorMessage = error.error.message;
        this.isLoginFailed = true;
        this.generateMessage();
      }
    );
  }

  reloadPage() {
    window.location.reload();
  }

  generateMessage() {
    if (this.isLoginFailed == false) {
      this.displayText = "You have been successfully logged in";
    } else {
      this.displayText = "Sign in Failed";
    }
  }
}
