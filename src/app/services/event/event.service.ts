/* 
 *  Copyright (C) 2019 Prime Inc - All Rights Reserved
 *  Unauthorized use of this file and its contents, via any medium is strictly prohibited.
 *  Authored by the Missouri State University Computer Science Department
 *  Fall 2019 CSC 450 - Group 2
 */

import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { EventInfo } from "./event.info";

const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" })
};

@Injectable({
  providedIn: "root"
})
export class EventService {
  newEventUrl = "https://trinityweb-dev.azurewebsites.net/createNewEvent";
  getEventsUrl = "https://trinityweb-dev.azurewebsites.net/getEvents";
  editEventUrl = "https://trinityweb-dev.azurewebsites.net/editEvent";
  deleteEventUrl = "https://trinityweb-dev.azurewebsites.net/deleteEvent";

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
