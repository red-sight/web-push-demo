import { PrismaService } from 'prisma.service';
import { Module, OnApplicationBootstrap } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RedisModule } from '@nestjs-modules/ioredis';
import { config } from '@repo/config';

@Module({
  imports: [
    RedisModule.forRootAsync({
      useFactory: () => ({
        type: 'single',
        options: config.redisOptions,
      }),
    }),
  ],
  providers: [PrismaService, RolesService],
})
export class RolesModule implements OnApplicationBootstrap {
  constructor(private readonly rolesService: RolesService) {}

  async onApplicationBootstrap() {
    await this.rolesService.loadRolesPermissionsToStore();
  }
}
