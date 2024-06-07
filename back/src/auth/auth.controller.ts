/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UpdateUserDto } from 'src/user/dto/update-user.dto';
import * as bcrypt from 'bcrypt';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signIn')
  async login(@Body() User: UpdateUserDto) {
    return this.authService.signIn(User);
  }

  @Post('signUp')
  async signUp(@Body() User: CreateUserDto) {
    // hash the password before saving it, hashSync is used for simplicity and for instant hashing
    User.password = bcrypt.hashSync(User.password, 10);
    return this.authService.signUp(User);
  }
}
