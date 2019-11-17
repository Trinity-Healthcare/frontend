import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { EventInfo } from 'src/app/services/event/event.info';
import Swal from 'sweetalert2';
import { EventService } from 'src/app/services/event/event.service';

interface EventForDemo {
  title: string;
  description: string;
  date: string;
  link: string;
  start: string;
  end: string;
}

@Component({
  selector: 'app-admin-event-view',
  templateUrl: './admin-event-view.component.html',
  styleUrls: ['./admin-event-view.component.css'],
})
export class AdminEventViewComponent implements OnInit, AfterViewInit {
  @Input() event: EventInfo;
  eventForDemo: EventForDemo;

  constructor(private eventService: EventService) {}

  ngOnInit() {
    this.eventForDemo = {
      title: "title",
      description: "desc",
      date: "",
      link: "",
      start: "",
      end: "",
    };
  }

  ngAfterViewInit() {}

  deleteClicked(): void {
    Swal.fire({
      title: 'Are you sure?',
      // tslint:disable-next-line: quotemark
      text: "You won't be able to revert this!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then(result => {
      if (result.value) {
        this.eventService.deleteEvent(null).subscribe(
          response => {
            console.log(response);
          },
          error => {
            console.log(error);
          }
        );
        Swal.fire('Deleted!', 'Your file has been deleted.', 'success').then(
          () => {
            location.reload();
          }
        );
      }
    });
  }

  saveClicked(): void {
    this.updateAndPrintValues();
    this.eventService.editEvent(this.event).subscribe(
      response => {
        console.log(this.eventForDemo);
        console.log(response);
        Swal.fire({
          type: 'success',
          title: 'Record Updated',
          // tslint:disable-next-line: quotemark
          text: `${this.event.title} has been updated`,
        }).then(result => {
          location.reload();
        });
      },
      error => {
        console.log('something is broken');
        console.log(error);
      }
    );
  }

  updateAndPrintValues() {
    this.eventForDemo.title = this.event.title;
    this.eventForDemo.description = '"' + this.event.description + '"';
    this.eventForDemo.date = '"' + this.event.date + '"';
    this.eventForDemo.link = this.event.link;
    this.eventForDemo.start = this.event.start;
    this.eventForDemo.end = '"' + this.event.end + '"';
    let propValue;
    for (const propName in this.eventForDemo) {
      propValue = this.eventForDemo[propName];
      console.log(propName, propValue);
    }
  }
}
