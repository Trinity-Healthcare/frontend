/* 
 *  Copyright (C) 2019 Prime Inc - All Rights Reserved
 *  Unauthorized use of this file and its contents, via any medium is strictly prohibited.
 *  Authored by the Missouri State University Computer Science Department
 *  Fall 2019 CSC 450 - Group 2
 */

export class RolesInfo {
  id: number;
  name: string;
  public readonly available: string[];

  constructor(id? : number, name? : string)
  {
    this.id = id;
    this.name = name;
    this.available = [
      'ROLE_USER',
      'ROLE_MODERATOR',
      "ROLE_ADMIN"
    ];
  }
}
