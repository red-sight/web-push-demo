import {
  Controller,
  Post,
  Req,
  // Res,
  // UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import {
  Request,
  // Response
} from 'express';
import { PassportLocalGuard } from 'guards/passport-local.guard';
// import { config } from '@repo/config';

@Controller('/signin')
export class SigninController {
  constructor() {}

  @Post('/local')
  @UseGuards(PassportLocalGuard)
  async signinLocal(
    @Req() req: Request,
    // @Res({ passthrough: true }) res: Response,
  ) {
    // if (!('id' in req.user)) throw new UnauthorizedException();
    // const refreshTokenKey = await this.authService.provideRefreshToken({
    //   userId: req.user.id as string,
    // });
    // res.cookie('refreshToken', refreshTokenKey, {
    //   maxAge: config.sessionRefreshTokenTTL,
    //   httpOnly: true,
    // });
    return req.user;
  }
}
