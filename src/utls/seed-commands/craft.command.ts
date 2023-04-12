import { Injectable } from '@nestjs/common';
import { CraftsService } from 'src/crafts/crafts.service';
import { Command } from 'nestjs-command';
import _ = require('lodash');
import * as crafts from '../meta-data/crafts.json';

/**
 * Usage and Description - This file will be used as custom command file
 * that could serve the purpose as a seeder to seed all the meta craft
 * in the json file as well as to remove all the craft using custom commands
 *
 **/

@Injectable()
export class CraftsCommand {
  constructor(private readonly craftsService: CraftsService) {}

  /**
   * Usage and Description - Using this function all the craft data
   * in the JSON file will be inserted to the collection
   *
   **/
  @Command({
    command: 'seed:crafts',
    describe: 'will insert all the craft meta data',
  })
  async seed() {
    try {
      if (!_.isUndefined(crafts) || !_.isEmpty(crafts)) {
        const addedCrafts = await this.craftsService.bulkInsertCraft(crafts);
        console.log(addedCrafts);

        !_.isEmpty(addedCrafts)
          ? console.log('Craft added successfully')
          : console.log('Error adding craft');
      }
    } catch (error) {
      console.log(`Seeder Exception  ${error}`);
    }
  }

  /**
   * Usage and Description - Using this function all the craft  data
   * in mongooese document will be removed
   *
   **/
  @Command({
    command: 'remove:crafts',
    describe: 'will delete all the craft meta data',
  })
  async removeAllCrafts() {
    try {
      const deletedCrafts = await this.craftsService.bulkRemoveCraft();
      console.log(deletedCrafts);
      !_.isEmpty(deletedCrafts)
        ? console.log('Craft deleted successfully')
        : console.log('Error deleting crafts');
    } catch (error) {
      console.log(`Delete all Exception  ${error}`);
    }
  }
}
