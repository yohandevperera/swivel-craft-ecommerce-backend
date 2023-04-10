import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDocument, User } from 'src/schemas/user.schema';
import { LoginDto } from './dto/login.dto';
import _ = require('lodash');
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private usersModel: Model<UserDocument>,
    private jwtService: JwtService,
    private readonly logger: Logger,
  ) {}

  /**
   * Usage - This method will be used for to log a the system using
   * the email and password
   *
   * @parms login @typedef LoginDto
   * @returns @typedef Promise<{userToken: string}>
   */

  // Todo - add the user firstname email and the user role to the response 
  // make the response more strctured
  // delete the exceptions and return results
  async login(login: LoginDto): Promise<{ token: string }> {
    const user = await this.usersModel.findOne({ email: login.email });

    if (_.isEmpty(user)) {
      this.logger.error('Hello');
      throw new UnauthorizedException('Invalid email or password');
    }

    const isPasswordValid = await bcrypt.compare(login.password, user.password);
    this.logger.error(isPasswordValid);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid email or password');
    }
    const token = this.jwtService.sign({ id: user._id });
    return { token };
  }
}
