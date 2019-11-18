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
  private newUserTaskUrl = "http://localhost:8080/submitTasks";

  constructor(private http: HttpClient) {}

  submitTask(userTask: SubmittedTaskInfo): Observable<string> {
    console.log(userTask);
    return this.http.post<string>(this.newUserTaskUrl, userTask, httpOptions);
  }

  getUserSubmittedTasks(username: UsernameInfo) {
    console.log("getting history test");
    return this.http.post<SubmittedTaskInfo[]>(
      "http://localhost:8080/getUserTasks",
      username,
      httpOptions
    );
  }

  getAllSubmittedTasks() {
    console.log("Getting all user tasks");
    return this.http.get<SubmittedTaskInfo[]>(
      "http://localhost:8080/getPendingUserTasks",
      httpOptions
    );
  }

  approveTask(userTask: SubmittedTaskInfo): Observable<string> {
    return this.http.post<string>(
      "http://localhost:8080/approveUserTask",
      userTask,
      httpOptions
    );
  }

  rejectTask(userTask: SubmittedTaskInfo): Observable<string> {
    return this.http.post<string>(
      "http://localhost:8080/rejectUserTask",
      userTask,
      httpOptions
    );
  }
}