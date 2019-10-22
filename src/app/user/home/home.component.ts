import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { element } from 'protractor';

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit {
  mPoints = 10;
  mGoal = 50;
  mUpcomingEvents = null;
  mAvailableActivities = null;
  mSelectedActivities = null;
  
  private _ngUnsubscribe = new Subject();

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getCalendarEvents();
    this.getAllTasks();
  }

  ngOnDestroy() {
    this._ngUnsubscribe.next();
    this._ngUnsubscribe.complete();
  }

  getProgress() {
    let progress = (this.mPoints / this.mGoal) * 100;
    return `${progress.toFixed(2)}%`;
  }

  getOrdinal(n) {
    return (n > 0 ? ['th', 'st', 'nd', 'rd'][(n > 3 && n < 21) || n % 10 > 3 ? 0 : n % 10] : '');
  }

  getCalendarEvents() {
    this.http.get<any[]>('http://localhost:8080/getEvents').subscribe(
      (response) => {

        let allEvents = response;
        this.mUpcomingEvents = [];
        
        allEvents.forEach(element => {
          element.date = new Date(element.date);
          if(element.date >= Date.now())
          {
            element.ordinal = this.getOrdinal(element.date.getDate());
            this.mUpcomingEvents.push(element);
          }
        });

      },
      (error) => {
        console.log(error);
      }
    );
  }

  getAllTasks() {
    this.http.get<any[]>('http://localhost:8080/getTasks').subscribe(
      (response) => {

        this.mAvailableActivities = response;

      },
      (error) => {
        console.log(error);
      }
    );
  }
}
