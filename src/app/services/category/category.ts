export class Category {
	category_id: number;
	name: String;
	quarterly_goal: number;
	description: String;

	constructor(category_id: number,
		name: String,
		quarterly_goal: number,
		description: String){
			this.category_id = category_id;
			this.name = name;
			this.quarterly_goal = quarterly_goal;
			this.description = description;
		}
}