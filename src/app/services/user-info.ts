export class userInfo {
  id: number;
  name: string;
  username: string;
  email: string;
  password: string;
  role: string[];
  weekGoal: number;
  quarterGoal: number;
  weekTotal: number;
  quarterTotal: number;

  constructor(
    id: number,
    name: string,
    username: string,
    email: string,
    password: string,
    role: string[],
    weekGoal: number,
    quarterGoal: number,
    weekTotal: number,
    quarterTotal: number
  ) {
    this.id = id;
    this.name = name;
    this.username = username;
    this.email = email;
    this.password = password;
    this.role = role;
    this.weekGoal = weekGoal;
    this.quarterGoal = quarterGoal;
    this.weekTotal = weekTotal;
    this.quarterTotal = quarterTotal;
  }
}
