import {
  Component,
  OnInit,
  Input,
  AfterViewInit,
  ViewChild,
  QueryList,
  ViewChildren,
  OnChanges
} from "@angular/core";
import { NgxSmartModalService } from 'ngx-smart-modal';

@Component({
  selector: "app-user-history",
  templateUrl: "./user-history.component.html",
  styleUrls: ["./user-history.component.css"]
})
export class UserHistoryComponent implements OnInit, OnChanges {

  @Input() userTasks: any;

  public view = 
    {
      columns: [
        { key: "completionDate", title: "Completion Date" },
        { key: "description", title: "Description" },
        { key: "photo", title: "Photo" },
        { key: "status", title: "Status" },
        { key: "taskId", title: "Task Id" },
        { key: "taskName", title: "Task Name" },
        { key: "taskPoints", title: "Task Points" },
        { key: "userId", title: "User Id" },
        { key: "userTaskId", title: "User Task Id" }
      ]
    }
 
  constructor(public ngxSmartModalService: NgxSmartModalService) {}

  ngOnInit() {}

  ngOnChanges() {
    console.log(this.userTasks);
  }

}
