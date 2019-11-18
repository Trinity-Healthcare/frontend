import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig, FormlyField, FormlyFormOptions } from '@ngx-formly/core';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { RolesInfo } from 'src/app/services/role/roles.info';
import { CategoryInfo } from 'src/app/services/category/category.info';
import { SubmittedTaskInfo } from 'src/app/services/submitted.task/submitted.task.info';
import { TaskInfo } from 'src/app/services/task/task.info';

@Component({
  selector: 'admin-dialog',
  templateUrl: './admin-dialog.component.html',
  styleUrls: ['./admin-dialog.component.css']
})

export class AdminDialogComponent implements OnInit {

  public desiredOp : AdminOperation = null;
  public availableGroups : CategoryInfo[];
  private availableRoles : string[];
  private availableStatuses : string [];
  private availableFreqs : string[];

  form = new FormGroup({});
  model = {};
  fields: FormlyFieldConfig[] = [];
  
  constructor(
    public ngxSmartModalService: NgxSmartModalService,
    ) { }

  ngOnInit() {
    this.availableRoles = (new RolesInfo()).available;
    this.availableStatuses = (new SubmittedTaskInfo()).possibleStatuses;
    this.availableFreqs = (new TaskInfo()).possibleFrequences;
  }

  getTypeForField(fieldName : string, data : any)
  {
    let inputType = 'input';

    if(data[fieldName] === true || data[fieldName] === false)
    {
      inputType = 'checkbox';
    }
    else if(typeof(data[fieldName]) === 'object' || fieldName === 'status' || fieldName === 'taskFreq')
    {
      inputType = 'select';
    }
    else if(fieldName === 'description' || fieldName === 'taskAction')
    {
      inputType = 'textarea';
    }

    return inputType;
  }

  getLabelForField(fieldName : string)
  {
    let readable = ''

    if(fieldName.includes('_'))
    {
      let brokenUp = fieldName.split('_');
      readable = this.toUppercase(brokenUp[0]) + ' ' + this.toUppercase(brokenUp[1]);
    }
    else
    {
      readable = this.toUppercase(fieldName);
    }

    return readable;
  }

  getTemplateOptionsForField(opType:string, fieldName: string, data : any)
  {
    let templateOptions = {
      label: this.getLabelForField(fieldName),
      required : opType.includes('New') || data[fieldName] !== '' ? true : false
    }

    if(fieldName === 'roles')
    {
      // Roles is returned from the server as an array of one object.
      // It must be sent back to the server the same way.
      // We must also add 1 to the index since we're not grabbing the roles from an endpoint.

      templateOptions['options'] = [];
      for( let index in this.availableRoles)
      {
        let readable = this.toUppercase(this.availableRoles[index].toLowerCase().split('_')[1]);
        templateOptions['options'].push(
          { label: this.toUppercase(readable), value : [ { id : Number(index) + 1, name : this.availableRoles[index] } ] }
        );
      }
    }

    if(fieldName === 'category')
    {
      // A user's category (called group when displayed) is returned from the server as an array of one object.
      // It must be sent back to the server the same way.

      templateOptions['options'] = [];
      for( let index in this.availableGroups)
      {
        templateOptions['options'].push(
          { label: this.availableGroups[index].name, value : this.availableGroups[index] }
        );
      }
    }

    if(fieldName === 'status')
    {
      templateOptions['options'] = [];
      for( let index in this.availableStatuses)
      {
        templateOptions['options'].push(
          { label: this.availableStatuses[index], value : this.availableStatuses[index] }
        );
      }
    }

    if(fieldName === 'taskFreq')
    {
      templateOptions['options'] = [];
      for( let index in this.availableFreqs)
      {
        templateOptions['options'].push(
          { label: this.availableFreqs[index], value : this.availableFreqs[index] }
        );
      }
    }

    return templateOptions;
  }

  populateForm(op : AdminOperation)
  {
    Object.keys(this.desiredOp.data).forEach((element) => {

      if(!element.toLowerCase().includes('id') && 
         !element.toLowerCase().includes('password') && 
         !element.toLowerCase().includes('question') &&
         !element.toLowerCase().includes('answer') &&
         !element.startsWith('_'))
      {
        let newFormField = {
          key : element,
          type : this.getTypeForField(element, this.desiredOp.data),
          templateOptions: this.getTemplateOptionsForField(op.name, element, this.desiredOp.data)
        }

        this.fields.push(newFormField);
      }
    });
    
  }

  setOperation(op : AdminOperation) {
    this.desiredOp = op;
    this.model = this.desiredOp.data;
    this.fields = [];

    this.populateForm(this.desiredOp);
  }

  
  submit(model) {
    this.desiredOp.operation(model);
  }

  toUppercase(s: string) {
    return s.charAt(0).toUpperCase() + s.slice(1);
  }

  toLowercase(s: string) {
    return s.charAt(0).toLowerCase() + s.slice(1);
  }

}

export interface AdminOperation {
  name : string;
  data : any;
  dataType : string,
  operation : (item : any) => void;
  failure : () => void;
  success : () => void;
}

