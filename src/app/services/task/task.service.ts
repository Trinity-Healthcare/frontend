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
  private newTaskUrl = "http://localhost:8080/createNewTask";
  constructor(private http: HttpClient) {}

  createTask(task: TaskInfo): Observable<string> {
    console.log(task);
    return this.http.post<string>(this.newTaskUrl, task, httpOptions);
  }

  getTasks(): Observable<TaskInfo[]> {
    console.log("getting tasks test");
    return this.http.get<TaskInfo[]>("http://localhost:8080/getTasks");
  }

  deleteTask(task): Observable<any> {
    return this.http.post("http://localhost:8080/deleteTask", {
      task
    });
  }

  editTask(task: TaskInfo): Observable<string> {
    return this.http.post<string>(
      "http://localhost:8080/editTask",
      task,
      httpOptions
    );
  }
}
