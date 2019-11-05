export class RetrievedTask {
  taskId: number;
  taskName: string;
  taskAction: string;
  taskPoints: number;
  taskMax: number;
  taskFreq: string;
  taskMaxFreq: number;
  photoRequired: string;
  verificationRequired: string;

  constructor(
    taskId: number,
    taskName: string,
    taskAction: string,
    taskPoints: number,
    taskMax: number,
    taskFreq: string,
    taskMaxFreq: number,
    photoRequired: string,
    verificationRequired: string
  ) {
    this.taskId = taskId;
    this.taskName = taskName;
    this.taskAction = taskAction;
    this.taskPoints = taskPoints;
    this.taskMax = taskMax;
    this.taskFreq = taskFreq; // frequency type
    this.taskMaxFreq = taskMaxFreq;
    this.photoRequired = photoRequired;
    this.verificationRequired = verificationRequired;
  }
}
