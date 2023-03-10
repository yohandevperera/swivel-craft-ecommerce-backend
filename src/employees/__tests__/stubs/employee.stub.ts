import { EmployeeType } from 'src/employees/employee.type';

export const employeeStub = (): EmployeeType => ({
  email: 'Ewald.Kunde@gmail.com',
  firstname: 'Lindsay',
  lastname: 'Herman',
  phone: '+94771274218',
  gender: 'F',
  photo: 'https://randomuser.me/api/portraits/men/30.jpg',
  _id: '63ff04ffb8e613034a3ea944'
});
