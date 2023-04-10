import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { Command } from 'nestjs-command';
import _ = require('lodash');
import * as users from '../meta-data/users.json';
import * as bcrypt from 'bcryptjs';

/**
 * Usage and Description - This file will be used as custom command file
 * that could serve the purpose as a seeder to seed all the meta craft categories
 * in the json file as well as to remove all the craft categories using custom commands
 *
 **/

@Injectable()
export class UserCommand {
  constructor(private readonly usersService: UserService) {}

  /**
   * Usage and Description - Using this function all the users data
   * in the JSON file will be inserted to the user collection
   *
   **/
  @Command({
    command: 'seed:users',
    describe: 'will insert all the user meta data',
  })
  async seed() {
    try {
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
        const addedUsers = await this.usersService.bulkInsertUsers(mappedUsers);

        console.log(addedUsers);

        !_.isEmpty(addedUsers)
          ? console.log('users added successfully')
          : console.log('Error adding users');
      }
    } catch (error) {
      console.log(`Seeder Exception  ${error}`);
    }
  }

  /**
   * Usage and Description - Using this function all the user data
   * in mongooese document will be removed
   *
   **/
  @Command({
    command: 'remove:users',
    describe: 'will delete all the users meta data',
  })
  async removeAllcraftCategories() {
    try {
      const deletedUsers = await this.usersService.bulkRemoveUser();
      console.log(deletedUsers);

      !_.isEmpty(deletedUsers)
        ? console.log('Users deleted successfully')
        : console.log('Error deleting users');
    } catch (error) {
      console.log(`Delete all Exception  ${error}`);
    }
  }
}
