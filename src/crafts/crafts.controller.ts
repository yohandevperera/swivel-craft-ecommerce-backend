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
import { CraftsService } from './crafts.service';
import { CraftDto, CraftParamsDto } from './dto/create-update-craft.dto';
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
 * of the craft resource
 **/

@Controller('api/crafts')
export class CraftsController {
  constructor(
    private readonly craftsService: CraftsService,
    private readonly logger: Logger,
  ) {}

  /**
   * Usage - This method will be used to create a new craft
   *
   * @parms createCraftDto @typedef CraftDto
   */
  @Post()
  @UsePipes(new ValidationPipe())
  @ApiCreatedResponse({ description: 'Craft created successfully' })
  @ApiBody({ type: CraftDto })
  async create(@Body() createCraft: CraftDto) {
    try {
      const createdCraft = await this.craftsService.create(createCraft);
      return successRes('Craft created successfully', createdCraft);
    } catch (error) {
      this.logger.error((error as Error).message);
      return errorRes((error as Error).message);
    }
  }

  /**
   * Usage - This method will be used to fetch all created Craft
   *
   */
  @Get()
  @ApiOkResponse({ description: 'Craft fetched successfully' })
  async findAll() {
    try {
      const craft = await this.craftsService.findAll();
      if (_.isEmpty(craft)) {
        return errorRes('Error fetching craft ');
      }
      return successRes('Craft fetched successfully', craft);
    } catch (error) {
      this.logger.error((error as Error).message);
      return errorRes((error as Error).message);
    }
  }

  /**
   * Usage - This method will be used to fetch a craft  for a given
   * craft  id
   *
   * @parms params @typedef CraftParamsDto
   */
  @Get(':id')
  @ApiOkResponse({ description: 'Craft fetched successfully' })
  @ApiParam({
    type: String,
    name: 'id',
  })
  async findOne(@Param() params: CraftParamsDto) {
    try {
      const craft = await this.craftsService.findOne(params.id);
      if (_.isEmpty(craft)) {
        return errorRes('Error fetching craft ');
      }
      return successRes('Craft fetched successfully', craft);
    } catch (error) {
      this.logger.error((error as Error).message);
      return errorRes((error as Error).message);
    }
  }

  /**
   * Usage - This method will be used to update an craft  for a given
   * craft  id
   *
   * @parms params @typedef CraftParamsDto
   * @parms updateCraft @typedef CraftDto
   */
  @Patch(':id')
  @UsePipes(new ValidationPipe())
  @ApiCreatedResponse({ description: 'Craft updated successfully' })
  @ApiParam({
    type: String,
    name: 'id',
  })
  async update(@Param() params: CraftParamsDto, @Body() updateCraft: CraftDto) {
    try {
      const updatedCraft = await this.craftsService.update(
        params.id,
        updateCraft,
      );
      return successRes('Craft updated successfully', updatedCraft);
    } catch (error) {
      this.logger.error((error as Error).message);
      return errorRes((error as Error).message);
    }
  }

  /**
   * Usage - This method will be used to remove a craft  for a given
   * craft  id
   *
   * @parms params @typedef CraftParamsDto
   */
  @Delete(':id')
  @ApiOkResponse({ description: 'Craft removed successfully' })
  @ApiParam({
    type: String,
    name: 'id',
  })
  async remove(@Param() params: CraftParamsDto) {
    try {
      const deletedCraft = await this.craftsService.remove(params.id);
      return successRes('Craft removed successfully', deletedCraft);
    } catch (error) {
      this.logger.error((error as Error).message);
      return errorRes((error as Error).message);
    }
  }
}
