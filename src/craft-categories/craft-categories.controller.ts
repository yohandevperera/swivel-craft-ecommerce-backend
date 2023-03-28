import { CraftCategoriesService } from './craft-categories.service';
import { UsePipes } from '@nestjs/common/decorators';
import { ValidationPipe } from '@nestjs/common/pipes';
import { errorRes, successRes } from '../utls/response.formatter';
import _ = require('lodash');
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
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
} from '@nestjs/swagger/dist';
import {
  CraftCategoryDto,
  CraftCategoryParamsDto,
} from './dto/create-update-craft-category.dto';

/**
 * Usage and Description - This file will act as a controller file which
 * will act as a mediator between the defined service methods and api routes
 * of the craft categories resource
 **/

@Controller('api/craft-categories')
export class CraftCategoriesController {
  constructor(
    private readonly craftCategoriesService: CraftCategoriesService,
    private readonly logger: Logger,
  ) {}

  /**
   * Usage - This method will be used to create new craft categories
   *
   * @parms createCraftCategoryDto @typedef CraftCategoryDto
   */
  @Post()
  @UsePipes(new ValidationPipe())
  @ApiCreatedResponse({ description: 'Craft category created successfully' })
  @ApiBody({ type: CraftCategoryDto })
  async create(@Body() createCraftCategory: CraftCategoryDto) {
    try {
      const createdCraftCategory = await this.craftCategoriesService.create(
        createCraftCategory,
      );
      return successRes(
        'Craft category created successfully',
        createdCraftCategory,
      );
    } catch (error) {
      this.logger.error((error as Error).message);
      return errorRes((error as Error).message);
    }
  }

  /**
   * Usage - This method will be used to fetch all created Craft categories
   *
   */
  @Get()
  @ApiOkResponse({ description: 'Craft categories fetched successfully' })
  async findAll() {
    try {
      const craftCategories = await this.craftCategoriesService.findAll();
      if (_.isEmpty(craftCategories)) {
        return errorRes('Error fetching craft categories');
      }
      return successRes(
        'Craft categories fetched successfully',
        craftCategories,
      );
    } catch (error) {
      this.logger.error((error as Error).message);
      return errorRes((error as Error).message);
    }
  }

  /**
   * Usage - This method will be used to fetch a craft category for a given
   * craft category id
   *
   * @parms params @typedef CraftCategoryParamsDto
   */
  @Get(':id')
  @ApiOkResponse({ description: 'Craft category fetched successfully' })
  @ApiParam({
    type: String,
    name: 'id',
  })
  async findOne(@Param() params: CraftCategoryParamsDto) {
    try {
      const craftCategory = await this.craftCategoriesService.findOne(
        params.id,
      );
      if (_.isEmpty(craftCategory)) {
        return errorRes('Error fetching craft category');
      }
      return successRes('Craft category fetched successfully', craftCategory);
    } catch (error) {
      this.logger.error((error as Error).message);
      return errorRes((error as Error).message);
    }
  }

  /**
   * Usage - This method will be used to update an craft category for a given
   * craft category id
   *
   * @parms params @typedef CraftCategoryParamsDto
   * @parms updateCraftCategory @typedef CraftCategoryDto
   */
  @Patch(':id')
  @UsePipes(new ValidationPipe())
  @ApiCreatedResponse({ description: 'Craft category updated successfully' })
  @ApiParam({
    type: String,
    name: 'id',
  })
  async update(
    @Param() params: CraftCategoryParamsDto,
    @Body() updateCraftCategory: CraftCategoryDto,
  ) {
    try {
      const updatedCraftCategory = await this.craftCategoriesService.update(
        params.id,
        updateCraftCategory,
      );
      return successRes(
        'Craft category updated successfully',
        updatedCraftCategory,
      );
    } catch (error) {
      this.logger.error((error as Error).message);
      return errorRes((error as Error).message);
    }
  }

  /**
   * Usage - This method will be used to remove a craft category for a given
   * craft category id
   *
   * @parms params @typedef CraftCategoryParamsDto
   */
  @Delete(':id')
  @ApiOkResponse({ description: 'Craft category removed successfully' })
  @ApiParam({
    type: String,
    name: 'id',
  })
  async remove(@Param() params: CraftCategoryParamsDto) {
    try {
      const deletedCraftcategory = await this.craftCategoriesService.remove(
        params.id,
      );
      return successRes(
        'Craft category removed successfully',
        deletedCraftcategory,
      );
    } catch (error) {
      this.logger.error((error as Error).message);
      return errorRes((error as Error).message);
    }
  }
}
