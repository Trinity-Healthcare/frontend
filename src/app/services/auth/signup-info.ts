/* 
 *  Copyright (C) 2019 Prime Inc - All Rights Reserved
 *  Unauthorized use of this file and its contents, via any medium is strictly prohibited.
 *  Authored by the Missouri State University Computer Science Department
 *  Fall 2019 CSC 450 - Group 2
 */

export class SignUpInfo {
  name: string;
  username: string;
  email: string;
  role: string[];
  password: string;
  week_goal: number;
  quarter_goal: number;
  week_total: number;
  quarter_total: number;
  question1: string;
  question2: string;
  question3: string;
  answer1: string;
  answer2: string;
  answer3: string;

  constructor(
    name: string,
    username: string,
    email: string,
    password: string,
    question1: string,
    question2: string,
    question3: string,
    answer1: string,
    answer2: string,
    answer3: string
  ) {
    this.name = name;
    this.username = username;
    this.email = email;
    this.password = password;
    this.role = ["user"];
    this.week_goal = 50;
    this.quarter_goal = 150;
    this.week_total = 0;
    this.quarter_total = 0;
    this.question1 = question1;
    this.question2 = question2;
    this.question3 = question3;
    this.answer1 = answer1;
    this.answer2 = answer2;
    this.answer3 = answer3;
  }
}
