export class UserTaskInfo {
  username: string;
  taskId: number;
  taskPoints: number;
  completionDate: string;
  photo: string;
  verified: string;
  description: string;

  constructor(
    taskId: number,
    username: string,
    taskPoints: number,
    completionDate: string,
    photo: string,
    description: string
  ) {
    this.taskId = taskId;
    this.username = username;
    this.taskPoints = taskPoints;
    this.completionDate = completionDate;
    this.photo = photo;
    this.verified = "no";
    this.description = description;
  }
}
