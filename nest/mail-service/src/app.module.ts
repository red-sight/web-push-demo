import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { PugAdapter } from '@nestjs-modules/mailer/dist/adapters/pug.adapter';
import { config } from '@repo/config';
import { join } from 'path';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: config.emailTransporter,
      defaults: {
        from: config.emailUser,
      },
      template: {
        dir: join(__dirname, './../templates'),
        adapter: new PugAdapter(),
        options: {
          strict: true,
        },
      },
      verifyTransporters: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
