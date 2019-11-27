/* 
 *  Copyright (C) 2019 Prime Inc - All Rights Reserved
 *  Unauthorized use of this file and its contents, via any medium is strictly prohibited.
 *  Authored by the Missouri State University Computer Science Department
 *  Fall 2019 CSC 450 - Group 2
 */

import { Component, OnInit, ViewChild } from "@angular/core";
import { AuthLoginInfo } from "src/app/services/auth/login-info";
import { AuthService } from "src/app/services/auth/auth.service";
import { TokenStorageService } from "src/app/services/auth/token-storage.service";
import { generate } from "rxjs";
import { Router } from "@angular/router";
import { NgForm } from '@angular/forms';

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  @ViewChild("loginForm", { static: false }) loginForm : NgForm;

  roles: string[] = [];
  form: any = {};
  isLoggedIn: boolean = false;
  loginAlertStyle = 'info';
  public displayText = "";
  private loginInfo: AuthLoginInfo;

  constructor(
    private authService: AuthService,
    private tokenStorage: TokenStorageService,
    private router: Router
  ) {}

  ngOnInit() {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getAuthorities();
    }
  }

  isFormComplete(enteredValues : any) {

    for( let formKey in enteredValues)
    {
      if(!enteredValues[formKey])
      {
        return false;
      }
    }

    return true;
  }

  onSubmit() {
    if(this.isFormComplete(this.loginForm.value))
    {
      this.loginAlertStyle = 'info';
      this.displayText = "Authenticating, please wait...";

      this.loginInfo = new AuthLoginInfo(this.form.username, this.form.password);
  
      this.authService.attemptAuth(this.loginInfo).subscribe(
        data => {
          this.tokenStorage.saveToken(data.accessToken);
          this.tokenStorage.saveUsername(data.username);
          this.tokenStorage.saveAuthorities(data.authorities);
  
          this.loginAlertStyle = 'success';
          this.displayText = "You have been successfully logged in.";
          
          this.isLoggedIn = true;
          this.roles = this.tokenStorage.getAuthorities();
          this.reloadPage();
        },
        error => {
          console.log(error);
          this.loginAlertStyle = 'danger';
          this.displayText = "Failed to sign in, please check your username or password and try again.";
        }
      );
    }
    else {
      this.loginAlertStyle = 'danger';
      this.displayText = "Please enter your credentials.";
    }
  }

  reloadPage() {
    window.location.reload();
  }
}
