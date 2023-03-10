import { EmployeeType } from 'src/employees/employee.type';

export const employeesStub = (): EmployeeType[] => [
  {
    email: 'Ewald.Kunde@gmail.com',
    firstname: 'Lindsay',
    lastname: 'Herman',
    phone: '+94771274218',
    gender: 'F',
    photo: 'https://randomuser.me/api/portraits/men/30.jpg',
    _id: '63ff04ffb8e613034a3ea944',
  },
  {
    email: 'Mauricio.Stehr@yahoo.com',
    firstname: 'Gerda',
    lastname: 'Trantow',
    phone: '+94771277681',
    gender: 'M',
    photo: 'https://randomuser.me/api/portraits/men/85.jpg',
    _id: '63ff04ffb8e613034a3ea945',
  },
  {
    email: 'Angelita_Simonis@hotmail.com',
    firstname: 'Skye',
    lastname: 'Rolfson',
    phone: '+94771277689',
    gender: 'F',
    photo: 'https://randomuser.me/api/portraits/men/75.jpg',
    _id: '63ff04ffb8e613034a3ea946',
  },
];
