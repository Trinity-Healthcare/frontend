import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { TaskInfo } from "./task-info";

const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" })
};

export class Task {
  constructor(
    public taskId: string,
    public taskName: string,
    public photoRequired: string,
    public pointValue: string
  ) {}
}

@Injectable({
  providedIn: "root"
})
export class TaskServiceService {
  private newTaskUrl = "http://localhost:8080/createtask";
  constructor(private http: HttpClient) {}

  createTask(task: TaskInfo): Observable<string> {
    console.log(task);
    return this.http.post<string>(this.newTaskUrl, task, httpOptions);
  }

  getTasks() {
    console.log("getting tasks test");
    return this.http.get<Task[]>("http://localhost:8080/getTasks");
  }
}
