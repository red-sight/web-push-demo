import { Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { SigninLocalDto } from '@repo/dtos';
import { PrismaService } from 'prisma.service';
import { Password } from 'utils/Password';

@Injectable()
export class SigninService {
  constructor(private prisma: PrismaService) {}

  async signinLocal({ email, password }: SigninLocalDto) {
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

    if (!existingUser) {
      throw new RpcException({ statusCode: 404, message: 'User not found' });
    }
    if (!existingUser.salt)
      throw new RpcException({
        statusCode: 500,
        message: 'Signin with password is not allowed for the user',
      });

    const passwordInstance = new Password({
      password,
      salt: existingUser.salt,
    });

    const passwordMatched = passwordInstance.verify(existingUser.password);
    if (!passwordMatched)
      throw new RpcException({ statusCode: 403, message: 'Unauthorized' });

    return existingUser;
  }
}
