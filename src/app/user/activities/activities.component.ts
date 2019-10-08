import { Component, OnInit } from "@angular/core";
import { TaskService, Task } from "src/app/services/task.service";
@Component({
  selector: "app-activities",
  templateUrl: "./activities.component.html",
  styleUrls: ["./activities.component.css"]
})
export class ActivitiesComponent implements OnInit {
  public activities = [
    { name: "Climbing", description: "Do some climbing", points: 15 },
    { name: "Running", description: "Do some running", points: 30 },
    { name: "Lifting", description: "Do some lifting", points: 20 },
    { name: "Walking", description: "Do some walking", points: 10 }
  ];
  tasks: Task[];

  constructor(private taskService: TaskService) {}

  ngOnInit() {
    this.taskService.getTasks().subscribe(response => {
      this.tasks = response;
    });
  }
}
