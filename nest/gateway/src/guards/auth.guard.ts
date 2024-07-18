import { InjectRedis } from '@nestjs-modules/ioredis';
import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { EPermission } from '@repo/types';
import { PERMISSIONS_KEY } from 'decorators/permission.decorator';
import Redis from 'ioredis';
import { IUserSessionData } from 'types/user-session-data.interface';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    @InjectRedis() private readonly store: Redis,
  ) {}

  async canActivate(context: ExecutionContext) {
    // Check if the user is logged in
    const request = context.switchToHttp().getRequest();
    if (!request.isAuthenticated()) throw new UnauthorizedException();

    // If permissions are assigned, check the user's permissions
    const requiredPermissions = this.reflector.getAllAndOverride<EPermission[]>(
      PERMISSIONS_KEY,
      [context.getHandler(), context.getClass()],
    );
    if (!requiredPermissions) {
      return true;
    }

    const {
      user,
    }: {
      user: IUserSessionData;
    } = context.switchToHttp().getRequest();

    const roles = JSON.parse(await this.store.get('roles'));
    const userPermissions = roles.find(
      ({ name }) => name === user.role,
    )?.permissions;
    if (
      !userPermissions ||
      !requiredPermissions.some((permission) =>
        userPermissions.find((p: EPermission) => p === permission),
      )
    )
      throw new ForbiddenException();

    return true;
  }
}
