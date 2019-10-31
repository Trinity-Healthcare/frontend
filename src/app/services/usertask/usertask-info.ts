import { SignUpInfo } from '../auth/signup-info';
import { Task } from '../task/task-service.service';
import { userInfo } from '../user-info';
import { RetrievedTask } from '../task/retrievedTask-info';

export class UserTaskInfo {
  username: string;
  task: RetrievedTask;
  photoUrl: string;
  completionDate: Date;
  verified: number;

  constructor(username: string, task: RetrievedTask, photoUrl: string) {
    this.username = username;
    this.task = task;
    this.photoUrl = photoUrl;
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
