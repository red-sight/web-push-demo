import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma.service';
import { GoogleController } from './google.controller';
import { GoogleService } from 'google.service';
import { AuthController } from 'auth.controller';
import { AuthService } from 'auth.service';

@Module({
  imports: [],
  controllers: [AppController, GoogleController, AuthController],
  providers: [AppService, AuthService, GoogleService, PrismaService],
})
export class AppModule {}
