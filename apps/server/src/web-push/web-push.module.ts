import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { WebPushService } from './web-push.service';
import * as webPush from 'web-push';

@Global()
@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: 'WEB_PUSH',
      useValue: webPush,
    },
    WebPushService,
  ],
  exports: ['WEB_PUSH', WebPushService],
})
export class WebPushModule {}
