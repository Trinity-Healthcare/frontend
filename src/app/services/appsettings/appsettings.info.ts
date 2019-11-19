export class AppSettingsInfo {
  app_id: Number;
  name: string;
  value: string;

  constructor(app_id: Number, name: string, value: string) {
    this.app_id = app_id;
    this.name = name;
    this.value = value;
  }
}
