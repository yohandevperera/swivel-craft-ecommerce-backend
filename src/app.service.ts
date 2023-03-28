import { Injectable } from '@nestjs/common';

/**
 * Usage and Description - This file will act as the main
 * service function to the main server end point
 *
 **/

@Injectable()
export class AppService {
  getHello(): string {
    return 'Welcome to the Craft E-commerce Server';
  }
}
