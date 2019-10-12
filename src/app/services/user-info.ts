export class userInfo {
  id: number;
  name: string;
  username: string;
  email: string;
  password: string;
  role: string[];
  currentPointTotal: number;
  pointGoal: number;

  constructor(
    id: number,
    name: string,
    username: string,
    email: string,
    password: string,
    role: string[],
    currentPointTotal: number,
    pointGoal: number
  ) {
    this.id = id;
    this.name = name;
    this.username = username;
    this.email = email;
    this.password = password;
    this.role = role;
    this.currentPointTotal = currentPointTotal;
    this.pointGoal = pointGoal;
  }
}
