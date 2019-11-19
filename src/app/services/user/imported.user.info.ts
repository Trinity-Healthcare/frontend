export class ImportedUserInfo {
  name: string;
  employeeCode: string;
  payrollCode: string;
  dob: string;

  constructor(name?: string, 
              employeeCode?: string,
              payrollCode?: string,
              dob?: string) {
    this.name = name;
    this.employeeCode = employeeCode
    this.payrollCode = payrollCode;
    this.dob = dob;
  }
}
