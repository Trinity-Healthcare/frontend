/* 
 *  Copyright (C) 2019 Prime Inc - All Rights Reserved
 *  Unauthorized use of this file and its contents, via any medium is strictly prohibited.
 *  Authored by the Missouri State University Computer Science Department
 *  Fall 2019 CSC 450 - Group 2
 */

export class CategoryInfo {
	category_id: number;
	name: string;
	quarterly_goal: number;
	description: string;

	constructor(category_id?: number,
		name?: string,
		quarterly_goal?: number,
		description?: string)
		{
			this.category_id = category_id;
			this.name = name;
			this.quarterly_goal = quarterly_goal;
			this.description = description;
		}
}