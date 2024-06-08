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
    return await this.Prisma.user.findMany({
      select: {
        id: true,
        password: false,
        googleId: false,
        email: true,
        username: true,
    }});
  }
  async findSome(filter) {
    return await this.Prisma.user.findMany({ where: filter });
  }

  async findOneById(id: number) {
    return await this.Prisma.user.findUnique({ where: { id: id } });
  }
  async findOneByusername(username: string) {
    return await this.Prisma.user.findUnique({ where: { username: username } });
  }
  async findOneByemail(email: string) {
    return await this.Prisma.user.findUnique({ where: { email: email } });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
