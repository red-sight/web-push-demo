import { firstValueFrom } from 'rxjs';
import { OtpChannel } from './otp-channel';
import { ClientProxy } from '@nestjs/microservices';
import {
  EMessagePattern,
  EOtpChannelName,
  ISendOtpEmailOptions,
} from '@repo/types';

interface IOtpEmailSendOptions {
  to: string;
  code: string;
  templateData: any;
}

export class EmailOtpChannel extends OtpChannel {
  channelName = EOtpChannelName.EMAIL;
  mailService: ClientProxy;

  constructor({ mailService }: { mailService: ClientProxy }) {
    super();
    this.mailService = mailService;
  }

  public async send({ to, code, templateData }: IOtpEmailSendOptions) {
    return await firstValueFrom(
      this.mailService.send({ cmd: EMessagePattern.SIGNUP_LOCAL }, {
        to,
        context: {
          code,
          ...templateData,
        },
      } as ISendOtpEmailOptions),
    );
  }
}
