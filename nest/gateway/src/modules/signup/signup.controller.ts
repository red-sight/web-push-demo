import { Body, Controller, Post } from '@nestjs/common';
import { SignupLocalDto } from '@repo/dtos';
import { SignupService } from './signup.service';

@Controller('/signup')
export class SignupController {
  constructor(private readonly signupService: SignupService) {}

  @Post('/local')
  async signupLocal(@Body() signupLocalDto: SignupLocalDto) {
    return await this.signupService.signupLocal(signupLocalDto);
  }
}
