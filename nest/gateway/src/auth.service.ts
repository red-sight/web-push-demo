import { InjectRedis } from '@nestjs-modules/ioredis';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { config } from '@repo/config';
import { SigninLocalDto, SignupLocalDto } from '@repo/dtos';
import { EMessagePattern } from '@repo/types';
import Redis from 'ioredis';
import { randomUUID } from 'node:crypto';
import { firstValueFrom } from 'rxjs';
import { IProvideRefreshToken } from 'types';

@Injectable()
export class AuthService {
  constructor(
    @Inject('AUTHSERVICE') private client: ClientProxy,
    @InjectRedis() private readonly store: Redis,
  ) {}

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

  async provideRefreshToken(data: IProvideRefreshToken) {
    const key = randomUUID();
    await this.store.set(
      this.fullRefreshTokenKey(key, data.userId),
      JSON.stringify(data),
      'PX',
      config.sessionRefreshTokenTTL,
    );
    return key;
  }

  private fullRefreshTokenKey(key: string, userId: string) {
    return `refresh-token:${userId}:${key}`;
  }
}
