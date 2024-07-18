import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { VerifyCallback } from 'passport-google-oauth20';
import { IUserSessionData } from 'types/user-session-data.interface';
import { ERole } from '@repo/types';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
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
    } = await this.authService.validateUserLocal({ email, password });
    const userSessionData: IUserSessionData = {
      id: user.id,
      role: user.Role.name,
    };
    done(null, userSessionData);
  }
}
