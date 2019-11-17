export class CategoryInfo {
	category_id: number;
	name: string;
	quarterly_goal: number;
	description: string;

	constructor(category_id: number,
		name: string,
		quarterly_goal: number,
		description: string)
		{
			this.category_id = category_id;
			this.name = name;
			this.quarterly_goal = quarterly_goal;
			this.description = description;
		}
}