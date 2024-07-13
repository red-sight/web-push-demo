import { Controller, Get, Req } from '@nestjs/common';
import { AppService } from './app.service';
import { Request } from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  // @Get('/:name')
  // userAdd(@Param('name') name: string) {
  //   return this.appService.userAdd(name);
  // }

  @Get('/profile')
  // @Permissions(EPermission.ROOT)
  // @UseGuards(PermissionsGuard)
  getOwnProfile(@Req() request: Request) {
    return request.user;
  }
}
