import { Injectable } from "@angular/core";
import { HttpHeaders, HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { UserTaskInfo } from "./usertask-info";

const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" })
};

@Injectable({
  providedIn: "root"
})
export class UsertaskService {
  private newUserTaskUrl = "http://localhost:8080/createusertask";

  constructor(private http: HttpClient) {}

  createUserTask(userTask: UserTaskInfo): Observable<string> {
    console.log(userTask);
    return this.http.post<string>(this.newUserTaskUrl, userTask, httpOptions);
  }
}
