export interface Employee {
  employeeId: number;
  name: string;
  email: string;
  role: 'Admin' | 'Manager' | 'Employee';
}
