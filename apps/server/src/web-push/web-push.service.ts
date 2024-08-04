import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { throwIfEmpty } from 'rxjs';
import { SendPushNotificationDto } from 'src/dtos/send-push-notification.dto';
import * as webPush from 'web-push';

type WebPushType = typeof webPush;

@Injectable()
export class WebPushService {
  publicKey: string;

  constructor(
    private configService: ConfigService,
    @Inject('WEB_PUSH') private readonly webPush: WebPushType,
  ) {
    const publicKey = this.configService.get<string>('VAPID_PUBLIC_KEY');
    const privateKey = this.configService.get<string>('VAPID_PRIVATE_KEY');

    if (!publicKey || !privateKey) {
      const keys = this.generateVapidKeys();
      throw new Error(`No VAPID keys are found in environment. Please save these new keys and provide to the environment:
VAPID_PUBLIC_KEY='${keys.publicKey}'
VAPID_PRIVATE_KEY='${keys.privateKey}'  
      `);
    }

    webPush.setVapidDetails(
      'mailto:malahov.dmitry@gmail.com',
      publicKey,
      privateKey,
    );
  }

  generateVapidKeys() {
    return this.webPush.generateVAPIDKeys();
  }

  getPublicVapidKey() {
    return this.publicKey;
  }

  async sendPushNotification({
    notification,
    subscription,
  }: SendPushNotificationDto) {
    await this.webPush.sendNotification(
      subscription,
      JSON.stringify(notification),
    );
  }
}
