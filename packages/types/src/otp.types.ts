import { IncomingHttpHeaders } from 'http';
import { ParsedQs } from 'qs';

export enum EOtpChannelName {
  EMAIL = 'email',
  SMS = 'sms',
  TOTP = 'totp',
  WEBAUTHN = 'webauthn',
}

export interface IAvailableOtpChannel {
  channelName: EOtpChannelName;
  to: string;
  blockedUntil?: null | Date;
}

export interface IOtpOptions {
  request: {
    headers?: IncomingHttpHeaders;
    query?: ParsedQs;
    body: any;
  };
  channelName: EOtpChannelName;
  template?: string;
  templateData?: any;
  token?: string;
  otpSessionTTL?: number;
  availableChannels: IAvailableOtpChannel[];
}
