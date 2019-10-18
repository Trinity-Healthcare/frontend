export class SignUpInfo {
  name: string;
  username: string;
  email: string;
  role: string[];
  password: string;
  currentPointTotal: number;
  pointGoal: number;

  constructor(name: string, username: string, email: string, password: string) {
    this.name = name;
    this.username = username;
    this.email = email;
    this.password = password;
    this.role = ["user"];
    this.currentPointTotal = 100;
    this.pointGoal = 0;
  }
}
