export class RetrievedTask {
  id: number;
  taskName: String;
  photoRequired: String;
  pointValue: number;

  constructor(
    id: number,
    taskName: String,
    photoRequired: String,
    pointValue: number
  ) {
    this.id = id;
    this.taskName = taskName;
    this.photoRequired = photoRequired;
    this.pointValue = pointValue;
  }
}
