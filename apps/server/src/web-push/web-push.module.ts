import { Module, Global } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as webPush from 'web-push';

@Global()
@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: 'WEB_PUSH',
      useValue: webPush,
    },
  ],
  exports: ['WEB_PUSH'],
})
export class WebPushModule {
  constructor(private configService: ConfigService) {
    const publicKey = this.configService.get<string>('VAPID_PUBLIC_KEY');
    const privateKey = this.configService.get<string>('VAPID_PRIVATE_KEY');
    webPush.setVapidDetails(
      'mailto:malahov.dmitry@gmail.com',
      publicKey,
      privateKey,
    );
  }
}
