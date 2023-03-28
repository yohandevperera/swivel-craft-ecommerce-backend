import { Injectable } from '@nestjs/common';
import { CraftCategoriesService } from 'src/craft-categories/craft-categories.service';
import { Command } from 'nestjs-command';
import _ = require('lodash');
import * as craftCategories from '../meta-data/craft-categories.json';

/**
 * Usage and Description - This file will be used as custom command file
 * that could serve the purpose as a seeder to seed all the meta craft categories
 * in the json file as well as to remove all the craft categories using custom commands
 *
 **/

@Injectable()
export class CraftCategoriesCommand {
  constructor(
    private readonly craftCategoriesService: CraftCategoriesService,
  ) {}

  /**
   * Usage and Description - Using this function all the craft categories data
   * in the JSON file will be inserted to the categories collection
   *
   **/
  @Command({
    command: 'seed:craft-categories',
    describe: 'will insert all the craft category meta data',
  })
  async seed() {
    try {
      if (!_.isUndefined(craftCategories) || !_.isEmpty(craftCategories)) {
        const addedCraftcategories =
          await this.craftCategoriesService.bulkInsertCraftCategories(
            craftCategories,
          );
        console.log(addedCraftcategories);

        !_.isEmpty(addedCraftcategories)
          ? console.log('craft categories added successfully')
          : console.log('Error adding craft categories');
      }
    } catch (error) {
      console.log(`Seeder Exception  ${error}`);
    }
  }

  /**
   * Usage and Description - Using this function all the craft categories data
   * in mongooese document will be removed
   *
   **/
  @Command({
    command: 'remove:craft-categories',
    describe: 'will delete all the craft category meta data',
  })
  async removeAllcraftCategories() {
    try {
      const deletedCraftcategories =
        await this.craftCategoriesService.bulkRemoveCraftCategories();
      console.log(deletedCraftcategories);
      !_.isEmpty(deletedCraftcategories)
        ? console.log('Craft categories deleted successfully')
        : console.log('Error craft categories employees');
    } catch (error) {
      console.log(`Delete all Exception  ${error}`);
    }
  }
}
