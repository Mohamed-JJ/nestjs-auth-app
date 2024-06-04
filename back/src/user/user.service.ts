/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
// import { Prisma } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private Prisma: PrismaService) {}
  async create(createUserDto: CreateUserDto) {
    const user = await this.Prisma.user.create({
      data: createUserDto,
    });
    return user;
  }

  async findAll() {
    return await this.Prisma.user.findMany();
    // return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
