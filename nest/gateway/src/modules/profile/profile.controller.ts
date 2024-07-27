import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { AuthGuard } from 'guards/auth.guard';

@Controller('profile')
@UseGuards(AuthGuard)
export class ProfileController {
  constructor() {}

  @Get('/my')
  async myProfile(@Req() req: Request) {
    return req.user;
  }

  @Get('/secret')
  // @Otp()
  @UseGuards(AuthGuard)
  async getSecret() {
    return { static: 'very secret data' };
  }

  // @Post('/transfer')
  // @Permissions([])
  // @ServiceMethod({
  //   messagePattern: 'bankbridge-service:transfer'
  //   otp: {}
  // })
  // async transfer(@Body() body: TransferBodyDto) {}

  /*
  403 
  {
    message: 'OTP required',
    expiredIn: TimestampTz,
    availableChannels: [
      {
        channelName: 'email',
        to: 'som***@email.com',
        blockedUntil: TimestampTz <= store.ttl(channelName:to)
      }
    ]
  }


  store Otp
  otp:6640e7b0-37a3-4f37-8e1c-a381cca21927

  store block channel
  sms:+79272223344

  totp:secrethkfjhwg87649

  */
}
