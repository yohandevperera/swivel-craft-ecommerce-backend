/**
 * Usage and Description - This file will act as a sub employee type
 * that is being used in the service and controller functions
 **/

export type EmployeeType = {
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  gender: 'M' | 'F';
  photo: string;
  _id: any;
};
