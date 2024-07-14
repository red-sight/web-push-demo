import { LocalStrategy } from './strategies/local.strategy';
import { SigninController } from 'controllers/signin.controller';
import { SignupController } from 'controllers/signup.controller';
import { AuthService } from './auth.service';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule } from '@nestjs/microservices';
import { config } from '@repo/config';
import { AuthController } from './auth.controller';
import { GoogleStrategy } from './strategies/google.strategy';
import { SessionSerializer } from './utils/session.serializer';
import { PassportModule } from '@nestjs/passport';
import { APP_FILTER } from '@nestjs/core';
import { RpcExceptionFilter } from 'filters/RcpExceptionFilter';

@Module({
  imports: [
    PassportModule.register({ session: true }),
    ClientsModule.register([
      {
        ...config.nestMicroserviceClientOptions,
        name: 'MICROSERVICE',
      },
    ]),
    ClientsModule.register([
      {
        ...config.nestMicroserviceClientOptions,
        name: 'AUTHSERVICE',
      },
    ]),
  ],
  controllers: [
    SignupController,
    SigninController,
    AppController,
    AuthController,
  ],
  providers: [
    SessionSerializer,
    {
      provide: APP_FILTER,
      useClass: RpcExceptionFilter,
    },
    GoogleStrategy,
    LocalStrategy,
    AppService,
    AuthService,
  ],
})
export class AppModule {}
