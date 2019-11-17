export class SubmittedTaskInfo {
  userTaskId: number;
  taskId: number;
  username: string;
  taskPoints: number;
  completionDate: string;
  photo: string;
  status: string;
  description: string;

  constructor(
    taskId: number,
    username: string,
    taskPoints: number,
    timestamp: string,
    photo: string,
    status: string,
    description: string,
    userTaskId?: number
  ) {
    this.userTaskId = userTaskId;
    this.taskId = taskId;
    this.username = username;
    this.taskPoints = taskPoints;
    this.completionDate = timestamp;
    this.photo = photo;
    this.status = status;
    this.description = description;
  }
  
}
