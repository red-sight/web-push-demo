import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@repo/prisma';
import { PrismaService } from './prisma.service';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  userAdd(data: Prisma.UserCreateInput): Promise<User> {
    return this.prisma.user.create({ data });
  }
}
