import { Category } from "./category/category";
import { Roles } from "./role/roles";

export class FullUser {
  id: number;
  name: String;
  username: String;
  email: String;
  quarter_goal: number;
  quarter_total: number;
  payrollcode: string;
  category: Category;
  roles: Roles[];
}
