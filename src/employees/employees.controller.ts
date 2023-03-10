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
import { errorRes, successRes } from '../../src/utls/response.formatter';
import _ = require('lodash');
import { UsePipes } from '@nestjs/common/decorators';
import { ValidationPipe } from '@nestjs/common/pipes';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
} from '@nestjs/swagger/dist';
import {
  EmployeeDto,
  EmployeeParamsDto,
} from './dto/create-update-employee.dto';

@Controller('api/employees')
export class EmployeesController {
  constructor(
    private readonly employeesService: EmployeesService,
    private readonly logger: Logger,
  ) {}

  @Post()
  @UsePipes(new ValidationPipe())
  @ApiCreatedResponse({ description: 'Employee created successfully' })
  @ApiBody({ type: EmployeeDto })
  async create(@Body() CreateUpdateEmployee: EmployeeDto) {
    try {
      const createdEmployee = await this.employeesService.create(
        CreateUpdateEmployee,
      );
      return successRes('Employee created successfully', createdEmployee);
    } catch (error) {
      this.logger.error((error as Error).message);
      return errorRes((error as Error).message);
    }
  }

  @Get()
  @ApiOkResponse({ description: 'Employees fetching successfully' })
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
  @ApiOkResponse({ description: 'Employee fetched successfully' })
  @ApiParam({
    type: String,
    name: 'id',
  })
  async findOne(@Param() params: EmployeeParamsDto) {
    try {
      const employees = await this.employeesService.findOne(params.id);
      if (_.isEmpty(employees)) {
        return errorRes('Error fetching employee');
      }
      return successRes('Employee fetched successfully', employees);
    } catch (error) {
      this.logger.error((error as Error).message);
      return errorRes((error as Error).message);
    }
  }

  @Patch(':id')
  @UsePipes(new ValidationPipe())
  @ApiCreatedResponse({ description: 'Employee updated successfully' })
  @ApiParam({
    type: String,
    name: 'id',
  })
  @ApiBody({ type: EmployeeDto })
  async update(
    @Param() params: EmployeeParamsDto,
    @Body() CreateUpdateEmployee: EmployeeDto,
  ) {
    try {
      const updatedEmployee = await this.employeesService.update(
        params.id,
        CreateUpdateEmployee,
      );
      return successRes('Employee updated successfully', updatedEmployee);
    } catch (error) {
      this.logger.error((error as Error).message);
      return errorRes((error as Error).message);
    }
  }

  @Delete(':id')
  @ApiOkResponse({ description: 'Employee removed successfully' })
  @ApiParam({
    type: String,
    name: 'id',
  })
  async remove(@Param() params: EmployeeParamsDto) {
    try {
      const deletedEmployee = await this.employeesService.remove(params.id);
      return successRes('Employee removed successfully', deletedEmployee);
    } catch (error) {
      this.logger.error((error as Error).message);
      return errorRes((error as Error).message);
    }
  }
}
