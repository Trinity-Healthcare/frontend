import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { EventInfo } from "./event-info";

const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" })
};

@Injectable({
  providedIn: "root"
})
export class EventService {
  newEventUrl = "http://localhost:8080/createEvent";
  constructor(private http: HttpClient) {}
  createEvent(event: EventInfo): Observable<string> {
    console.log(event);
    return this.http.post<string>(this.newEventUrl, event, httpOptions);
  }
}
