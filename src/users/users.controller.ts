import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Logger,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import {
  UserDto,
  UserLoginParamsDto,
  UserParamsDto,
} from './dto/create-update-user.dto';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
} from '@nestjs/swagger';
import { errorRes, successRes } from 'src/utls/response.formatter';
import _ = require('lodash');

/**
 * Usage and Description - This file will act as a controller file which
 * will act as a mediator between the defined service methods and api routes
 * of the User resource
 **/

@Controller('api/users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly logger: Logger,
  ) {}

  /**
   * Usage - This method will be used to create a new User
   *
   * @parms createUserDto @typedef UserDto
   */
  @Post()
  @UsePipes(new ValidationPipe())
  @ApiCreatedResponse({ description: 'User created successfully' })
  @ApiBody({ type: UserDto })
  async create(@Body() createUser: UserDto) {
    try {
      const createdUser = await this.usersService.create(createUser);
      return successRes('User created successfully', createdUser);
    } catch (error) {
      this.logger.error((error as Error).message);
      return errorRes((error as Error).message);
    }
  }

  /**
   * Usage - This method will be used to fetch all created User
   *
   */
  @Get()
  @ApiOkResponse({ description: 'User fetched successfully' })
  async findAll() {
    try {
      const User = await this.usersService.findAll();
      if (_.isEmpty(User)) {
        return errorRes('Error fetching User ');
      }
      return successRes('User fetched successfully', User);
    } catch (error) {
      this.logger.error((error as Error).message);
      return errorRes((error as Error).message);
    }
  }

  /**
   * Usage - This method will be used to fetch a User  for a given
   * User  id
   *
   * @parms params @typedef UserParamsDto
   */
  @Get(':id')
  @ApiOkResponse({ description: 'User fetched successfully' })
  @ApiParam({
    type: String,
    name: 'id',
  })
  async findOne(@Param() params: UserParamsDto) {
    try {
      const User = await this.usersService.findOne(params.id);
      if (_.isEmpty(User)) {
        return errorRes('Error fetching User ');
      }
      return successRes('User fetched successfully', User);
    } catch (error) {
      this.logger.error((error as Error).message);
      return errorRes((error as Error).message);
    }
  }

  /**
   * Usage - This method will be used to update an User  for a given
   * User  id
   *
   * @parms params @typedef UserParamsDto
   * @parms updateUser @typedef UserDto
   */
  // @Patch(':id')
  // @UsePipes(new ValidationPipe())
  // @ApiCreatedResponse({ description: 'User updated successfully' })
  // @ApiParam({
  //   type: String,
  //   name: 'id',
  // })
  // async update(@Param() params: UserParamsDto, @Body() updateUser: UserDto) {
  //   try {
  //     const updatedUser = await this.usersService.update(params.id, updateUser);
  //     return successRes('User updated successfully', updatedUser);
  //   } catch (error) {
  //     this.logger.error((error as Error).message);
  //     return errorRes((error as Error).message);
  //   }
  // }

  /**
   * Usage - This method will be used to remove a User  for a given
   * User  id
   *
   * @parms params @typedef UserParamsDto
   */
  @Delete(':id')
  @ApiOkResponse({ description: 'User removed successfully' })
  @ApiParam({
    type: String,
    name: 'id',
  })
  async remove(@Param() params: UserParamsDto) {
    try {
      const deletedUser = await this.usersService.remove(params.id);
      return successRes('User removed successfully', deletedUser);
    } catch (error) {
      this.logger.error((error as Error).message);
      return errorRes((error as Error).message);
    }
  }

  @Get('find-by-name/:name')
  @ApiOkResponse({ description: 'User fetched successfully' })
  @ApiParam({
    type: String,
    name: 'name',
  })
  async findOneByName(@Param() params: any) {
    try {
      const User = await this.usersService.findUserByName(params.name);
      if (_.isEmpty(User)) {
        return errorRes('Error fetching User');
      }
      return successRes('User fetched successfully', User);
    } catch (error) {
      this.logger.error((error as Error).message);
      return errorRes((error as Error).message);
    }
  }

  @Post('login')
  @UsePipes(new ValidationPipe())
  @ApiCreatedResponse({ description: 'User logged in successfully' })
  @ApiBody({ type: UserLoginParamsDto })
  async login(@Body() user: UserLoginParamsDto) {
    try {
      const User = await this.usersService.validateUser(user);
      if (_.isEmpty(User)) {
        return errorRes('Error logging', {}, 401);
      }
      return successRes('User logged in successfully', User);
    } catch (error) {
      this.logger.error((error as Error).message);
      return errorRes((error as Error).message);
    }
  }
}
