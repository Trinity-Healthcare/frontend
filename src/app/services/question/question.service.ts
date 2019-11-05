import { Injectable } from "@angular/core";
import { RetrievedQuestionInfo } from "./retrievedQuestion-info";
import { HttpHeaders, HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { RetrievedQuestions } from "./RetrievedQuestions";
import { UserNameInfo } from "../username-info";
import { AnswerInfo } from "./answer-info";

const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" })
};

@Injectable({
  providedIn: "root"
})
export class QuestionService {
  constructor(private http: HttpClient) {}

  getQuestions(): Observable<RetrievedQuestionInfo[]> {
    console.log("getting questions test");
    return this.http.get<RetrievedQuestionInfo[]>(
      "http://localhost:8080/api/auth/getallquestions"
    );
  }
  getUserQuestions(username: UserNameInfo): Observable<RetrievedQuestions> {
    console.log("getting user questions");
    return this.http.post<RetrievedQuestions>(
      "http://localhost:8080/api/auth/getquestions",
      username,
      httpOptions
    );
  }
  resetPassword(answers: AnswerInfo): Observable<String> {
    console.log("resetting user password");
    return this.http.post<String>(
      "http://localhost:8080/api/auth/resetpassword",
      answers,
      httpOptions
    );
  }
}
