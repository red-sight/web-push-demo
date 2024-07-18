import { MessagePattern } from '@nestjs/microservices';
import { Controller } from '@nestjs/common';
import { SigninLocalDto } from '@repo/dtos';
import { SigninService } from './signin.service';
import { EMessagePattern } from '@repo/types';

@Controller()
export class SigninController {
  constructor(private readonly signinService: SigninService) {}

  @MessagePattern({ cmd: EMessagePattern.SIGNIN_LOCAL })
  async signinLocal(signinLocalDto: SigninLocalDto) {
    return await this.signinService.signinLocal(signinLocalDto);
  }
}
