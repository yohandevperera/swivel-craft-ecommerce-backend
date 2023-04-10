import { Module } from '@nestjs/common';
import { CraftCategoriesService } from './craft-categories.service';
import { CraftCategoriesController } from './craft-categories.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Logger } from '@nestjs/common/services';
import {
  CraftCategory,
  CraftCategorySchema,
} from 'src/schemas/craft.category.schema';

/**
 * Usage and Description - This file will act as a wrapper to
 * combine the model functions, service functions and controller functions in the craft categories resource
 *
 **/

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: CraftCategory.name,
        schema: CraftCategorySchema,
      },
    ]),
  ],
  controllers: [CraftCategoriesController],
  providers: [CraftCategoriesService, Logger],
  exports: [CraftCategoriesService],
})
export class CraftCategoriesModule {}
