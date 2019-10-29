export class RetrievedTask {
  TaskId: number;
  TaskName: String;
  TaskAction: String;
  TaskPoints: number;
  TaskMax: number;
  TaskFreq: number;
  TaskMaxFreq: number;
  PhotoRequired: String;

  constructor(
    TaskId: number,
    TaskName: String,
    TaskAction: String,
    TaskPoints: number,
    TaskMax: number,
    TaskFreq: number,
    TaskMaxFreq: number,
    PhotoRequired: String
  ) {
    this.TaskId = TaskId;
    this.TaskName = TaskName;
    this.TaskAction = TaskAction;
    this.TaskPoints = TaskPoints;
    this.TaskMax = TaskMax;
    this.TaskFreq = TaskFreq;
    this.TaskMaxFreq = TaskMaxFreq;
    this.PhotoRequired = PhotoRequired;
  }
}
