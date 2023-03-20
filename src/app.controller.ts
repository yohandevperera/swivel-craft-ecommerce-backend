import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

/**
 * Usage and Description - This file will act as the main
 * app controller for the main server end point
 *
 **/

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
