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
  controllers: [AppController, AuthController],
  providers: [GoogleStrategy, SessionSerializer, AppService, AuthService],
})
export class AppModule {}
