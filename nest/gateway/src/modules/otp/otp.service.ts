import { Inject, Injectable } from '@nestjs/common';
import { InjectRedis } from '@nestjs-modules/ioredis';
import Redis from 'ioredis';
import { EmailOtpChannel } from './channels/email-otp-channel';
import { randomInt, randomUUID } from 'node:crypto';
import { OtpChannel } from './channels/otp-channel';
import { ClientProxy } from '@nestjs/microservices';
import { config } from '@repo/config';
import {
  EOtpChannelName,
  IAvailableOtpChannel,
  IOtpOptions,
} from '@repo/types';

/* 
ENTITIES ===================
- Channel - transporter class 
  - send()
  - verify()


- Recipient
  - to = "some@email.com", "+7 917 677 1222", "gauthsecret"
  - channelName = "email", "sms", "totp", "webauthn"
  - blockedUntil = DateTime or null

- OTP stored recipient block
  - key "otp-block:{{recipient.to}}"

- OTP stored data
  - key "otp:{{token}}"
  - values:
      - resolution data: request body, headers, query
      - code
      - channelName
      - template
      - templateData

SEND =======================

- Input
    - channelName = 'email'
    - recipientTo = "some@email.com"
    - data = resolution data
    - template
    - templateData

- Output
    - token
    - expiresAt
    - channelName
    - Recipients

    
RESEND ======================
- Input:
    - token
    - channelName

- Output:
    - same as for send    
*/

@Injectable()
export class OtpService {
  private otpChannels: OtpChannel[];

  constructor(
    @InjectRedis() private readonly store: Redis,
    @Inject('MAILSERVICE') private mailService: ClientProxy,
  ) {
    this.otpChannels = [new EmailOtpChannel({ mailService: this.mailService })];
  }

  /* public async send(data: IOtpOptions) {
    const { availableChannels, channelName } = data;
    await this.updateChannelsAvailability(availableChannels);

    const availableChannel = availableChannels.find(
      (channel) => channel.channelName === channelName,
    );
    if (!availableChannel)
      throw new Error(`Channel ${channelName} is not available for the user`);

    const channel = this.getChannelByName(channelName);
    if (!channel) throw new Error(`Channel ${channelName} does not exist`);
    const isBlocked = await this.isToBlocked(availableChannel.to);
    if (isBlocked)
      throw new Error(
        `OTP is blocked for your ${channelName} channel until ${isBlocked}`,
      );

    const channelResponse = await channel.send({
      to: availableChannel.to,
    });

    const token = randomUUID();

    if (channel.resendBlockTTL)
      await this.store.set(
        this.getBlockKey(availableChannel.to),
        'true',
        'PX',
        channel.resendBlockTTL,
      );
    await this.store.set(this.getStoreKey(token), JSON.stringify(data));

    console.log('channelResponse', channelResponse);

    return data;
  } */

  public async send({
    request,
    channelName,
    availableChannels,
    otpSessionTTL = config.otpSessionTTL,
  }: IOtpOptions) {
    const token = randomUUID();
    const storeKey = this.getStoreKey(token);
    const code = this.generateOtpCode();

    await this.store.set(
      storeKey,
      JSON.stringify({
        code,
        request,
        availableChannels,
      }),
      'PX',
      otpSessionTTL,
    );

    console.log(
      `Sending OTP message to channel ${channelName} with code ${code}...`,
    );

    return {
      token,
      availableChannels,
    };
  }

  public async resend(data: { token: string; channelName: EOtpChannelName }) {
    console.log(data);
  }

  private getChannelByName(channelName: EOtpChannelName) {
    return this.otpChannels.find(
      (channel) => channel.channelName === channelName,
    );
  }

  private getStoreKey(token: string): string {
    return `otp:${token}`;
  }

  private getBlockKey(to: string): string {
    return `otp-resend-block:${to}`;
  }

  private ttlToDate(ttl: number): null | Date {
    if (ttl <= 0) return null;
    return new Date(Date.now() + ttl * 1000);
  }

  private async isToBlocked(to: string): Promise<null | Date> {
    const key = this.getBlockKey(to);
    const TTL = await this.store.ttl(key);
    if (TTL <= 0) return null;
    return this.ttlToDate(TTL);
  }

  private async updateChannelsAvailability(
    availableChannels?: IAvailableOtpChannel[],
  ): Promise<IAvailableOtpChannel[]> {
    for await (const channel of availableChannels) {
      channel.blockedUntil = await this.isToBlocked(channel.to);
    }
    return availableChannels;
  }

  private generateOtpCode(): number {
    return randomInt(100000, 999999);
  }
}
