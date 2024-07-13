import { Injectable } from '@nestjs/common';
import { User } from '@repo/prisma';
import { PrismaService } from './prisma.service';
import { IGoogleUserProfile } from '@repo/types';

@Injectable()
export class GoogleService {
  constructor(private prisma: PrismaService) {}

  async onUserLogin({ email }: IGoogleUserProfile): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: { email },
      include: {
        Role: {
          include: {
            Permissions: true,
          },
        },
      },
    });
    return user;
  }
}
