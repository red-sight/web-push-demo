import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma.service';
import { GoogleController } from './google.controller';
import { GoogleService } from 'google.service';
import { AuthController } from 'auth.controller';
import { AuthService } from 'auth.service';
import { SignupController } from 'controllers/signup.controller';
import { SignupService } from 'services/signup.service';
import { SigninController } from 'controllers/signin.controller';
import { SigninService } from 'services/signin.service';
import { ClientsModule } from '@nestjs/microservices';
import { config } from '@repo/config';

@Module({
  imports: [
    ClientsModule.register([
      {
        ...config.nestMicroserviceClientOptions,
        name: 'MAILSERVICE',
      },
    ]),
  ],
  controllers: [
    SignupController,
    SigninController,
    AppController,
    GoogleController,
    AuthController,
  ],
  providers: [
    SignupService,
    SigninService,
    AppService,
    AuthService,
    GoogleService,
    PrismaService,
  ],
})
export class AppModule {}
