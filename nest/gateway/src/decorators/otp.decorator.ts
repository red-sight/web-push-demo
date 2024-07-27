import { SetMetadata } from '@nestjs/common';
import { IOtpOptions } from '@repo/types';

export const OTP_KEY = 'otp';
export const Otp = (options: Partial<IOtpOptions> = {}) =>
  SetMetadata(OTP_KEY, options);
