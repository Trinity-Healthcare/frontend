import { RetrievedTask } from "../task/retrievedTask-info";
import { userInfo } from "../user-info";

export class RetrievedUserTaskInfo {
  UserTaskId: number;
  TaskId: number;
  UserId: string;
  TaskName: string;
  TaskPoints: number;
  CompletionDate: string;
  Verified: string;

  constructor(
    UserTaskId: number,
    TaskId: number,
    UserId: string,
    TaskName: string,
    TaskPoints: number,
    CompletionDate: string,
    Verified: string
  ) {
    this.UserTaskId = UserTaskId;
    this.TaskId = TaskId;
    this.UserId = UserId;
    this.TaskName = TaskName;
    this.TaskPoints = TaskPoints;
    this.CompletionDate = CompletionDate;
    this.Verified = Verified;
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
