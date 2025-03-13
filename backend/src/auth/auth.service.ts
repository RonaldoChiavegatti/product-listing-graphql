import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { LoginInput } from './dto/login.input';
import { RegisterInput } from './dto/register.input';
import * as bcrypt from 'bcrypt';
import { AuthResponse } from './dto/auth-response.dto';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async testDbConnection() {
    try {
      const userCount = await this.prisma.user.count();
      console.log('Connected to database. User count:', userCount);
      return true;
    } catch (error) {
      console.error('Database connection error:', error);
      return false;
    }
  }

  async login(loginInput: LoginInput): Promise<AuthResponse> {
    const user = await this.prisma.user.findUnique({
      where: { email: loginInput.email },
    });

    if (!user) {
      throw new UnauthorizedException('Email ou senha inválidos');
    }

    const validPassword = await bcrypt.compare(loginInput.password, user.password);

    if (!validPassword) {
      throw new UnauthorizedException('Email ou senha inválidos');
    }

    const access_token = this.jwtService.sign({
      userId: user.id,
      email: user.email
    });

    return { access_token };
  }

  async register(registerInput: RegisterInput) {
    try {
      console.log('Recebendo registro:', registerInput);

      const existingUser = await this.prisma.user.findUnique({
        where: { email: registerInput.email },
      });

      if (existingUser) {
        throw new Error('Usuário já existe');
      }

      const hashedPassword = await bcrypt.hash(registerInput.password, 10);

      const user = await this.prisma.user.create({
        data: {
          email: registerInput.email,
          password: hashedPassword,
        },
      });

      console.log('Usuário criado:', user);

      const token = this.jwtService.sign({ userId: user.id, email: user.email });
      console.log('Token gerado');

      return {
        access_token: token,
      };
    } catch (error) {
      console.error('Erro no registro:', error);
      throw error;
    }
  }
}
