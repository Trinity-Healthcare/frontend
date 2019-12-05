/* 
 *  Copyright (C) 2019 Prime Inc - All Rights Reserved
 *  Unauthorized use of this file and its contents, via any medium is strictly prohibited.
 *  Authored by the Missouri State University Computer Science Department
 *  Fall 2019 CSC 450 - Group 2
 */

import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { TaskInfo } from "./task.info";

const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" })
};


@Injectable({
  providedIn: "root"
})
export class TaskServiceService {
  private newTaskUrl = "https://trinity-web-backend.azurewebsites.net/createNewTask";
  constructor(private http: HttpClient) {}

  createTask(task: TaskInfo): Observable<string> {
    console.log(task);
    return this.http.post<string>(this.newTaskUrl, task, httpOptions);
  }

  getTasks(): Observable<TaskInfo[]> {
    return this.http.get<TaskInfo[]>("https://trinity-web-backend.azurewebsites.net/getTasks");
  }

  deleteTask(task): Observable<any> {
    return this.http.post("https://trinity-web-backend.azurewebsites.net/deleteTask", {
      task
    });
  }

  editTask(task: TaskInfo): Observable<string> {
    return this.http.post<string>(
      "https://trinity-web-backend.azurewebsites.net/editTask",
      task,
      httpOptions
    );
  }
}
