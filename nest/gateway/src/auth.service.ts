import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AuthService {
  constructor(@Inject('AUTHSERVICE') private client: ClientProxy) {}

  onLogin(data) {
    return firstValueFrom(this.client.send({ cmd: 'google-login' }, data));
  }
}
