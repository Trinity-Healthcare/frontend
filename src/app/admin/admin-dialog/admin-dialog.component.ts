import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig, FormlyField } from '@ngx-formly/core';
import { NgxSmartModalService } from 'ngx-smart-modal';

@Component({
  selector: 'admin-dialog',
  templateUrl: './admin-dialog.component.html',
  styleUrls: ['./admin-dialog.component.css']
})

export class AdminDialogComponent implements OnInit {

  public desiredOp : AdminOperation = null;
  form = new FormGroup({});
  model = { email: 'email@gmail.com' };
  fields: FormlyFieldConfig[] = [{
    key: 'email',
    type: 'input',
    templateOptions: {
      label: 'Email address',
      placeholder: 'Enter email',
      required: true,
    }
  }];
  
  constructor(
    public ngxSmartModalService: NgxSmartModalService,
    ) { }

  ngOnInit() {
  }

  getTypeForField(fieldName : string, data : any)
  {
    console.log(typeof(data[fieldName]));
    return 'input';
  }

  getLabelForField(fieldName : string)
  {
    return fieldName;
  }

  setOperation(op : AdminOperation) {
    this.desiredOp = op;
    this.model = this.desiredOp.data;
    this.fields = [];

    console.log(Object.keys(this.desiredOp.data));

    Object.keys(this.desiredOp.data).forEach((element) => {

      if(!element.toLowerCase().includes('id') && !element.startsWith('_'))
      {
        let newFormField = {
          key : element,
          type : this.getTypeForField(element, this.desiredOp.data),
          templateOptions: {
            label: this.getLabelForField(element),
            required : true
          }
        }

        this.fields.push(newFormField);
      }
    });
  }

  
  submit(model) {
    console.log(model);
  }

}

export interface AdminOperation {
  name : string;
  data : any;
  operation : () => void;
  failure : () => void;
  success : () => void;
}
