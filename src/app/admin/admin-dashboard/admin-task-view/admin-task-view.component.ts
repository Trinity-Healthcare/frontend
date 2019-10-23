import { Component, OnInit } from '@angular/core'
import Swal from 'sweetalert2'

@Component({
  selector: 'app-admin-task-view',
  templateUrl: './admin-task-view.component.html',
  styleUrls: ['./admin-task-view.component.scss'],
})
export class AdminTaskViewComponent implements OnInit {
  constructor() {}

  ngOnInit() {}

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
        Swal.fire('Deleted!', 'Your file has been deleted.', 'success')
      }
    })
  }

  saveClicked(): void {
    Swal.fire({
      type: 'success',
      title: 'Record Updated',
      // tslint:disable-next-line: quotemark
      text: '{element here} has been updated',
    }).then(result => {
      location.reload()
    })
  }
}
