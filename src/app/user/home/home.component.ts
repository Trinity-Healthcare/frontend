import { Component, OnInit, OnDestroy } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit {
  public points = 30;
  public goal = 100;
  public calEvents = [
    {
      name: "Bring your dog to work day",
      date: "28",
      start: "8AM",
      end: "5PM",
      location: "Main Campus",
      link: "http://google.com"
    },
    {
      name: "Wellness 5K Run",
      date: "7",
      start: "3PM",
      end: "8PM",
      location: "Nathaniel Greene Park",
      link: "http://google.com"
    }
  ];

  private _ngUnsubscribe = new Subject();

  constructor(private http: HttpClient) {}

  ngOnInit() {
    // this.getCalendarEvents();
  }

  ngOnDestroy() {
    this._ngUnsubscribe.next();
    this._ngUnsubscribe.complete();
  }

  getProgress() {
    let progress = (this.points / this.goal) * 100;
    return `${progress.toFixed(2)}%`;
  }

  getCalendarEvents() {
    this.http.get("/api/events/").subscribe(
      response => {
        console.log(response);
      },
      error => {
        console.log(error);
      }
    );
  }
}
