import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { SigninLocalDto, SignupLocalDto } from '@repo/dtos';
import { EMessagePattern } from '@repo/types';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AuthService {
  constructor(@Inject('AUTHSERVICE') private client: ClientProxy) {}

  onLogin(data) {
    return firstValueFrom(this.client.send({ cmd: 'google-login' }, data));
  }

  async validateUserLocal(signinLocalDto: SigninLocalDto) {
    const res = await firstValueFrom(
      this.client.send({ cmd: EMessagePattern.SIGNIN_LOCAL }, signinLocalDto),
    );
    return res;
  }

  async signupLocal(signupLocalDto: SignupLocalDto) {
    const res = await firstValueFrom(
      this.client.send({ cmd: EMessagePattern.SIGNUP_LOCAL }, signupLocalDto),
    );
    return res;
  }
}
