import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Logger,
} from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { CreateUpdateEmployee } from './dto/create-update-employee.dto';
import { errorRes, successRes } from 'src/utls/response.formatter';
import _ = require('lodash');

@Controller('employees')
export class EmployeesController {
  constructor(
    private readonly employeesService: EmployeesService,
    private readonly logger: Logger,
  ) {}

  @Post()
  create(@Body() CreateUpdateEmployee: CreateUpdateEmployee) {
    try {
      const createdEmployee =
        this.employeesService.create(CreateUpdateEmployee);
      if (_.isEmpty(createdEmployee)) {
        return errorRes('Error creating employee');
      }
      return successRes('Employee created successfully', createdEmployee);
    } catch (error) {
      this.logger.error((error as Error).message);
      return errorRes((error as Error).message);
    }
  }

  @Get()
  async findAll() {
    try {
      const employees = await this.employeesService.findAll();
      if (_.isEmpty(employees)) {
        return errorRes('Error fetching employees');
      }
      return successRes('Employees fetching successfully', employees);
    } catch (error) {
      this.logger.error((error as Error).message);
      return errorRes((error as Error).message);
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const employees = await this.employeesService.findOne(+id);
      if (_.isEmpty(employees)) {
        return errorRes('Error fetching employee');
      }
      return successRes('Employee created successfully', employees);
    } catch (error) {
      this.logger.error((error as Error).message);
      return errorRes((error as Error).message);
    }
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() CreateUpdateEmployee: CreateUpdateEmployee,
  ) {
    try {
      const updatedEmployee = await this.employeesService.update(
        +id,
        CreateUpdateEmployee,
      );
      if (_.isEmpty(updatedEmployee)) {
        return errorRes('Error updating employee');
      }
    } catch (error) {
      this.logger.error((error as Error).message);
      return errorRes((error as Error).message);
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      const deletedEmployee = this.employeesService.remove(+id);
      if (_.isEmpty(deletedEmployee)) {
        return errorRes('Error removing employee');
      }
    } catch (error) {
      this.logger.error((error as Error).message);
      return errorRes((error as Error).message);
    }
  }

  @Get(':orderType')
  async sortAllEmployees(@Param('order') order: any) {
    try {
      const employees = await this.employeesService.sortAllEmployees(order);
      if (_.isEmpty(employees)) {
        return errorRes('Error fetching employees');
      }
      return successRes('Employee fetched successfully', employees);
    } catch (error) {
      this.logger.error((error as Error).message);
      return errorRes((error as Error).message);
    }
  }

  @Get(':name')
  async searchEmployees(@Param('name') name: string) {
    try {
      const employees = await this.employeesService.searchEmployees(name);
      if (_.isEmpty(employees)) {
        return errorRes('Error searching employees');
      }
      return successRes('Employee searched successfully', employees);
    } catch (error) {
      this.logger.error((error as Error).message);
      return errorRes((error as Error).message);
    }
  }
}
