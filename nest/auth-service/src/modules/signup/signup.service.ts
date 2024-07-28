import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { config } from '@repo/config';
import { SignupLocalDto } from '@repo/dtos';
import { EMessagePattern, ERole } from '@repo/types';
import { PrismaService } from 'prisma.service';
import { lastValueFrom, timeout } from 'rxjs';
import { Password } from 'utils/Password';

@Injectable()
export class SignupService {
  constructor(
    @Inject('MAILSERVICE') private mailServiceClient: ClientProxy,
    private prisma: PrismaService,
  ) {}

  async signupLocal({ email, password }: SignupLocalDto) {
    const authMethodExists = await this.prisma.localAuth.findUnique({
      where: { email },
      include: { authMethod: true },
    });
    if (authMethodExists)
      throw new RpcException({
        statusCode: 400,
        message: 'This email is already in use',
      });

    const passwordInstance = new Password({ password });
    await this.prisma.$transaction(async (tx) => {
      await tx.profile.create({
        data: {
          roleName: ERole.CUSTOMER,
          authMethods: {
            create: [
              {
                localAuth: {
                  create: {
                    email,
                    password: passwordInstance.hash,
                    salt: passwordInstance.salt,
                  },
                },
              },
            ],
          },
        },
        include: {
          authMethods: {
            include: {
              localAuth: true,
            },
          },
        },
      });
      await lastValueFrom(
        this.mailServiceClient
          .send({ cmd: EMessagePattern.SEND_EMAIL_CONFIRMATION }, email)
          .pipe(timeout(config.serviceMethodTimeout)),
      );
    });

    // const existingUser = await this.prisma.user.findUnique({
    //   where: { email },
    // });
    // if (existingUser)
    //   throw new RpcException({
    //     statusCode: 400,
    //     message: 'The user is already registered',
    //   });
    // const passwordInstance = new Password({ password });

    // const createdUser = await this.prisma.$transaction(async (tx) => {
    //   const user = await tx.user.create({
    //     data: {
    //       email,
    //       password: passwordInstance.hash,
    //       salt: passwordInstance.salt,
    //       roleName: ERole.CUSTOMER,
    //     },
    //     include: {
    //       Role: {
    //         include: {
    //           Permissions: true,
    //         },
    //       },
    //     },
    //   });
    //   await firstValueFrom(
    //     this.mailServiceClient
    //       .send({ cmd: EMessagePattern.SEND_EMAIL_CONFIRMATION }, email)
    //       .pipe(timeout(5000)),
    //   );
    //   return user;
    // });
    // return createdUser;
  }
}
