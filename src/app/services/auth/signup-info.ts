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
  payroll_code: string;

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
    answer3: string,
    payroll_code: string
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
    this.payroll_code = payroll_code;
  }
}
