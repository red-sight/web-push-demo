import { Module } from '@nestjs/common';
import { SigninController } from './signin.controller';
import { PrismaService } from 'prisma.service';
import { SigninService } from './signin.service';

@Module({
  controllers: [SigninController],
  providers: [SigninService, PrismaService],
})
export class SigninModule {}
