import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { SendPushNotificationDto } from './dtos/send-push-notification.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/get_public_vapid_key')
  getPublicKey() {
    const publicKey = this.appService.getPublicVapidKey();
    return { publicKey };
  }

  @Get('/generate_vapid_keys')
  generateVapidKeys() {
    return this.appService.generateVapidKeys();
  }

  @Post('/send')
  async send(@Body() data: SendPushNotificationDto) {
    await this.appService.sendPushNotification(data);
    return { message: 'success' };
  }
}
