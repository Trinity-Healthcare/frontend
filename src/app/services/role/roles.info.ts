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
