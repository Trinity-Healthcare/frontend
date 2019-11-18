import { Component, OnInit, Input } from "@angular/core";
import { UserService } from "src/app/services/user/user.service";

import * as xlsx from "xlsx";
import * as filesaver from "file-saver";
import { UserInfoFull } from "src/app/services/user/user.info.full";
import Swal from "sweetalert2";
import { CategoryInfo } from "src/app/services/category/category.info";

@Component({
  selector: "app-admin-user-view",
  templateUrl: "./admin-user-view.component.html",
  styleUrls: ["./admin-user-view.component.css"]
})
export class AdminUserViewComponent implements OnInit {
  @Input() user: UserInfoFull;
  categories: CategoryInfo[];
  roles = ["ROLE_USER", "ROLE_MODERATOR", "ROLE_ADMIN"];
  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userService.getUsers().subscribe(
      data => {
        console.log(data);
      },
      error => {
        console.log(error);
      }
    );
    this.userService.getCategories().subscribe(
      data => {
        this.categories = data;
        console.log(this.categories);
      },
      error => {
        console.log(error);
      }
    );
  }

  // deleteClicked(): void {
  //   Swal.fire({
  //     title: 'Are you sure?',
  //     // tslint:disable-next-line: quotemark
  //     text: "You won't be able to revert this!",
  //     type: 'warning',
  //     showCancelButton: true,
  //     confirmButtonColor: '#3085d6',
  //     cancelButtonColor: '#d33',
  //     confirmButtonText: 'Yes, delete it!',
  //   }).then(result => {
  //     if (result.value) {
  //       this.userService.deleteUser(1).subscribe(
  //         response => {
  //           console.log(response);
  //         },
  //         error => {
  //           console.log(error);
  //         }
  //       );
  //       Swal.fire('Deleted!', 'Your file has been deleted.', 'success').then(
  //         () => {
  //           location.reload();
  //         }
  //       );
  //     }
  //   });
  // }

  saveClicked(): void {
    console.log(this.user);
    this.userService.editUser(this.user).subscribe(
      response => {
        Swal.fire({
          type: "success",
          title: "Record Updated",
          // tslint:disable-next-line: quotemark
          text: `${this.user.name} has been updated`
        }).then(result => {
          location.reload();
        });
      },
      error => {
        console.log("something is broken");
        console.log(error);
      }
    );
  }
}
