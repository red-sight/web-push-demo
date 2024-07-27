import { Injectable } from '@nestjs/common';
import { ISendMailOptions, MailerService } from '@nestjs-modules/mailer';
import { config } from '@repo/config';

interface ISendOptions extends ISendMailOptions {}

@Injectable()
export class AppService {
  constructor(private readonly mailerService: MailerService) {}

  public async sendEmailConfirmationEmail(email: string) {
    try {
      const res = await this.mailerService.sendMail({
        to: email,
        from: config.emailUser,
        subject: 'Verify your email addess',
        template: 'verify-email',
        context: {
          link: 'https://google.com',
        },
      });
      return res;
    } catch (error) {
      console.error(error);
    }
  }

  public async send({ ...mailerOptions }: ISendOptions) {
    return await this.mailerService.sendMail(mailerOptions);
  }
}
