import { Prisma } from '@repo/prisma';
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { EPermission } from '@repo/types';
import { PERMISSIONS_KEY } from 'decorators/permission.decorator';

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
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
      user: Prisma.UserGetPayload<{
        include: { Role: { select: { Permissions: true } } };
      }>;
    } = context.switchToHttp().getRequest();
    return requiredPermissions.some((permission) =>
      user.Role.Permissions.map((p) => p.name).includes(permission),
    );
  }
}
