import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma.service';
import { GoogleController } from './google.controller';
import { GoogleService } from 'google.service';

@Module({
  imports: [],
  controllers: [AppController, GoogleController],
  providers: [AppService, GoogleService, PrismaService],
})
export class AppModule {}
