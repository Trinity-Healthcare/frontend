/* 
 *  Copyright (C) 2019 Prime Inc - All Rights Reserved
 *  Unauthorized use of this file and its contents, via any medium is strictly prohibited.
 *  Authored by the Missouri State University Computer Science Department
 *  Fall 2019 CSC 450 - Group 2
 */

import { Injectable } from "@angular/core";
import { HttpHeaders, HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { UserQuestionsInfo } from "./userquestions.info.";
import { UsernameInfo } from "../user/username.info";
import { AnswerInfo } from "./answer.info";
import { QuestionInfo } from "./question.info";

const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" })
};

@Injectable({
  providedIn: "root"
})
export class QuestionService {
  constructor(private http: HttpClient) {}

  getQuestions(): Observable<QuestionInfo[]> {
    console.log("getting questions test");
    return this.http.get<QuestionInfo[]>(
      "http://localhost:8080/api/auth/getallquestions"
    );
  }
  getUserQuestions(username: UsernameInfo): Observable<UserQuestionsInfo> {
    console.log("getting user questions");
    console.log(username);
    return this.http.post<UserQuestionsInfo>(
      "http://localhost:8080/api/auth/getquestions",
      username,
      httpOptions
    );
  }
  resetPassword(answers: AnswerInfo): Observable<string> {
    console.log("resetting user password");
    return this.http.post<string>(
      "http://localhost:8080/api/auth/resetpassword",
      answers,
      httpOptions
    );
  }
}
