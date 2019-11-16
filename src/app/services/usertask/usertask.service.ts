import { Injectable } from "@angular/core";
import { HttpHeaders, HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { UserTaskInfo } from "./usertask-info";
import { RetrievedUserTaskInfo } from "./retrievedUserTask-info";
import { UsernameInfo } from "../username.info";

const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" })
};

@Injectable({
  providedIn: "root"
})
export class UsertaskService {
  private newUserTaskUrl = "http://localhost:8080/submitTasks";

  constructor(private http: HttpClient) {}

  createUserTask(userTask: UserTaskInfo): Observable<string> {
    console.log(userTask);
    return this.http.post<string>(this.newUserTaskUrl, userTask, httpOptions);
  }
  getHistory(username: UsernameInfo) {
    console.log("getting history test");
    return this.http.post<RetrievedUserTaskInfo[]>(
      "http://localhost:8080/getUserTasks",
      username,
      httpOptions
    );
  }

  getAllUserTasks() {
    console.log("Getting all user tasks");
    return this.http.get<RetrievedUserTaskInfo[]>(
      "http://localhost:8080/getPendingUserTasks",
      httpOptions
    );
  }

  approveUserTask(userTask: RetrievedUserTaskInfo): Observable<string> {
    return this.http.post<string>(
      "http://localhost:8080/approveUserTask",
      userTask,
      httpOptions
    );
  }

  rejectUserTask(userTask: RetrievedUserTaskInfo): Observable<string> {
    return this.http.post<string>(
      "http://localhost:8080/rejectUserTask",
      userTask,
      httpOptions
    );
  }
}
