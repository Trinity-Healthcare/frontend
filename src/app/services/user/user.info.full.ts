import { CategoryInfo } from "../category/category.info";
import { RolesInfo } from "../role/roles.info";

export class FullUser {
  id: number;
  name: string;
  username: string;
  email: string;
  quarter_goal: number;
  quarter_total: number;
  payrollcode: string;
  category: CategoryInfo;
  smoker: boolean;
  roles: RolesInfo[];
}
