import { InjectRedis } from '@nestjs-modules/ioredis';
import { Injectable } from '@nestjs/common';
import Redis from 'ioredis';
import { PrismaService } from '../../prisma.service';

@Injectable()
export class RolesService {
  constructor(
    @InjectRedis() private readonly store: Redis,
    private prisma: PrismaService,
  ) {}

  async loadRolesPermissionsToStore() {
    const roles = await this.prisma.role.findMany({
      select: { name: true, Permissions: { select: { name: true } } },
    });
    const mappedRoles = roles.map(({ name, Permissions }) => ({
      name,
      permissions: Permissions.map(({ name }) => name),
    }));
    await this.store.set('roles', JSON.stringify(mappedRoles));
    return mappedRoles;
  }
}
