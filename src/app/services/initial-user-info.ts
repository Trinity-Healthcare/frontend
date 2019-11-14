export class initial_user_info {
  employeeName: String;
  employeeCode: String;
  employeePayrollCode: String;
  dob: String;

  constructor(
    employeeName: String,
    employeeCode: String,
    employeePayrollCode: String,
    dob: String
  ) {
    this.employeeName = employeeName;
    this.employeeCode = employeeCode;
    this.employeePayrollCode = employeePayrollCode;
    this.dob = dob;
  }
}
