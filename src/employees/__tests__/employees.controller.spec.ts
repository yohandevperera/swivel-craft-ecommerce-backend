import { Test } from '@nestjs/testing';
import { Employee } from 'src/schemas/employee.schema';
import { EmployeesController } from '../employees.controller';
import { EmployeesService } from '../employees.service';
import { employeeStub } from './stubs/employee.stub';
import { Logger } from '@nestjs/common/services';
import { employeesStub } from './stubs/employees.stub';

/**
 * Usage and Description - This file will consists all the test cases
 * that will run to check all the controller functions
 **/

jest.mock('../employees.service');

describe('Employees Controller Unit Test', () => {
  let employeesController: EmployeesController;
  let employeesService: EmployeesService;

  // This function will run as a initializer to create the testing environment
  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [EmployeesController],
      providers: [EmployeesService, Logger],
    }).compile();
    employeesController =
      moduleRef.get<EmployeesController>(EmployeesController);
    employeesService = moduleRef.get<EmployeesService>(EmployeesService);
    jest.clearAllMocks();
  });

  // This test case will validate if a single employee can be retrieved by giving an employee id
  describe('Get a single employee', () => {
    describe('when findOne is called', () => {
      let employee: any;
      beforeEach(async () => {
        employee = await employeesController.findOne(employeeStub()._id);
      });
      it('should call the employeeService', () => {
        expect(employeesService.findOne).toBeCalled();
      });
      it('should return a employee', () => {
        expect(employee.data).toStrictEqual(employeeStub());
      });
    });
  });

  // This test case will validate if all employees can be retrieved
  describe('Get all employees', () => {
    describe('when findAll is called', () => {
      let employee: any;
      beforeEach(async () => {
        employee = await employeesController.findAll();
      });
      it('should call the employeeService', () => {
        expect(employeesService.findAll).toBeCalled();
      });
      it('should return all employees', () => {
        expect(employee.data).toStrictEqual(employeesStub());
      });
    });
  });

  // This test case will validate if a  employee can be created
  describe('Create employee', () => {
    describe('when create is called', () => {
      let employee: any;
      beforeEach(async () => {
        employee = await employeesController.create(employeeStub());
      });
      it('should call the employeeService', () => {
        expect(employeesService.create).toBeCalled();
      });
      it('should return the created employee', () => {
        expect(employee.data).toStrictEqual(employeeStub());
      });
    });
  });

  // This test case will validate if a  employee can be updated
  describe('Update employee', () => {
    describe('when update is called', () => {
      let employee: any;
      beforeEach(async () => {
        employee = await employeesController.update(
          employeeStub()._id,
          employeeStub(),
        );
      });
      it('should call the employeeService', () => {
        expect(employeesService.update).toBeCalled();
      });
      it('should return the updated employee', () => {
        expect(employee.data).toStrictEqual(employeeStub());
      });
    });
  });

  // This test case will validate if a  employee can be removed
  describe('Remove employee', () => {
    describe('when remove is called', () => {
      let employee: any;
      beforeEach(async () => {
        employee = await employeesController.remove(employeeStub()._id);
      });
      it('should call the employeeService', () => {
        expect(employeesService.remove).toBeCalled();
      });
      it('should return the removed employee', () => {
        expect(employee.data).toStrictEqual(employeeStub());
      });
    });
  });
});
