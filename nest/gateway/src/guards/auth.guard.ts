import { InjectRedis } from '@nestjs-modules/ioredis';
import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { EPermission, IUserSessionData } from '@repo/types';
import { PERMISSIONS_KEY } from 'decorators/permission.decorator';
import { Request } from 'express';
import Redis from 'ioredis';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    @InjectRedis() private readonly store: Redis,
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

    return true;
  }
}
