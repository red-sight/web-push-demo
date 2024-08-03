import { InjectRedis } from '@nestjs-modules/ioredis';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { randomUUID } from 'node:crypto';
import Redis from 'ioredis';
import * as webPush from 'web-push';
import { PushSubscriptionDto } from './dtos/subscription.dto';
import { SendPushNotificationDto } from './dtos/send-push-notification.dto';

type WebPushType = typeof webPush;
@Injectable()
export class AppService {
  constructor(
    private configService: ConfigService,
    @Inject('WEB_PUSH') private readonly webPush: WebPushType,
    @InjectRedis() private readonly redis: Redis,
  ) {}

  async getPublicVapidKey() {
    return this.configService.get<string>('VAPID_PUBLIC_KEY');
  }

  async generateVapidKeys() {
    return this.webPush.generateVAPIDKeys();
  }

  async subscribe(subscription: PushSubscriptionDto) {
    const key = randomUUID();
    await this.redis.set(key, JSON.stringify(subscription));
    return key;
  }

  async sendPushNotification({ key, notification }: SendPushNotificationDto) {
    const subscriptionStr = await this.redis.get(key);
    if (!subscriptionStr)
      throw new NotFoundException('Subscription is not found or outdated');
    const subscription = JSON.parse(subscriptionStr);
    await this.webPush.sendNotification(
      subscription,
      JSON.stringify(notification),
    );
  }
}
