import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { TaskInfo } from 'src/app/services/task/task.info';
import Swal from 'sweetalert2';
import { TaskServiceService } from 'src/app/services/task/task.service';

interface TaskForDemo {
  taskId: number;
  taskName: string;
  taskAction: string;
  taskPoints: number;
  taskMax: number;
  taskFreq: string;
  photoRequired: boolean;
  verificationRequired: string;
}

@Component({
  selector: 'app-admin-task-view',
  templateUrl: './admin-task-view.component.html',
  styleUrls: ['./admin-task-view.component.css'],
})
export class AdminTaskViewComponent implements OnInit, AfterViewInit {
  @Input() task: TaskInfo;

  taskForDemo: TaskForDemo;

  constructor(private taskService: TaskServiceService) {}

  ngOnInit() {
    this.taskForDemo = {
      taskId: 0,
      taskName: 'default-name',
      taskAction: 'default-action',
      taskPoints: 0,
      taskMax: 0,
      taskFreq: 'default-freq',
      photoRequired: true,
      verificationRequired: 'yes',
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
        this.taskService.deleteTask(1).subscribe(
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
    this.taskService.editTask(this.task).subscribe(
      response => {
        console.log(this.taskForDemo);
        console.log(response);
        Swal.fire({
          type: 'success',
          title: 'Record Updated',
          // tslint:disable-next-line: quotemark
          text: `${this.task.taskName} has been updated`,
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
    this.taskForDemo.taskId = this.task.taskId;
    this.taskForDemo.taskName = '"' + this.task.taskName + '"';
    this.taskForDemo.taskAction = '"' + this.task.taskAction + '"';
    this.taskForDemo.taskPoints = this.task.taskPoints;
    this.taskForDemo.taskMax = this.task.taskMax;
    this.taskForDemo.taskFreq = '"' + this.task.taskFreq + '"';
    this.taskForDemo.photoRequired = true;
    this.taskForDemo.verificationRequired = '"yes"';
    let propValue;
    for (const propName in this.taskForDemo) {
      propValue = this.taskForDemo[propName];
      console.log(propName, propValue);
    }
  }
}
