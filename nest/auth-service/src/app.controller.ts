// import { MessagePattern } from '@nestjs/microservices';
import { Controller } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // @MessagePattern({ cmd: 'user-add' })
  // userAdd(email: string) {
  //   return this.appService.userAdd({ email });
  // }
}
