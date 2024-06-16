import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class AppService {
  constructor(@Inject('MICROSERVICE') private client: ClientProxy) {}

  getHello(): string {
    return 'Hello World!';
  }

  userAdd(name: string) {
    return this.client.send({ cmd: 'user-add' }, name);
  }
}
