import { IGoogleUserProfile } from '@repo/types';
import { MessagePattern } from '@nestjs/microservices';
import { Controller } from '@nestjs/common';
import { GoogleService } from 'google.service';

@Controller()
export class GoogleController {
  constructor(private readonly googleService: GoogleService) {}

  @MessagePattern({ cmd: 'google-login' })
  googleLogin(data: IGoogleUserProfile) {
    return this.googleService.onUserLogin(data);
  }
}
