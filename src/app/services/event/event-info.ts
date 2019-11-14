export class EventInfo {
  title: String;
  description: String;
  date: String;
  link: String;
  start: String;
  end: String;

  constructor(title: String, description: String, date: String, link: String, start: String, end: String) {
    this.title = title;
    this.description = description;
    this.date = date;
    this.link = link;
    this.start = start;
    this.end = end;
  }
}
