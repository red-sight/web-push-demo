import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { VerifyCallback } from 'passport-google-oauth20';
import {
  EOtpChannelName,
  ERole,
  IAvailableOtpChannel,
  IUserSessionData,
} from '@repo/types';
import { SigninService } from '../modules/signin/signin.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private signinService: SigninService) {
    super({
      usernameField: 'email', // If 'usernameField' is not specified, it defaults to 'username'
      passwordField: 'password',
    });
  }

  async validate(
    email: string,
    password: string,
    done: VerifyCallback,
  ): Promise<any> {
    const user: {
      id: string;
      Role: { name: ERole };
    } = await this.signinService.validateUserLocal({ email, password });
    const availableOtpChannels: IAvailableOtpChannel[] = [];

    if (email)
      availableOtpChannels.push({
        channelName: EOtpChannelName.EMAIL,
        to: email,
      });

    const userSessionData: IUserSessionData = {
      id: user.id,
      role: user.Role.name,
      availableOtpChannels,
    };
    done(null, userSessionData);
  }
}
