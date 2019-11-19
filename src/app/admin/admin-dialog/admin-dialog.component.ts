import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig, FormlyField, FormlyFormOptions } from '@ngx-formly/core';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { RolesInfo } from 'src/app/services/role/roles.info';
import { CategoryInfo } from 'src/app/services/category/category.info';
import { SubmittedTaskInfo } from 'src/app/services/submitted.task/submitted.task.info';
import { TaskInfo } from 'src/app/services/task/task.info';
import { CategoryService } from 'src/app/services/category/category.service';
import { EventService } from 'src/app/services/event/event.service';
import { TaskServiceService } from 'src/app/services/task/task.service';
import { SubmittedTaskService } from 'src/app/services/submitted.task/submitted.task.service';
import { UserService } from 'src/app/services/user/user.service';
import { AppSettingsService } from 'src/app/services/appsettings/appsettings.service';

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
  private operationMappings : {};

  form = new FormGroup({});
  model = {};
  options: FormlyFormOptions = {};
  fields: FormlyFieldConfig[] = [];
  
  constructor(
    public userService: UserService,
    public submittedtaskService: SubmittedTaskService,
    public taskService: TaskServiceService,
    public eventsService: EventService,
    public categoryService: CategoryService,
    public appSettingsService: AppSettingsService,
    public ngxSmartModalService: NgxSmartModalService
    ) { 

      this.operationMappings = {
        'users' : {
          'New' : null,
          'Edit' : this.editUser,
        },
        'pending' : {
          'Edit' : this.editSubmittedTask,
        },
        'groups' : {
          'New' : this.createGroup,
          'Edit' : this.editGroup,
        },
        'tasks' : { 
          'New' : this.createTask,
          'Edit' : this.editTask,
        },
        'events' : {
          'New' : this.createEvent,
          'Edit' : this.editEvent,
        },
        'settings' : {
          'Edit' : this.editSetting
        }
        
      }
    }

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
    else if((typeof(data[fieldName]) === 'object' && data[fieldName] != null) || 
            fieldName === 'status' || 
            fieldName === 'taskFreq')
    {
      inputType = 'select';
    }
    else if(fieldName === 'description' || fieldName === 'taskAction')
    {
      inputType = 'textarea';
    }
    // else if(fieldName.toLowerCase().includes('date'))
    // {
    //   inputType = 'datepicker';
    // }

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
    else if(fieldName.toLowerCase().startsWith("task"))
    {
      readable = this.toUppercase(fieldName.toLowerCase().split("task")[1]);
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
      required : opType.includes('New') || data[fieldName] !== '' ? true : false,
      readonly : opType.includes('View') ? true : false
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

      //This determines what inputs are generated.
      if(!element.toLowerCase().includes('id') && 
         !element.toLowerCase().includes('password') && 
         !element.toLowerCase().includes('question') &&
         !element.toLowerCase().includes('answer') &&
         !(op.dataType.includes('settings') && element.toLowerCase().includes('name')) &&
         !(element.toLowerCase() === 'photo') && //Specifically do not want to show the photo field on tasks since it is shown in an image element.
         !element.startsWith('_'))
      {
        let newFormField = {
          key : element,
          type : this.getTypeForField(element, this.desiredOp.data),
          templateOptions: this.getTemplateOptionsForField(op.name, element, this.desiredOp.data),
        }

        this.fields.push(newFormField);
      }
    });
    
  }

  resetModel()
  {
    for(let prop in this.model)
      {
        if(typeof(this.model[prop]) === 'string')
        {
          this.model[prop] = '';
        }
        else if(typeof(this.model[prop]) === 'number')
        {
          this.model[prop] = 0;
        }
        else if(typeof(this.model[prop]) === 'boolean')
        {
          this.model[prop] = false;
        }
        else
        {
          this.model[prop] = null;
        }
      }
  }

  cleanUp()
  {
    this.desiredOp.isOperationRunning = false;
  }

  setOperation(op : AdminOperation) {
    this.desiredOp = op;
    this.model = this.desiredOp.data;
    this.fields = [];

    if(this.desiredOp.name ===  'New')
    {
      this.resetModel();
    }
    
    this.desiredOp.operation = this.operationMappings[this.desiredOp.dataType][this.desiredOp.name];
    this.desiredOp.isOperationRunning = false;

    this.populateForm(this.desiredOp);
  }
  
  submit(model) {
    this.desiredOp.isOperationRunning = true;
    this.desiredOp.operation(this.desiredOp.success, this.desiredOp.failure, model, this);
  }

  toUppercase(s: string) {
    return s.charAt(0).toUpperCase() + s.slice(1);
  }

  toLowercase(s: string) {
    return s.charAt(0).toLowerCase() + s.slice(1);
  }

  editUser(success : () => void, failure : () => void, item : any, dialog : AdminDialogComponent) {
    dialog.userService.editUser(item).subscribe(
      response => {
        success();
        dialog.ngxSmartModalService.getModal("adminDialog").close();
      },
      error => {
        failure();
        console.log(error);
      }).add(() => {
        dialog.cleanUp();
      });
  }

  createGroup(success : () => void, failure : () => void, item : any, dialog : AdminDialogComponent) {
    dialog.categoryService.createCategory(item).subscribe(
      response => {
        success();
        dialog.ngxSmartModalService.getModal("adminDialog").close();
      },
      error => {
        failure();
        console.log(error);
      }
    ).add(() => {
      dialog.cleanUp();
    });
  }

  editGroup(success : () => void, failure : () => void, item : any, dialog : AdminDialogComponent) {
    dialog.categoryService.editCategory(item).subscribe(
      response => {
        success();
        dialog.ngxSmartModalService.getModal("adminDialog").close();
      },
      error => {
        failure();
        console.log(error);
      }
    ).add(() => {
      dialog.cleanUp();
    });
  }

  editSubmittedTask(success : () => void, failure : () => void, item : any, dialog : AdminDialogComponent) {
    console.log(item);
    dialog.submittedtaskService.editSubmittedTask(item).subscribe(
      response => {
        success();
        dialog.ngxSmartModalService.getModal("adminDialog").close();
      },
      error => {
        failure();
        console.log(error);
      }
    ).add(() => {
      dialog.cleanUp();
    });
  }

  createTask(success : () => void, failure : () => void, item : any, dialog : AdminDialogComponent) {
    dialog.taskService.createTask(item).subscribe(
      response => {
        success();
        dialog.ngxSmartModalService.getModal("adminDialog").close();
      },
      error => {
        failure();
        console.log(error);
      }
    ).add(() => {
      dialog.cleanUp();
    });
  }

  editTask(success : () => void, failure : () => void, item : any, dialog : AdminDialogComponent) {
    dialog.taskService.editTask(item).subscribe(
      response => {
        success();
        dialog.ngxSmartModalService.getModal("adminDialog").close();
      },
      error => {
        failure();
        console.log(error);
      }
    ).add(() => {
      dialog.cleanUp();
    });
  }

  deleteTask(success : () => void, failure : () => void, item : any, dialog : AdminDialogComponent) {
    this.taskService.deleteTask(item.taskId).subscribe(
      response => {
        success();
        dialog.ngxSmartModalService.getModal("adminDialog").close();
      },
      error => {
        failure();
      }
    ).add(() => {
      dialog.cleanUp();
    });
  }

  createEvent(success : () => void, failure : () => void, item : any, dialog : AdminDialogComponent) {
    dialog.eventsService.createEvent(item).subscribe(
      response => {
        success();
        dialog.ngxSmartModalService.getModal("adminDialog").close();
      },
      error => {
        failure();
        console.log(error);
      }
    ).add(() => {
      dialog.cleanUp();
    });
  }

  editEvent(success : () => void, failure : () => void, item : any, dialog : AdminDialogComponent) {
    dialog.eventsService.editEvent(item).subscribe(
      response => {
        success();
        dialog.ngxSmartModalService.getModal("adminDialog").close();
      },
      error => {
        failure();
        console.log(error);
      }
    ).add(() => {
      dialog.cleanUp();
    });
  }

  editSetting(success : () => void, failure : () => void, item : any, dialog : AdminDialogComponent) {
    dialog.appSettingsService.editAppSetting(item).subscribe(
      response => {
        success();
        dialog.ngxSmartModalService.getModal("adminDialog").close();
      },
      error => {
        failure();
        console.log(error);
      }
    ).add(() => {
      dialog.cleanUp();
    });
  }
}

export interface AdminOperation {
  name : string;
  data : any;
  dataType : string;
  operation : (success : () => void, failure : () => void, item : any, dialog : AdminDialogComponent) => void;
  isOperationRunning : boolean;
  failure : () => void;
  success : () => void;
}

