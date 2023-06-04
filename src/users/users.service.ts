import { Injectable } from '@nestjs/common';
import { UserDto, UserLoginParamsDto } from './dto/create-update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from 'src/schemas/user.schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private usersModel: Model<UserDocument>,
  ) {}

  async create(createUserDto: UserDto) {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    return await this.usersModel.create({
      password: hashedPassword,
      userRole: createUserDto.userRole,
      ...createUserDto,
    });
  }

  /**
   * Usage - This method will be used to fetch the selected feilds from
   * the user collection
   *
   * @returns @typedef Promise<UserDto[]>
   */
  async findAll() {
    return this.usersModel.find(
      {},
      { firstname: 1, email: 1, phone: 1, userRole: 1 },
    );
  }

  /**
   * Usage - This method will be used to fetch the selected feilds for
   * a given user id from the user collection
   *
   * @parms id @typedef string
   * @returns @typedef Promise<UserDto>
   */
  async findOne(id: string) {
    return this.usersModel.findById(id, {
      firstname: 1,
      email: 1,
      phone: 1,
    });
  }

  /**
   * Usage - This method will be used to update a user object for a
   * given user id in the user collection
   *
   * @parms id @typedef string
   * @parms updateUser @typedef UserDto
   * @returns @typedef Promise<UserDto>
   */
  // async update(id: number, updateUser: UserDto) {
  //   const hashedPassword = await bcrypt.hash(updateUser.password, 10);
  //   return this.usersModel.updateOne(
  //     { _id: id },
  //     {
  //       $set: {
  //         password: hashedPassword,
  //         ...updateUser,
  //       },
  //     },
  //   );
  // }

  /**
   * Usage - This method will be used to remove a user object for a
   * given user in the user collection
   *
   * @parms id @typedef string
   * @returns @typedef Promise<UserDto>
   */
  async remove(id: string) {
    return this.usersModel.deleteOne({ id });
  }

  /**
   * Usage - This method will be used to seed multiple users to
   * the defined users collection
   *
   * Note - this method will be used only in the defined seeders
   *
   * @parms users @typedef UserDto[]
   * @returns @typedef Promise<UserDto[]>
   */

  async bulkInsertUsers(users: UserDto[]) {
    return this.usersModel.insertMany(users);
  }

  /**
   * Usage - This method will be used to remove all users in
   * the defined user collection
   *
   * Note - this method will be used only in the defined seeders
   *
   * @returns @typedef Promise<any>
   */

  async bulkRemoveUser() {
    return this.usersModel.remove({});
  }

  async findUser(username: string): Promise<User | undefined> {
    const user = await this.usersModel.findOne({ username: username });
    return user;
  }

  async findUserByName(firstName: string) {
    return this.usersModel.find(
      { firstname: firstName },
      { firstname: 1, email: 1, phone: 1, password: 0, userRole: 1 },
    );
  }

  async validateUser(user: UserLoginParamsDto) {
    return this.usersModel.find(
      { email: user.email, password: user.password },
      { firstname: 1, email: 1, userRole: 1 },
    );
  }
}
