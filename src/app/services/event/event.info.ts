export class EventInfo {
  event_id: Number;
  title: String;
  description: String;
  date: String;
  link: String;
  start: String;
  end: String;

  constructor(event_id: Number, title: String, description: String, date: String, link: String, start: String, end: String) {
    this.event_id = event_id;
    this.title = title;
    this.description = description;
    this.date = date;
    this.link = link;
    this.start = start;
    this.end = end;
  }
}
