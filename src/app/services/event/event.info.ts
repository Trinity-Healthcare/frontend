/* 
 *  Copyright (C) 2019 Prime Inc - All Rights Reserved
 *  Unauthorized use of this file and its contents, via any medium is strictly prohibited.
 *  Authored by the Missouri State University Computer Science Department
 *  Fall 2019 CSC 450 - Group 2
 */

export class EventInfo {
  event_id: Number;
  title: string;
  description: string;
  date: string;
  link: string;
  start: string;
  end: string;

  constructor(event_id: Number, title: string, description: string, date: string, link: string, start: string, end: string) {
    this.event_id = event_id;
    this.title = title;
    this.description = description;
    this.date = date;
    this.link = link;
    this.start = start;
    this.end = end;
  }
}
