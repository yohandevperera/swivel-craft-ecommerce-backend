/**
 * Usage and Description - This file will also act as a sub data
 * type for the employee crud operations
 *
 **/

export type CreateUpdateEmployee = {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  gender: 'M' | 'F';
  photo: string;
};
