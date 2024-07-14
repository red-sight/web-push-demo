import { Body, Controller, Post } from '@nestjs/common';
import { SignupLocalDto } from '@repo/dtos';
import { AuthService } from 'auth.service';

@Controller('/signup')
export class SignupController {
  constructor(private readonly authService: AuthService) {}

  @Post('/local')
  async signupLocal(@Body() signupLocalDto: SignupLocalDto) {
    return await this.authService.signupLocal(signupLocalDto);
  }
}
