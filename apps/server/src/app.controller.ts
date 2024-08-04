import { Body, Controller, Get, Post } from '@nestjs/common';
import { SendPushNotificationDto } from './dtos/send-push-notification.dto';
import { WebPushService } from './web-push/web-push.service';

@Controller()
export class AppController {
  constructor(private readonly webPushService: WebPushService) {}

  @Get('/get_public_vapid_key')
  getPublicKey() {
    const publicKey = this.webPushService.getPublicVapidKey();
    return { publicKey };
  }

  @Get('/generate_vapid_keys')
  generateVapidKeys() {
    return this.webPushService.generateVapidKeys();
  }

  @Post('/send')
  async send(@Body() data: SendPushNotificationDto) {
    await this.webPushService.sendPushNotification(data);
    return { message: 'success' };
  }
}
