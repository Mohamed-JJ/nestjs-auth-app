/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get()
  async getAll() {
    return await this.userService.findAll();
  }
  @Get('/:id')
  async getOne(@Param('id') id: string) {
    const user = await this.userService.findOneById(+id);
    if (!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    const { password, ...result } = user;
    return result;
  }
}
