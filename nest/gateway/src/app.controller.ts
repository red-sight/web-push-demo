import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { Request } from 'express';
import { AuthGuard } from 'guards/auth.guard';
// import { Permissions } from 'decorators/permission.decorator';
// import { EPermission } from '@repo/types';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/profile')
  // @Permissions(EPermission.ROOT)
  @UseGuards(AuthGuard)
  getOwnProfile(@Req() request: Request) {
    return request.user;
  }
}
