import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { SignupLocalDto } from '@repo/dtos';
import { EMessagePattern } from '@repo/types';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class SignupService {
  constructor(@Inject('MICROSERVICE') private client: ClientProxy) {}

  async signupLocal(signupLocalDto: SignupLocalDto) {
    const res = await firstValueFrom(
      this.client.send({ cmd: EMessagePattern.SIGNUP_LOCAL }, signupLocalDto),
    );
    return res;
  }
}
