import { Test, TestingModule } from '@nestjs/testing';
import { WebPushService } from './web-push.service';
import { ConfigService } from '@nestjs/config';
import { setVapidDetails, VapidKeys } from 'web-push';

describe('WebPushService', () => {
  let service: WebPushService;

  const webPushMock = {
    setVapidDetails: jest.fn(),
    generateVAPIDKeys: jest.fn(),
    sendNotification: jest.fn(),
  };

  const configMock = {
    get: jest.fn(),
  };
  const keys: VapidKeys = {
    privateKey: 'Private key',
    publicKey: 'Public key',
  };
  beforeEach(async () => {
    configMock.get.mockImplementation(() => 'true');
    webPushMock.generateVAPIDKeys.mockImplementation(() => keys);

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        WebPushService,
        { provide: ConfigService, useValue: configMock },
        {
          provide: 'WEB_PUSH',
          useValue: webPushMock,
        },
      ],
    }).compile();

    service = module.get<WebPushService>(WebPushService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('generate vapid keys', () => {
    const res = service.generateVapidKeys();
    expect(webPushMock.generateVAPIDKeys).toHaveBeenCalledTimes(1);
    expect(res).toEqual(keys);
  });

  it('send push notification', async () => {
    const subscription = {
      endpoint: 'https://google.com',
      keys: {
        auth: 'auth',
        p256dh: 'p256dh',
      },
    };
    const notification = {
      title: 'Test notification',
    };
    await service.sendPushNotification({ subscription, notification });
    expect(webPushMock.sendNotification).toHaveBeenCalledWith(
      subscription,
      JSON.stringify(notification),
    );
  });
});
