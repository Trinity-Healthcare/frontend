import { Component, OnInit } from "@angular/core";
import { UsernameInfo } from "../services/username.info";
import { QuestionService } from "../services/question/question.service";
import { UserQuestionsInfo } from "../services/question/userquestions.info.";
import { AnswerInfo } from "../services/question/answer.info";
import { Router } from "@angular/router";

@Component({
  selector: "app-forgot-password",
  templateUrl: "./forgot-password.component.html",
  styleUrls: ["./forgot-password.component.css"]
})
export class ForgotPasswordComponent implements OnInit {
  public displayClass = "classNone";
  public displayText = "";
  retrievalusername: any;
  questionSet: UserQuestionsInfo = null;
  message: any;

  constructor(
    private questionService: QuestionService,
    private router: Router
  ) {}

  ngOnInit() {}

  retrieveQuestions(username) {
    this.retrievalusername = new UsernameInfo(username);
    this.questionService
      .getUserQuestions(this.retrievalusername)
      .subscribe(data => {
        this.questionSet = data;
        console.log(data);
      });
  }

  resetPassword(answer1, answer2, answer3, newpassword) {
    let answers = new AnswerInfo(
      this.retrievalusername.username,
      answer1,
      answer2,
      answer3,
      newpassword
    );
    console.log(answers);
    this.questionService.resetPassword(answers).subscribe(
      data => {
        console.log(data);
        this.message = data;
        this.generateMessage(this.message.message);
        this.router.navigate(["login"]);
      },
      error => {
        console.log(error);
        let text = "Password reset failed";
        this.generateMessage("Password reset failed");
      }
    );
  }
  generateMessage(text) {
    this.displayText = text;
  }
}
