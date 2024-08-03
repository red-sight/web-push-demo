import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as webPush from 'web-push';
import { SendPushNotificationDto } from './dtos/send-push-notification.dto';

type WebPushType = typeof webPush;
@Injectable()
export class AppService {
  publicKey: string;

  constructor(
    private configService: ConfigService,
    @Inject('WEB_PUSH') private readonly webPush: WebPushType,
  ) {
    this.publicKey = this.configService.get<string>('VAPID_PUBLIC_KEY');
  }

  getPublicVapidKey() {
    return this.publicKey;
  }

  async generateVapidKeys() {
    return this.webPush.generateVAPIDKeys();
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
