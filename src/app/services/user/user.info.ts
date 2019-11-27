/* 
 *  Copyright (C) 2019 Prime Inc - All Rights Reserved
 *  Unauthorized use of this file and its contents, via any medium is strictly prohibited.
 *  Authored by the Missouri State University Computer Science Department
 *  Fall 2019 CSC 450 - Group 2
 */

export class UserInfo {
  name: string;
  weekGoal: number;
  quarterGoal: number;
  weekTotal: number;
  quarterTotal: number;

  constructor(
    weekGoal: number,
    quarterGoal: number,
    weekTotal: number,
    quarterTotal: number
  ) {
    this.name = name;
    this.weekGoal = weekGoal;
    this.quarterGoal = quarterGoal;
    this.weekTotal = weekTotal;
    this.quarterTotal = quarterTotal;
  }
}
