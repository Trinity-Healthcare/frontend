export class AnswerInfo {
  username: String;
  answer1: String;
  answer2: String;
  answer3: String;
  password: String;

  constructor(
    username: String,
    answer1: String,
    answer2: String,
    answer3: String,
    password: String
  ) {
    this.username = username;
    this.answer1 = answer1;
    this.answer2 = answer2;
    this.answer3 = answer3;
    this.password = password;
  }
}
