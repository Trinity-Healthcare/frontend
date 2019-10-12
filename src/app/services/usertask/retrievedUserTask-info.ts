import { RetrievedTask } from "../task/retrievedTask-info";
import { userInfo } from "../user-info";

export class RetrievedUserTaskInfo {
  id: number;
  user: userInfo;
  task: RetrievedTask;
  photoUrl: Date;
  completion_date: string;
  verified: number;

  constructor(
    id: number,
    user: userInfo,
    task: RetrievedTask,
    photoUrl: Date,
    completion_date: string,
    verified: number
  ) {
    this.id = id;
    this.user = user;
    this.task = task;
    this.photoUrl = photoUrl;
    this.completion_date = completion_date;
    this.verified = verified;
  }
}
