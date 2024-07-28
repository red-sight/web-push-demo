import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';
import * as passport from 'passport';
import * as cookieParser from 'cookie-parser';
import { RpcExceptionFilter } from 'filters/RcpExceptionFilter';
import RedisStore from 'connect-redis';
import { config } from '@repo/config';
import { Redis } from 'ioredis';
import { SessionOptions } from 'express-session';

const redisStore = new RedisStore({ client: new Redis(config.redisOptions) });

const sessionConfig: SessionOptions = {
  store: redisStore,
  ...config.sessionOptions,
};

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(cookieParser());
  app.use(session(sessionConfig));
  // app.useGlobalPipes(new ValidationPipe());
  app.use(passport.initialize());
  app.use(passport.session());
  app.useGlobalFilters(new RpcExceptionFilter());

  // Service method middleware setup
  // const reflector = app.get(Reflector);
  // app.useGlobalInterceptors(new ServiceMethodInterceptor(reflector, gateS));

  await app.listen(3033);
}
bootstrap();
