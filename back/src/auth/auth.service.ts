/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UpdateUserDto } from 'src/user/dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma, User } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private prisma: PrismaService,
  ) {}

  async signIn(createAuthDto: UpdateUserDto) {
    return 'This action adds a new auth';
  }

  async signUp(createAuthDto: CreateUserDto): Promise<User> {
    const CreatedUser = await this.prisma.user.create({
      data: { ...createAuthDto },
    });
    return CreatedUser;
  }
}
