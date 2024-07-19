import { LocalStrategy } from './strategies/local.strategy';
import { Global, Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { config } from '@repo/config';
import { SessionSerializer } from './utils/session.serializer';
import { PassportModule } from '@nestjs/passport';
import { APP_FILTER } from '@nestjs/core';
import { RpcExceptionFilter } from 'filters/RcpExceptionFilter';
import { RedisModule } from '@nestjs-modules/ioredis';
import { SigninModule } from './modules/signin/signin.module';
import { SignupModule } from './modules/signup/signup.module';

@Global()
@Module({
  imports: [
    PassportModule.register({ session: true }),
    RedisModule.forRootAsync({
      useFactory: () => ({
        type: 'single',
        options: config.redisOptions,
      }),
    }),
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
    ClientsModule.register([
      {
        ...config.nestMicroserviceClientOptions,
        name: 'MAILSERVICE',
      },
    ]),
    SigninModule,
    SignupModule,
  ],
  providers: [
    SessionSerializer,
    {
      provide: APP_FILTER,
      useClass: RpcExceptionFilter,
    },
    LocalStrategy,
  ],
  exports: [RedisModule, ClientsModule, LocalStrategy],
})
export class AppModule {}
