import { CategoryInfo } from "../category/category.info";
import { RolesInfo } from "../role/roles.info";

export class FullUser {
  id: number;
  name: String;
  username: String;
  email: String;
  quarter_goal: number;
  quarter_total: number;
  payrollcode: string;
  category: CategoryInfo;
  roles: RolesInfo[];
}
