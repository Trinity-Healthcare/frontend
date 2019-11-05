import { Component, OnInit } from "@angular/core";
import { SignUpInfo } from "src/app/services/auth/signup-info";
import { AuthService } from "src/app/services/auth/auth.service";
import { RetrievedQuestionInfo } from "src/app/services/question/retrievedQuestion-info";
import { QuestionService } from "src/app/services/question/question.service";

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
  passwordsMatch = false;
  errorMessage = "";
  public displayText = "";
  public passwordconfirmation = "";
  questions: RetrievedQuestionInfo[];
  chunkedquestions: RetrievedQuestionInfo[];
  questions1: any = null;
  questions2: any = null;
  questions3: any = null;
  chunk: number = null;

  constructor(
    private authService: AuthService,
    private questionService: QuestionService
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

  onSubmit() {
    console.log(this.form);
    if (this.form.password != this.passwordconfirmation) {
      this.passwordsMatch = false;
      let text = "No password provided";
      this.generateMessage(text);
    } else {
      this.passwordsMatch = true;
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
          console.log(this.signupInfo);
          this.isSignedUp = true;
          this.isSignUpFailed = false;
          let text: string = data;
          this.generateMessage(text);
        },
        error => {
          console.log(error);
          this.errorMessage = error.error.message;
          this.isSignUpFailed = true;
          this.passwordsMatch == true;
          let text: string = error;
          this.generateMessage(text);
        }
      );
    }
  }
  generateMessage(text) {
    if (this.isSignUpFailed == false) {
      this.displayText = text;
    } else {
      if (this.passwordsMatch == false) {
        this.displayText = "Passwords do not match";
      } else {
        this.displayText = text;
      }
    }
  }
}
