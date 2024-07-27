import { InjectRedis } from '@nestjs-modules/ioredis';
import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import {
  EOtpChannelName,
  EPermission,
  IOtpOptions,
  IUserSessionData,
} from '@repo/types';
import { OTP_KEY } from 'decorators/otp.decorator';
import { PERMISSIONS_KEY } from 'decorators/permission.decorator';
import { Request } from 'express';
import Redis from 'ioredis';
import { OtpService } from 'modules/otp/otp.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    @InjectRedis() private readonly store: Redis,
    private readonly otpService: OtpService,
  ) {}

  async canActivate(context: ExecutionContext) {
    // Check if the user is logged in
    const request: Request = context.switchToHttp().getRequest();
    if (!request.isAuthenticated()) throw new UnauthorizedException();

    // If permissions are assigned, check the user's permissions
    const requiredPermissions = this.reflector.getAllAndOverride<EPermission[]>(
      PERMISSIONS_KEY,
      [context.getHandler(), context.getClass()],
    );
    const {
      user,
    }: {
      user: IUserSessionData;
    } = request;
    if (requiredPermissions) {
      const roles = JSON.parse(await this.store.get('roles'));
      const userPermissions = roles.find(
        ({ name }) => name === user.role,
      )?.permissions;
      if (
        !userPermissions ||
        !requiredPermissions?.some((permission) =>
          userPermissions.find((p: EPermission) => p === permission),
        )
      )
        throw new ForbiddenException();
    }

    // OTP
    const otpDecoratorOptions = this.reflector.getAllAndOverride<
      Partial<IOtpOptions>
    >(OTP_KEY, [context.getHandler(), context.getClass()]);
    if (otpDecoratorOptions) {
      const otpOptions: IOtpOptions = {
        request: {
          headers: request.headers,
          query: request.query,
          body: request.body,
        },
        channelName: EOtpChannelName.EMAIL,
        availableChannels: user.availableOtpChannels,
        ...otpDecoratorOptions,
      };

      const otpRes = await this.otpService.send(otpOptions);
      throw new UnauthorizedException(otpRes);
    }
    return true;
  }
}
