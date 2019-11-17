import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'admin-dialog',
  templateUrl: './admin-dialog.component.html',
  styleUrls: ['./admin-dialog.component.css']
})

export class AdminDialogComponent implements OnInit {

  private desiredOp : AdminOperation = null;
  
  constructor() { }

  ngOnInit() {
  }

  setOperation(op : AdminOperation) {
    this.desiredOp = op;
  }

}

export interface AdminOperation {
  name : string;
  itemType : string;
  data : any;
  new : () => void;
  edit : () => void;
  delete : () => void;
}
