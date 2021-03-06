/*
 *  Copyright (C) 2019 Prime Inc - All Rights Reserved
 *  Unauthorized use of this file and its contents, via any medium is strictly prohibited.
 *  Authored by the Missouri State University Computer Science Department
 *  Fall 2019 CSC 450 - Group 2
 */

import { Component, OnInit, OnDestroy } from "@angular/core";
import { UsernameInfo } from "../services/user/username.info";
import { QuestionService } from "../services/question/question.service";
import { UserQuestionsInfo } from "../services/question/userquestions.info.";
import { AnswerInfo } from "../services/question/answer.info";
import { Router } from "@angular/router";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";

@Component({
  selector: "app-forgot-password",
  templateUrl: "./forgot-password.component.html",
  styleUrls: ["./forgot-password.component.css"]
})
export class ForgotPasswordComponent implements OnInit, OnDestroy {
  didOperationFail: boolean;
  resetStatus: string = "";
  retrievalusername: any;
  questionSet: UserQuestionsInfo = null;
  USER_MESSAGES = {
    resetDataFailure:
      "We couldn't find your password reset questions, please double check the username you have entered.",
    unknownFailure:
      "An unknown error occured while attempting to reset your password, please try again later.",
    incorrectAnswers:
      "One or more of your answers was incorrect, please try again.",
    emptyFields: "Please fill out all fields.",
    passwordLength: "Your password should be at least 15 characters.",
    success:
      "Your password was reset successfully, you'll be redirected to the login page in a few seconds."
  };
  RESET_REDIRECT_TIMEOUT = 2000;

  private _ngUnsubscribe = new Subject();

  constructor(
    private questionService: QuestionService,
    private router: Router
  ) {}

  ngOnInit() {}

  ngOnDestroy() {
    // prevent memory leaks
    this._ngUnsubscribe.next();
    this._ngUnsubscribe.complete();
  }

  resetOperationStatus() {
    this.didOperationFail = false;
    this.resetStatus = "";
  }

  retrieveQuestions(username) {
    this.resetOperationStatus();
    this.retrievalusername = new UsernameInfo(username);
    this.questionService
      .getUserQuestions(this.retrievalusername)
      .pipe(takeUntil(this._ngUnsubscribe))
      .subscribe(
        data => {
          this.questionSet = data;
          console.log(data);
        },
        error => {
          this.didOperationFail = true;
          this.resetStatus = this.USER_MESSAGES.resetDataFailure;
        }
      );
  }

  resetPassword(answer1, answer2, answer3, newpassword) {
    this.resetOperationStatus();
    let answers = new AnswerInfo(
      this.retrievalusername.username,
      answer1,
      answer2,
      answer3,
      newpassword
    );

    if (!(answer1 && answer2 && answer3 && newpassword)) {
      this.didOperationFail = true;
      this.resetStatus = this.USER_MESSAGES.emptyFields;
    } else if (newpassword.length < 15) {
      this.didOperationFail = true;
      this.resetStatus = this.USER_MESSAGES.passwordLength;
    } else {
      this.questionService
        .resetPassword(answers)
        .pipe(takeUntil(this._ngUnsubscribe))
        .subscribe(
          data => {
            console.log(data);

            if (!data["message"].includes("succeeded")) {
              this.didOperationFail = true;
              this.resetStatus = this.USER_MESSAGES.incorrectAnswers;
            } else {
              this.didOperationFail = false;
              this.resetStatus = this.USER_MESSAGES.success;
              setTimeout(() => {
                this.router.navigate(["/login"]);
              }, this.RESET_REDIRECT_TIMEOUT);
            }
          },
          error => {
            console.log(error);
            this.resetStatus = this.USER_MESSAGES.unknownFailure;
            this.didOperationFail = true;
          }
        );
    }
  }
}
