/* 
 *  Copyright (C) 2019 Prime Inc - All Rights Reserved
 *  Unauthorized use of this file and its contents, via any medium is strictly prohibited.
 *  Authored by the Missouri State University Computer Science Department
 *  Fall 2019 CSC 450 - Group 2
 */

import { Injectable } from "@angular/core";
import { HttpHeaders, HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { SubmittedTaskInfo } from "./submitted.task.info";
import { UsernameInfo } from "../user/username.info";

const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" })
};

@Injectable({
  providedIn: "root"
})
export class SubmittedTaskService {
  private newUserTaskUrl = "https://trinity-web-backend.azurewebsites.net/submitTasks";

  constructor(private http: HttpClient) {}

  submitTask(userTask: SubmittedTaskInfo): Observable<string> {
    console.log(userTask);
    return this.http.post<string>(this.newUserTaskUrl, userTask, httpOptions);
  }

  getUserSubmittedTasks(username: UsernameInfo) {
    return this.http.post<SubmittedTaskInfo[]>(
      "https://trinity-web-backend.azurewebsites.net/getUserTasks",
      username,
      httpOptions
    );
  }

  getUserTaskHistory(username: UsernameInfo) {
    return this.http.post<SubmittedTaskInfo[]>(
      "https://trinity-web-backend.azurewebsites.net/getUserHistory",
      username,
      httpOptions
    );
  }

  getAllSubmittedTasks() {
    return this.http.get<SubmittedTaskInfo[]>(
      "https://trinity-web-backend.azurewebsites.net/getPendingUserTasks",
      httpOptions
    );
  }

  editSubmittedTask(userTask: SubmittedTaskInfo): Observable<string> {
    return this.http.post<string>(
      "https://trinity-web-backend.azurewebsites.net/editSubmittedTask",
      userTask,
      httpOptions
    );
  }

}
