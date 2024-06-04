/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(private usersService: UserService) {}

  async signIn(createAuthDto: CreateAuthDto) {
    return 'This action adds a new auth';
  }

  async signUp(createAuthDto: CreateAuthDto) {
    return `This action returns will create a new user`;
  }
}
