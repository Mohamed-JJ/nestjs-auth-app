/* eslint-disable @typescript-eslint/no-unused-vars */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UpdateUserDto } from 'src/user/dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma, User } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    public prisma: PrismaService,
  ) {}

  async register(u: CreateUserDto) {
    const checkUserName = await this.usersService.findOneByusername(u.username);
    const checkUserEmail = await this.usersService.findOneByemail(u.email);
    if (checkUserName) {
      throw new HttpException(
        'Username already exists',
        HttpStatus.BAD_REQUEST,
      );
    } else if (checkUserEmail) {
      throw new HttpException('Email already exists', HttpStatus.BAD_REQUEST);
    }
    u.password = await bcrypt.hash(u.password, 10);
    const createdUser = await this.usersService.create(u);
    const { password, ...result } = createdUser;
    return result;
  }

  async login(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOneByusername(username);
    if (user && (await bcrypt.compare(pass, user.password))) {
      const { password, ...result } = user;
      console.log(result);
      return result;
    }
    throw new HttpException(
      'Invalid username/password',
      HttpStatus.UNAUTHORIZED,
    );
  }
}
