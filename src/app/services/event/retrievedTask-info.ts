export class RetrievedEvent {
    title: string;
    description: string;
    date: string;
    link: string;
    start: string;
    end: string;
  
    constructor(
        title: string,
        description: string,
        date: string,
        link: string,
        start: string,
        end: string

    ) {
      this.title = title;
      this.description = description;
      this.date = date;
      this.link = link;
      this.start = start;
      this.end = end;
    }
  }
  