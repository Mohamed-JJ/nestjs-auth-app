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
  Res,
  Req,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UpdateUserDto } from 'src/user/dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';

@Controller('/auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private jwtService: JwtService,
  ) {}

  @Post('/signIn')
  async login(
    @Body() User: UpdateUserDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    try {
      const found = await this.authService.signIn(User);
      if (!found) {
        throw new HttpException('Invalid cerdentials', HttpStatus.NOT_FOUND);
      }
      if (!(await bcrypt.compare(User.password, found.password))) {
        throw new HttpException('Invalid cerdentials', HttpStatus.NOT_FOUND);
      }
      const jwt = await this.jwtService.signAsync({ id: found.id });
      // later on change the httpOnly to secure and give it a value of true
      res.cookie('jwt', jwt, { httpOnly: true });
      const header = res.getHeaders();
      console.log(header);
      return { message: 'success' };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  @Get('/SessionUser')
  //the front end will make an api call to this function for the context of the user
  async getUser(@Req() req: any) {
    try {
      const cookie = req.cookies['jwt'];
      // this function is used to verify the jwt token if it is valid or not
      const data = await this.jwtService.verifyAsync(cookie);
      if (!data) {
        throw new HttpException('Not Authorized', HttpStatus.UNAUTHORIZED);
      }
      const user = await this.authService.prisma.user.findUnique({
        where: { id: data.id },
      });
      // return the id of the user to the frontend to use the id to fetch the user data from the database
      const { password, ...ret } = user;
      return ret;
    } catch (error) {
      throw error;
    }
  }

  @Post('/signUp')
  async signUp(@Body() User: CreateUserDto) {
    // hash the password before saving it, hashSync is used for simplicity and for instant hashing
    User.password = bcrypt.hashSync(User.password, 10);
    const found = await this.authService.signUp(User);
    const { password, ...ret } = found;
    return ret;
  }

  @Post('/logout')
  async logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('jwt');
    return { message: 'success' };
  }
}
