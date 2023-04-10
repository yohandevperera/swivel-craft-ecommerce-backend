import { Injectable } from '@nestjs/common';
import { UserDto } from './dto/create-update-user.dto';
import { User, UserDocument } from 'src/schemas/user.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private usersModel: Model<UserDocument>,
    private jwtService: JwtService,
  ) {}

  /**
   * Usage - This method will be used to sign up user to the
   * created user collection with a jwt token
   *
   * @parms createUser @typedef UserDto
   * @returns @typedef Promise<{userToken: string}>
   */
  async create(createUser: UserDto): Promise<{ userToken: string }> {
    const hashedPassword = await bcrypt.hash(createUser.password, 10);
    const createdUser = await this.usersModel.create({
      password: hashedPassword,
      ...createUser,
    });
    const userToken = this.jwtService.sign({ id: createdUser._id });
    return { userToken };
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
  async findOne(id: number) {
    return this.usersModel.findById(id, {
      firstname: 1,
      email: 1,
      phone: 1,
      userRole: 1,
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
  async update(id: number, updateUser: UserDto) {
    const hashedPassword = await bcrypt.hash(updateUser.password, 10);
    return this.usersModel.updateOne(
      { _id: id },
      {
        $set: {
          password: hashedPassword,
          ...updateUser,
        },
      },
    );
  }

  /**
   * Usage - This method will be used to remove a user object for a
   * given user in the user collection
   *
   * @parms id @typedef string
   * @returns @typedef Promise<UserDto>
   */
  async remove(id: number) {
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
}
