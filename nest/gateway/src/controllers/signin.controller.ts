import { Controller, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { LocalAuthGuard } from 'guards/signin.local.guard';

@Controller('/signin')
export class SigninController {
  constructor() {}

  @Post('/local')
  @UseGuards(LocalAuthGuard)
  async signinLocal(@Req() req: Request) {
    return req.user;
  }
}
