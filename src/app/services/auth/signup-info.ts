export class SignUpInfo {
  name: string;
  username: string;
  email: string;
  role: string[];
  password: string;
  current_point_total: number;
  point_goal: number;

  constructor(name: string, username: string, email: string, password: string) {
    this.name = name;
    this.username = username;
    this.email = email;
    this.password = password;
    this.role = ["user"];
    this.current_point_total = 100;
    this.point_goal = 0;
  }
}
