import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { TaskInfo } from "./task-info";
import { RetrievedTask } from "./retrievedTask-info";

const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" })
};

export class Task {
  taskId: number;
  taskName: string;
  taskAction: string;
  taskPoints: number;
  taskMax: number;
  taskFreq: string;
  photoRequired: boolean;
  verificationRequired: string;
  constructor(
    taskId: number,
    taskName: string,
    taskAction: string,
    taskPoints: number,
    taskMax: number,
    taskFreq: string,
    photoRequired: boolean,
    verificationRequired: string
  ) {
    this.taskId = taskId;
    this.taskName = taskName;
    this.taskAction = taskAction;
    this.taskPoints = taskPoints;
    this.taskMax = taskMax;
    this.taskFreq = taskFreq;
    this.photoRequired = photoRequired;
    this.verificationRequired = verificationRequired;
  }
}

// export class Task {
//   constructor(
//     public taskId: string,
//     public taskName: string,
//     public photoRequired: string,
//     public pointValue: string
//   ) {}
// }

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

  getTasks(): Observable<RetrievedTask[]> {
    console.log("getting tasks test");
    return this.http.get<RetrievedTask[]>("http://localhost:8080/getTasks");
  }

  deleteTask(task): Observable<any> {
    return this.http.post("http://localhost:8080/deleteTask", {
      task
    });
  }

  editTask(task: RetrievedTask): Observable<string> {
    return this.http.post<string>(
      "http://localhost:8080/editTask",
      task,
      httpOptions
    );
  }
}
