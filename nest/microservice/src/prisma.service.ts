import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@repo/prisma';

@Injectable()
export class PrismaService extends PrismaClient {}
