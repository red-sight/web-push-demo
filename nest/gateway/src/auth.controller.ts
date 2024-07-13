import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { GoogleAuthGuard } from './guards/google.guard';
import { AuthService } from 'auth.service';
import { Request } from 'express';

@Controller('/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('/google/login')
  @UseGuards(GoogleAuthGuard)
  async googleLogin(@Req() req: Request) {
    return req.body;
  }

  @Get('/google/redirect')
  @UseGuards(GoogleAuthGuard)
  async googleRedirect(@Req() req: Request) {
    return this.authService.onLogin(req.user);
  }
}
