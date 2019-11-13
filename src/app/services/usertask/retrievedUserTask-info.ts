import { RetrievedTask } from "../task/retrievedTask-info";
import { userInfo } from "../user-info";

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

// export class RetrievedUserTaskInfo {
//   id: number;
//   user: userInfo;
//   task: RetrievedTask;
//   photoUrl: Date;
//   completion_date: string;
//   verified: number;

//   constructor(
//     id: number,
//     user: userInfo,
//     task: RetrievedTask,
//     photoUrl: Date,
//     completion_date: string,
//     verified: number
//   ) {
//     this.id = id;
//     this.user = user;
//     this.task = task;
//     this.photoUrl = photoUrl;
//     this.completion_date = completion_date;
//     this.verified = verified;
//   }
// }
