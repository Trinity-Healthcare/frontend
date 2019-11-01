export class EventInfo {
  name: String;
  description: String;
  date: String;
  url: String;

  constructor(name: String, description: String, date: String, url: String) {
    this.name = name;
    this.description = description;
    this.date = date;
    this.url = url;
  }
}
