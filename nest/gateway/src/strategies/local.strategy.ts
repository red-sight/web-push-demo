import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { VerifyCallback } from 'passport-google-oauth20';

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
    const user = await this.authService.validateUserLocal({ email, password });
    done(null, user);
  }
}
