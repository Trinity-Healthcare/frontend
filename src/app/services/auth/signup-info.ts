export class SignUpInfo {
  name: string;
  username: string;
  email: string;
  role: string[];
  password: string;
  weekGoal: number;
  quarterGoal: number;
  weekTotal: number;
  quarterTotal: number;

  constructor(name: string, username: string, email: string, password: string) {
    this.name = name;
    this.username = username;
    this.email = email;
    this.password = password;
    this.role = ["user"];
    this.weekGoal = 50;
    this.quarterGoal = 150;
    this.weekTotal = 0;
    this.quarterTotal = 0;
  }
}
