import { config } from '@repo/config';
import { EOtpChannelName } from '@repo/types';

export abstract class OtpChannel {
  channelName: EOtpChannelName;
  resendBlockTTL = config.otpResendBlockTTL;
  withOtpCode = true;

  constructor() {}

  abstract send?(data: any): Promise<void>;

  verify?(data: any): Promise<void>;
}
