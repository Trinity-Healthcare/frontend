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
