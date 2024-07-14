import { Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { SignupLocalDto } from '@repo/dtos';
import { ERole } from '@repo/types';
import { PrismaService } from 'prisma.service';
import { Password } from 'utils/Password';

@Injectable()
export class SignupService {
  constructor(private prisma: PrismaService) {}

  async signupLocal({ email, password }: SignupLocalDto) {
    const existingUser = await this.prisma.user.findUnique({
      where: { email },
      include: {
        Role: {
          include: {
            Permissions: true,
          },
        },
      },
    });
    if (existingUser)
      throw new RpcException({
        statusCode: 400,
        message: 'The user is already registered',
      });
    const passwordInstance = new Password({ password });
    const createdUser = await this.prisma.user.create({
      data: {
        email,
        password: passwordInstance.hash,
        salt: passwordInstance.salt,
        roleName: ERole.CUSTOMER,
      },
    });
    return createdUser;
  }
}
