import { SignUpInfo } from "../auth/signup-info";
import { Task } from "../task/task-service.service";

export class UserTaskInfo {
  user: SignUpInfo;
  task: Task;
  photoUrl: string;
  completionDate: Date;

  constructor(user: User, task: Task, photoUrl: string, completionDate: Date) {
    this.user = user;
    this.task = task;
    this.photoUrl = photoUrl;
    this.completionDate = completionDate;
  }
}
