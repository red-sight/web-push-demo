import { Controller, Get, Inject, Param } from '@nestjs/common';
import { AppService } from './app.service';
import { ClientProxy } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @Inject('MICROSERVICE') private readonly client: ClientProxy,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/hello_from_microservice/:name')
  getHelloFromMicroservice(@Param('name') name: string) {
    return this.client.send({ cmd: 'hi_from_microservice' }, name);
  }
}
