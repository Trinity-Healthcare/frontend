export class RetrievedTask {
  taskId: number;
  taskName: String;
  taskAction: String;
  taskPoints: number;
  taskMax: number;
  taskFreq: number;
  taskMaxFreq: number;
  photoRequired: String;

  constructor(
    taskId: number,
    taskName: String,
    taskAction: String,
    taskPoints: number,
    taskMax: number,
    taskFreq: number,
    taskMaxFreq: number,
    photoRequired: String
  ) {
    this.taskId = taskId;
    this.taskName = taskName;
    this.taskAction = taskAction;
    this.taskPoints = taskPoints;
    this.taskMax = taskMax;
    this.taskFreq = taskFreq; //frequency type
    this.taskMaxFreq = taskMaxFreq;
    this.photoRequired = photoRequired;
  }
}
