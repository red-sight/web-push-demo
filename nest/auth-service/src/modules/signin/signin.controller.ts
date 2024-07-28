import { MessagePattern } from '@nestjs/microservices';
import { Controller } from '@nestjs/common';
import { SigninService } from './signin.service';
import { EMessagePattern } from '@repo/types';
import { SigninLocalAuthDto } from 'dtos/signin-local.dto';

@Controller()
export class SigninController {
  constructor(private readonly signinService: SigninService) {}

  @MessagePattern({ cmd: EMessagePattern.SIGNIN_LOCAL })
  async signinLocal({ body }: SigninLocalAuthDto) {
    return await this.signinService.signinLocal(body);
  }
}
