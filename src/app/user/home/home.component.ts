import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit {
  public points = 30;
  public goal = 100;
  public calEvents = null;

  private _ngUnsubscribe = new Subject();

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getCalendarEvents();
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
    this.http.get('http://localhost:8080/getEvents').subscribe(
      (response) => {

        this.calEvents = response;

        this.calEvents.forEach(element => {
          element.date = element.date.split('-')[1][1];
          element.start = element.start.split(':00 ')[0] + element.start.split(':00')[1]; 
          console.log(element.date);
        });

      },
      (error) => {
        console.log(error);
      }
    );
  }
}
