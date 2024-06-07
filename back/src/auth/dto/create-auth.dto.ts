import { IsNotEmpty, IsString } from 'class-validator';

export class LoginUserDto {}

export class RegisterUserDto {
  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
