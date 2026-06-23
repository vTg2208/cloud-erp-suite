import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import type { User } from '@prisma/client';
import bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';
import { SignupDto } from './dto/signup.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  private excludePassword(user: User): Omit<User, 'password'> {
    const { password, ...result } = user;
    return result;
  }

  async validateEmployee(
    email: string,
    password: string,
  ): Promise<Omit<User, 'password'> | null> {
    const user = await this.prisma.user.findUnique({
      where: { userid: email },
    });

    if (!user || !user.password) {
      return null;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return null;
    }

    return this.excludePassword(user);
  }

  async login(user: Omit<User, 'password'>) {
    const payload = { sub: user.userid, username: user.username };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async signup(data: SignupDto) {
    try {
      console.log('Received:', data);

      const hashedPassword = await bcrypt.hash(data.password, 10);
      console.log('Password hashed');

      const user = await this.prisma.user.create({
        data: {
          userid: data.email,
          username: data.email,
          password: hashedPassword,
        },
      });

      console.log('User created');

      return this.excludePassword(user);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
