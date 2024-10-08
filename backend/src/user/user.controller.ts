import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { User as UserModel } from '@prisma/client';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getUsers(): Promise<UserModel[]> {
    return this.userService.getUsers();
  }

  @Post()
  async createUser(
    @Body()
    userData: {
      firstName: string;
      lastName: string;
      email: string;
      password: string;
      role: 'ADMIN' | 'CLIENT';
    },
  ): Promise<UserModel> {
    return this.userService.createUser(userData);
  }

  @Get(':email')
  async getUserByEmail(
    @Param('email') email: string,
  ): Promise<UserModel | null> {
    return this.userService.getUserByEmail(email);
  }
}
