export class RetrievedUserTaskInfo {
  userTaskId: number;
  taskId: number;
  userId: string;
  taskName: string;
  taskPoints: number;
  completionDate: string;
  photo: string;
  verified: string;
  description: string;

  constructor(
    userTaskId: number,
    taskId: number,
    userId: string,
    taskName: string,
    taskPoints: number,
    completionDate: string,
    photo: string,
    verified: string,
    description: string
  ) {
    this.userTaskId = userTaskId;
    this.taskId = taskId;
    this.userId = userId;
    this.taskName = taskName;
    this.taskPoints = taskPoints;
    this.completionDate = completionDate;
    this.photo = photo;
    this.verified = verified;
    this.description = description;
  }
}
