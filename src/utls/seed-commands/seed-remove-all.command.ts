import { Injectable } from '@nestjs/common';
import { Command } from 'nestjs-command';
import _ = require('lodash');
import * as bcrypt from 'bcryptjs';

import { CraftsService } from 'src/crafts/crafts.service';
import { CraftCategoriesService } from 'src/craft-categories/craft-categories.service';
import { UserService } from 'src/user/user.service';

import * as craftCategories from '../meta-data/craft-categories.json';
import * as users from '../meta-data/users.json';
import * as crafts from '../meta-data/crafts.json';

/**
 * Usage and Description - This file will be used as custom command file
 * that could serve the purpose as a seeder to seed all the meta
 * in the json files as well as to remove all the meta data using custom commands
 *
 **/

@Injectable()
export class SeedAndRemoveAllCommand {
  constructor(
    private readonly craftCategoriesService: CraftCategoriesService,
    private readonly usersService: UserService,
    private readonly craftsService: CraftsService,
  ) {}

  /**
   * Usage and Description - Using this function all the defined meta data
   * in the JSON file will be inserted to the defined collections
   *
   **/
  @Command({
    command: 'seed:all',
    describe: 'will insert all the defined meta data',
  })
  async seed() {
    try {
      const seedUsersResponse = await this.insertUsers();
      const seedCraftCategoriesResponse = await this.insertCraftCategories();
      const seedCraftResponse = await this.insertCrafts();

      if (
        _.isEmpty(seedUsersResponse) &&
        _.isEmpty(seedCraftCategoriesResponse) &&
        _.isEmpty(seedCraftResponse)
      ) {
        console.log('Error Inserting Meta Data');
      } else {
        console.log(seedUsersResponse);
        console.log(seedCraftCategoriesResponse);
        console.log(seedCraftResponse);
        console.log('Meta Data Inserted Successfully');
      }
    } catch (error) {
      console.log(`Seeder Exception  ${error}`);
    }
  }

  /**
   * Usage and Description - Using this function all the meta data
   * in mongooese documents will be removed
   *
   **/
  @Command({
    command: 'remove:all',
    describe: 'will delete all the meta data from the collections',
  })
  async removeAllMetaData() {
    try {
      const removeUsersResponse = await this.usersService.bulkRemoveUser();
      const removeCraftCategoriesResponse =
        await this.craftCategoriesService.bulkRemoveCraftCategories();
      const removeCraftsResponse = await this.craftsService.bulkRemoveCraft();

      if (
        _.isEmpty(removeUsersResponse) &&
        _.isEmpty(removeCraftCategoriesResponse) &&
        _.isEmpty(removeCraftsResponse)
      ) {
        console.log('Error Removing Meta Data');
      } else {
        console.log(removeUsersResponse);
        console.log(removeCraftCategoriesResponse);
        console.log(removeCraftsResponse);
        console.log('Meta Data Removed Successfully');
      }
    } catch (error) {
      console.log(`Delete all Exception  ${error}`);
    }
  }

  async insertUsers() {
    if (!_.isUndefined(users) || !_.isEmpty(users)) {
      const remappedUsersPromise = await users.map(async (user) => {
        return {
          ...user,
          password: await bcrypt.hash(user.password, 10),
        };
      });

      const mappedUsers = await Promise.all(remappedUsersPromise).then(
        async (users) => users,
      );
      return this.usersService.bulkInsertUsers(mappedUsers);
    }
  }

  async insertCraftCategories() {
    if (!_.isUndefined(craftCategories) || !_.isEmpty(craftCategories)) {
      return this.craftCategoriesService.bulkInsertCraftCategories(
        craftCategories,
      );
    }
  }

  async insertCrafts() {
    if (!_.isUndefined(crafts) || !_.isEmpty(crafts)) {
      return this.craftsService.bulkInsertCraft(crafts);
    }
  }
}
