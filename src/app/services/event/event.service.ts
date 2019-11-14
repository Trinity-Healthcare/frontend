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
  getEventsUrl = "http://localhost:8080/getEvents";
  editEventUrl = "http://localhost:8080/editEvent";
  deleteEventUrl = "http://localhost:8080/deleteEvent";

  constructor(private http: HttpClient) {}

  createEvent(event: EventInfo): Observable<string> {
    console.log(event);
    return this.http.post<string>(this.newEventUrl, event, httpOptions);
  }

  getEvents(): Observable<EventInfo[]> {
    return this.http.get<EventInfo[]>(this.getEventsUrl, httpOptions);
  }

  deleteEvent(event: EventInfo): Observable<EventInfo> {
    return this.http.post<EventInfo>(this.deleteEventUrl, { event });
  }

  editEvent(event: EventInfo): Observable<EventInfo> {
    return this.http.post<EventInfo>(this.editEventUrl, event, httpOptions);
  }
}
