import { User } from '@prisma/client';
import { IsEmail, IsNotEmpty, Matches } from 'class-validator';

export class CreateUserDto implements User {
  id: number;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @Matches(/^[a-zA-Z0-9_]*$/, {})
  name: string;

  @Matches(/^[a-zA-Z0-9_]*$/, {})
  @IsNotEmpty()
  password: string;
}