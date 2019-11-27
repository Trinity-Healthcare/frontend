/* 
 *  Copyright (C) 2019 Prime Inc - All Rights Reserved
 *  Unauthorized use of this file and its contents, via any medium is strictly prohibited.
 *  Authored by the Missouri State University Computer Science Department
 *  Fall 2019 CSC 450 - Group 2
 */

import { Component, OnInit, Input } from "@angular/core";

import * as $ from "jquery";

import "fullcalendar";
import * as moment from "moment";
@Component({
  selector: "app-calendar",
  templateUrl: "./calendar.component.html",
  styleUrls: ["./calendar.component.css"]
})
export class CalendarComponent implements OnInit {
  defaultConfigurations: any;
  @Input()
  set configurations(config: any) {
    if (config) {
      this.defaultConfigurations = config;
    }
  }
  @Input() eventData: any;
  constructor() {
    this.defaultConfigurations = {
      editable: true,
      eventLimit: true,
      titleFormat: "MMM D YYYY",
      header: {
        left: "prev,next today",
        center: "title",
        right: "month,agendaWeek,agendaDay"
      },
      buttonText: {
        today: "Today",
        month: "Month",
        week: "Week",
        day: "Day"
      },
      views: {
        agenda: {
          eventLimit: 2
        }
      },
      dayClick: (date, jsEvent, activeView) => {
        this.dayClick(date, jsEvent, activeView);
      },

      eventDragStart: (timeSheetEntry, jsEvent, ui, activeView) => {
        this.eventDragStart(timeSheetEntry, jsEvent, ui, activeView);
      },
      eventDragStop: (timeSheetEntry, jsEvent, ui, activeView) => {
        this.eventDragStop(timeSheetEntry, jsEvent, ui, activeView);
      },
      allDaySlot: false,
      slotDuration: moment.duration("00:15:00"),
      slotLabelInterval: moment.duration("01:00:00"),
      firstDay: 1,
      selectable: true,
      selectHelper: true,
      events: this.eventData
    };
    this.eventData = [
      {
        title: "event1",
        start: moment()
      },
      {
        title: "event2",
        start: moment(),
        end: moment().add(2, "days")
      }
    ];
  }

  ngOnInit() {
    $("#full-calendar").fullCalendar(this.defaultConfigurations);
  }
  dayClick(date, jsEvent, activeView) {
    console.log("day click");
  }
  eventDragStart(timeSheetEntry, jsEvent, ui, activeView) {
    console.log("event drag start");
  }
  eventDragStop(timeSheetEntry, jsEvent, ui, activeView) {
    console.log("event drag end");
  }
}
