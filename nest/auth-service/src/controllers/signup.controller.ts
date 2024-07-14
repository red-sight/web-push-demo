import { MessagePattern } from '@nestjs/microservices';
import { Controller } from '@nestjs/common';
import { SignupLocalDto } from '@repo/dtos';
import { SignupService } from 'services/signup.service';
import { EMessagePattern } from '@repo/types';

@Controller()
export class SignupController {
  constructor(private readonly signupService: SignupService) {}

  @MessagePattern({ cmd: EMessagePattern.SIGNUP_LOCAL })
  async signupLocal(signupLocalDto: SignupLocalDto) {
    return await this.signupService.signupLocal(signupLocalDto);
  }
}
