/* 
 *  Copyright (C) 2019 Prime Inc - All Rights Reserved
 *  Unauthorized use of this file and its contents, via any medium is strictly prohibited.
 *  Authored by the Missouri State University Computer Science Department
 *  Fall 2019 CSC 450 - Group 2
 */

export class TaskInfo {
  taskId: number;
  taskName: string;
  taskAction: string;
  taskPoints: number;
  taskMax: number;
  taskFreq: string;
  taskMaxFreq: number;
  photoRequired: boolean;
  verificationRequired: boolean;
  possibleFrequences: string[];

  constructor(
    taskId?: number,
    taskName?: string,
    taskAction?: string,
    taskPoints?: number,
    taskMax?: number,
    taskFreq?: string,
    taskMaxFreq?: number,
    photoRequired?: boolean,
    verificationRequired?: boolean,
  ) {
    this.taskId = taskId;
    this.taskName = taskName;
    this.taskAction = taskAction;
    this.taskPoints = taskPoints;
    this.taskMax = taskMax;
    this.taskFreq = taskFreq; // frequency type
    this.taskMaxFreq = taskMaxFreq;
    this.photoRequired = photoRequired;
    this.verificationRequired = verificationRequired;

    this.possibleFrequences = [
      'Daily',
      'Weekly',
      'Monthly',
      'Yearly',
      'Semi-Annual'
    ]
  }
}
