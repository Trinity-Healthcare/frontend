/* 
 *  Copyright (C) 2019 Prime Inc - All Rights Reserved
 *  Unauthorized use of this file and its contents, via any medium is strictly prohibited.
 *  Authored by the Missouri State University Computer Science Department
 *  Fall 2019 CSC 450 - Group 2
 */

export class AnswerInfo {
  username: string;
  answer1: string;
  answer2: string;
  answer3: string;
  password: string;

  constructor(
    username: string,
    answer1: string,
    answer2: string,
    answer3: string,
    password: string
  ) {
    this.username = username;
    this.answer1 = answer1;
    this.answer2 = answer2;
    this.answer3 = answer3;
    this.password = password;
  }
}
