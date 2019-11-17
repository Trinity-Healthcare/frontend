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
