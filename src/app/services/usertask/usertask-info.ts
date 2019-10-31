import { SignUpInfo } from "../auth/signup-info";
import { Task } from "../task/task-service.service";
import { userInfo } from "../user-info";
import { RetrievedTask } from "../task/retrievedTask-info";

export class UserTaskInfo {
  username: string;
  taskId: number;
  taskPoints: number;
  completionDate: string;
  photo: string;
  verified: string;

  constructor(
    taskId: number,
    username: string,
    taskPoints: number,
    completionDate: string,
    photo: string
  ) {
    this.taskId = taskId;
    this.username = username;
    this.taskPoints = taskPoints;
    this.completionDate = completionDate;
    this.photo = photo;
    this.verified = "no";
  }
}
// export class UserTaskInfo {
//   username: String;
//   task: RetrievedTask;
//   photoUrl: string;
//   completionDate: Date;
//   verified: number;

//   constructor(username: String, task: RetrievedTask, photoUrl: string) {
//     this.username = username;
//     this.task = task;
//     this.photoUrl = photoUrl;
//   }
// }
