import { CategoryInfo } from "../category/category.info";
import { RolesInfo } from "../role/roles.info";

export class UserInfoFull {
  id: number;
  name: string;
  username: string;
  email: string;
  quarter_goal: number;
  quarter_total: number;
  payroll_code: string;
  category: CategoryInfo;
  smoker: boolean;
  roles: RolesInfo[];

  constructor (
    id? : number,
    name? : string,
    username? : string,
    email? : string,
    quarter_goal? : number,
    quarter_total? : number,
    payroll_code? : string,
    category? : CategoryInfo,
    smoker? : boolean,
    roles? : RolesInfo[]
  )
  {
    this.id = id,
    this.name = name,
    this.username = username,
    this.email = email,
    this.quarter_goal = quarter_goal,
    this.quarter_total = quarter_total,
    this.payroll_code = payroll_code,
    this.category = category,
    this.smoker = smoker,
    this.roles = roles
  }
}


