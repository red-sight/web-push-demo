import { MessagePattern } from '@nestjs/microservices';
import { Controller } from '@nestjs/common';
import { EMessagePattern } from '@repo/types';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern({ cmd: EMessagePattern.SEND_EMAIL_CONFIRMATION })
  async verifyEmail(email: string) {
    return await this.appService.sendEmailConfirmationEmail(email);
  }
}
