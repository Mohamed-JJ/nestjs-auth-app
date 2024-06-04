import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [AuthController],
  imports: [UserModule, PrismaModule],
  providers: [AuthService],
  exports: [AuthModule],
})
export class AuthModule {}
