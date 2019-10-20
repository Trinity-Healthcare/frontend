import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
export class Task {
  constructor(
    public taskId: string,
    public taskName: string,
    public unitOfMeasure: string,
    public photoRequired: boolean,
    public pointValue: string
  ) {}
}
@Injectable({
  providedIn: "root"
})
export class TaskService {
  constructor(private httpClient: HttpClient) {}

  getTasks() {
    console.log("getting tasks test");
    return this.httpClient.get<Task[]>("http://localhost:8080/getTasks");
  }
}

{

}
