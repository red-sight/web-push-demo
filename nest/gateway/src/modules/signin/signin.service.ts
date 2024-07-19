import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { SigninLocalDto } from '@repo/dtos';
import { EMessagePattern } from '@repo/types';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class SigninService {
  constructor(@Inject('AUTHSERVICE') private client: ClientProxy) {}

  async validateUserLocal(signinLocalDto: SigninLocalDto) {
    const res = await firstValueFrom(
      this.client.send({ cmd: EMessagePattern.SIGNIN_LOCAL }, signinLocalDto),
    );
    return res;
  }
}
