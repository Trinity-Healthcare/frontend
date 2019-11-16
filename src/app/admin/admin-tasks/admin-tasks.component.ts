import { Component, OnInit } from '@angular/core';
import { TaskInfo } from 'src/app/services/task/task-info';
import { TaskServiceService } from 'src/app/services/task/task.service';

@Component({
  selector: 'app-admin-tasks',
  templateUrl: './admin-tasks.component.html',
  styleUrls: ['./admin-tasks.component.css']
})
export class AdminTasksComponent implements OnInit {
  form: any = {};
  public displayText = '';
  createTaskFailed = false;
  taskInfo: TaskInfo;
  constructor(private taskService: TaskServiceService) {}

  ngOnInit() {}

  onSubmit() {
    console.log(this.form);

    this.taskInfo = new TaskInfo(
      this.form.task_name,
      this.form.photo_required,
      this.form.point_value
    );

    this.taskService.createTask(this.taskInfo).subscribe(
      data => {
        console.log(data);
        this.createTaskFailed = false;
        this.generateMessage();
      },
      error => {
        console.log(error);
        this.createTaskFailed = true;
        this.generateMessage();
      }
    );
  }

  generateMessage() {
    if (this.createTaskFailed == false) {
      this.displayText = 'Task has been created successfully';
    } else {
      this.displayText = 'Create task Failed';
    }
  }
}
