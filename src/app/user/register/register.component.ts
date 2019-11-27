/* 
 *  Copyright (C) 2019 Prime Inc - All Rights Reserved
 *  Unauthorized use of this file and its contents, via any medium is strictly prohibited.
 *  Authored by the Missouri State University Computer Science Department
 *  Fall 2019 CSC 450 - Group 2
 */

import { Component, OnInit, ViewChild } from "@angular/core";
import { SignUpInfo } from "src/app/services/auth/signup-info";
import { AuthService } from "src/app/services/auth/auth.service";
import { QuestionInfo } from "src/app/services/question/question.info";
import { QuestionService } from "src/app/services/question/question.service";
import { NgForm } from '@angular/forms';
import { Router } from "@angular/router";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"]
})
export class RegisterComponent implements OnInit {
  @ViewChild("signupForm", { static: false }) signupForm : NgForm;

  public displayText = "";
  form: any = {};
  signupInfo: SignUpInfo;
  wasSignupSuccessful : boolean = false;
  questions: QuestionInfo[];
  chunkedquestions: QuestionInfo[];
  questions1: any = null;
  questions2: any = null;
  questions3: any = null;
  chunk: number = null;
  REGISTER_REDIRECT_TIMEOUT = 3000;


  constructor(
    private authService: AuthService,
    private questionService: QuestionService,
    private router: Router
  ) {}

  ngOnInit() {
    this.questionService.getQuestions().subscribe(
      data => {
        this.questions = data;
        this.questions1 = this.questions.slice(
          0,
          Math.floor(this.questions.length / 3)
        );
        this.questions2 = this.questions.slice(
          Math.floor(this.questions.length / 3),
          Math.floor(this.questions.length / 3) * 2
        );
        this.questions3 = this.questions.slice(
          Math.floor(this.questions.length / 3) * 2,
          this.questions.length
        );

        console.log(data);
      },
      error => {
        console.log(error);
      }
    );
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
    this.displayText = '';
    let formValues = this.signupForm.value;
    if (!this.isFormComplete(formValues)) {
      this.displayText = "Please fill out all fields.";
      this.wasSignupSuccessful = false;
    }
    else if(this.signupForm.value.password !== this.signupForm.value.passwordconfirmation)
    {
      this.displayText = "Passwords do not match.";
      this.wasSignupSuccessful = false;
    }
    else if(this.signupForm.value.password.length < 15)
    {
      this.displayText = "Your password should be at least 15 characters.";
      this.wasSignupSuccessful = false;
    }
    else {
      this.signupInfo = new SignUpInfo(
        this.form.name,
        this.form.username,
        this.form.email,
        this.form.password,
        this.form.question1.question,
        this.form.question2.question,
        this.form.question3.question,
        this.form.answer1,
        this.form.answer2,
        this.form.answer3
      );

      this.authService.signUp(this.signupInfo).subscribe(
        data => {
          console.log(data);
          let status = data['message'];

          if(status.includes('Error:'))
          {
            this.wasSignupSuccessful = false;
          }
          else
          {
            this.wasSignupSuccessful = true;
            data['message'] += " " + "You'll be redirected to the login page in a few seconds.";
            setTimeout(() => { this.router.navigate(['/login']); }, this.REGISTER_REDIRECT_TIMEOUT);
          }

          this.displayText = data['message'];
        },
        error => {
          console.log(error);
          this.displayText = "An error occured while attempting to sign up, please try again later."
          this.wasSignupSuccessful = false;
        }
      );
    }
  }
}
