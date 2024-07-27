import { LocalStrategy } from './strategies/local.strategy';
import { Global, Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { config } from '@repo/config';
import { SessionSerializer } from './utils/session.serializer';
import { PassportModule } from '@nestjs/passport';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { RpcExceptionFilter } from 'filters/RcpExceptionFilter';
import { RedisModule } from '@nestjs-modules/ioredis';
import { SigninModule } from './modules/signin/signin.module';
import { SignupModule } from './modules/signup/signup.module';
import { ProfileModule } from './modules/profile/profile.module';
import { OtpModule } from './modules/otp/otp.module';
import { GateService } from 'gate.service';
import { ServiceMethodInterceptor } from 'interceptors/service-method.interceptor';

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
    ProfileModule,
    OtpModule,
  ],
  providers: [
    SessionSerializer,
    {
      provide: APP_FILTER,
      useClass: RpcExceptionFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ServiceMethodInterceptor,
    },
    LocalStrategy,
    GateService,
  ],
  exports: [RedisModule, ClientsModule, LocalStrategy, OtpModule],
})
export class AppModule {}
