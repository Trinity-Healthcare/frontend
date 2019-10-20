import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit {
  mPoints = 10;
  mGoal = 50;
  mUpcomingEvents = null;
  mSelectedActivity: any;
  mAvailableActivities = [
    {id: 1, name: 'Steps', req: '10,000 steps', value: 2, freq: 'daily'},
    {id: 2, name: 'Rockclimbing', req: '2 hours', value: 10, freq: 'weekly'},
    {id: 3, name: 'Swimming'},
    {id: 4, name: 'Lab Visit'},
    {id: 5, name: 'Dental Visit'},
    {id: 6, name: 'Jogging'},
    {id: 7, name: 'Swimming'},
    {id: 8, name: 'Swimming'},
    {id: 9, name: 'Swimming'},
    {id: 10, name: 'Swimming'},
    {id: 11, name: 'Other'}
  ];
  
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
    let progress = (this.mPoints / this.mGoal) * 100;
    return `${progress.toFixed(2)}%`;
  }

  getCalendarEvents() {
    this.http.get('http://localhost:8080/getEvents').subscribe(
      (response) => {

        this.mUpcomingEvents = response;

        this.mUpcomingEvents.forEach(element => {
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
