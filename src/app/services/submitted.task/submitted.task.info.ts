/* 
 *  Copyright (C) 2019 Prime Inc - All Rights Reserved
 *  Unauthorized use of this file and its contents, via any medium is strictly prohibited.
 *  Authored by the Missouri State University Computer Science Department
 *  Fall 2019 CSC 450 - Group 2
 */

export class SubmittedTaskInfo {
  userTaskId: number;
  taskId: number;
  username: string;
  taskPoints: number;
  completionDate: string;
  photo: string;
  status: string;
  description: string;
  possibleStatuses : string[];

  constructor(
    taskId?: number,
    username?: string,
    taskPoints?: number,
    timestamp?: string,
    photo?: string,
    status?: string,
    description?: string,
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

    this.possibleStatuses = [
      "Approved",
      "Pending",
      "Rejected"
    ];

  }
  
}
