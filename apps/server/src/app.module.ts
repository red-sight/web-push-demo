import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WebPushModule } from './web-push/web-push.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), WebPushModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
