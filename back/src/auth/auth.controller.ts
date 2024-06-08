/* eslint-disable @typescript-eslint/no-unused-vars */
import { Controller, Post, Body, UseGuards, Res, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UpdateUserDto } from 'src/user/dto/update-user.dto';
import { LocalGuard } from './guards/local-guard';
import { Request, Response } from 'express';

@Controller('/auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private jwtService: JwtService,
  ) {}

  @UseGuards(LocalGuard)
  @Post('/login')
  async login(@Body() userInfo: UpdateUserDto, @Req() res: Request) {
    return res.user;
  }

  @Post('/register')
  async register(@Body() user: CreateUserDto) {
    try {
      const createdUser = await this.authService.register(user);
      return createdUser;
    } catch (error) {
      throw error;
    }
  }
}
