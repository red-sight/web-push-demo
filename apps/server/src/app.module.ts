import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { WebPushModule } from './web-push/web-push.module';
import { ConfigModule } from '@nestjs/config';
import { WebPushService } from './web-push/web-push.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      ignoreEnvFile: process.env.NODE_ENV === 'production',
    }),
    WebPushModule,
  ],
  controllers: [AppController],
  providers: [WebPushService],
})
export class AppModule {}
