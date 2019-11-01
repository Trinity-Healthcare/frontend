import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { Task } from '../Task';
import Swal from 'sweetalert2';
import { TaskServiceService } from 'src/app/services/task/task-service.service';

@Component({
  selector: 'app-admin-task-view',
  templateUrl: './admin-task-view.component.html',
  styleUrls: ['./admin-task-view.component.css'],
})
export class AdminTaskViewComponent implements OnInit, AfterViewInit {
  @Input() task: Task;

  constructor(private taskService: TaskServiceService) {}

  ngOnInit() {}

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
    Swal.fire({
      type: 'success',
      title: 'Record Updated',
      // tslint:disable-next-line: quotemark
      text: '{element here} has been updated',
    }).then(result => {
      location.reload();
    });
  }
}
