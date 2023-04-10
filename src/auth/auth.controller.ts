import { Controller, Body, Get, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { AllowUnauthorizedRequest } from './valiadte.auth.decorator';
import { RolesGuard } from './roles.guard';

@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('/login')
  @UseGuards(RolesGuard)
  @AllowUnauthorizedRequest()
  login(@Body() login: LoginDto) {
    return this.authService.login(login);
  }
}
