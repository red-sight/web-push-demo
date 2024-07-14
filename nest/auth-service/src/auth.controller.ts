import { MessagePattern } from '@nestjs/microservices';
import { Controller } from '@nestjs/common';
import { AuthService } from 'auth.service';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @MessagePattern({ cmd: 'user-add' })
  async userAdd(data: { email: string; roleName: string }) {
    return await this.authService.userAdd(data);
  }
}
