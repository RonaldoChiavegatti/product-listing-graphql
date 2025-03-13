import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { AuthResponse } from './dto/auth-response.dto';
import { LoginInput } from './dto/login.input';
import { RegisterInput } from './dto/register.input';
import { Public } from './decorators/public.decorator';
import { UnauthorizedException } from '@nestjs/common';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Mutation(() => AuthResponse)
  async login(@Args('loginInput') loginInput: LoginInput): Promise<AuthResponse> {
    try {
      console.log('Login attempt for:', loginInput.email); // Debug log
      const result = await this.authService.login(loginInput);
      console.log('Login successful for:', loginInput.email); // Debug log
      return result;
    } catch (error) {
      console.error('Login error:', error); // Debug log
      return {
        error: {
          message: error.message || 'Authentication failed'
        }
      };
    }
  }

  @Public()
  @Mutation(() => AuthResponse)
  async register(@Args('registerInput') registerInput: RegisterInput) {
    return this.authService.register(registerInput);
  }
}
