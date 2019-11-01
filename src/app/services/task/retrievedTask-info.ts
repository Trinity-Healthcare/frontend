export class RetrievedTask {
  taskId: number;
  taskName: string;
  taskAction: string;
  taskPoints: number;
  taskMax: number;
  taskFreq: number;
  taskMaxFreq: number;
  photoRequired: string;

  constructor(
    taskId: number,
    taskName: string,
    taskAction: string,
    taskPoints: number,
    taskMax: number,
    taskFreq: number,
    taskMaxFreq: number,
    photoRequired: string
  ) {
    this.taskId = taskId;
    this.taskName = taskName;
    this.taskAction = taskAction;
    this.taskPoints = taskPoints;
    this.taskMax = taskMax;
    this.taskFreq = taskFreq; // frequency type
    this.taskMaxFreq = taskMaxFreq;
    this.photoRequired = photoRequired;
  }
}
