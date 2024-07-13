import { IGoogleUserProfile } from '@repo/types';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { config } from '@repo/config';
import { Profile, Strategy, VerifyCallback } from 'passport-google-oauth20';
import { AuthService } from '../auth.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy) {
  constructor(@Inject() private readonly authService: AuthService) {
    super(config.googleOAuthCreds);
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: VerifyCallback,
  ) {
    const { name, emails, photos } = profile;
    const googleUser: IGoogleUserProfile = {
      email: emails[0].value,
      firstName: name.givenName,
      lastName: name.familyName,
      picture: photos[0].value,
      accessToken,
    };
    const user = await this.authService.onLogin(googleUser);
    if (!user) throw new UnauthorizedException();
    done(null, user);
  }
}
