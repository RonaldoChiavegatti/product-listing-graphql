import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginInput } from './dto/login.input';
import { RegisterInput } from './dto/register.input';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() loginInput: LoginInput) {
    return this.authService.login(loginInput);
  }

  @Post('register')
  async register(@Body() registerInput: RegisterInput) {
    return this.authService.register(registerInput);
  }
}
