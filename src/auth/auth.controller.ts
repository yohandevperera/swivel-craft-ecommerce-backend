import { Controller, Body, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { AllowUnauthorizedRequest } from './valiadte.auth.decorator';

@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('/login')
  @AllowUnauthorizedRequest()
  login(@Body() login: LoginDto) {
    return this.authService.login(login);
  }
}
