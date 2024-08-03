import { generateVAPIDKeys } from 'web-push';
import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;

  const appServiceMock = {
    getPublicVapidKey: jest.fn(),
    generateVapidKeys: jest.fn(),
    subscribe: jest.fn(),
  };

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        {
          provide: AppService,
          useValue: appServiceMock,
        },
      ],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should be defined', () => {
      expect(appController).toBeDefined();
    });

    it('get VAPID public key', async () => {
      appServiceMock.getPublicVapidKey.mockImplementation(() => {
        return 'pubKey';
      });
      const res = await appController.getPublicKey();
      expect(appServiceMock.getPublicVapidKey).toHaveBeenCalledTimes(1);
      expect(res).toEqual('pubKey');
    });

    it('generate VAPID keys', async () => {
      const response = {
        publicKey: 'pub_key',
        privateKey: 'priv_key',
      };
      appServiceMock.generateVapidKeys.mockImplementation(() => response);
      const res = await appController.generateVapidKeys();
      expect(res).toEqual(response);
    });

    it('subscribe', async () => {
      const subscription = {
        keys: {
          auth: 'poWkvPbh7ZFCqiOgTfi-mw',
          p256dh:
            'BAYSuJntYbFVxDsvCPJtglwr9aoUwK1NwKZcb1g5VzNPpaS8u66gMp3goykwM5mKTwvsclQeOJgG-jc8iwv5nGM',
        },
        endpoint:
          'https://fcm.googleapis.com/fcm/send/fkVs6IAbhCE:APA91bETbXvMG-tYzP0ngiI_vQ80Mpn-OIMAQ75nqdu2VC-nJmiiEeBk3nXqOxTAAWYD1ZCByHfxAXulrXHoTD6NI8BOxu4XTYwSRVJ88iHE_hPJNdknYepLzTENm7fvsuMS6ic6B4D5',
        expirationTime: null,
      };
      await appController.subscribe({ subscription });
      expect(appServiceMock.subscribe).toHaveBeenCalledWith(subscription);
    });

    it('subscribe: error', async () => {
      const subscription = {
        keys: {
          auth: 'poWkvPbh7ZFCqiOgTfi-mw',
          p256dh:
            'BAYSuJntYbFVxDsvCPJtglwr9aoUwK1NwKZcb1g5VzNPpaS8u66gMp3goykwM5mKTwvsclQeOJgG-jc8iwv5nGM',
        },
        endpoint:
          'https://fcm.googleapis.com/fcm/send/fkVs6IAbhCE:APA91bETbXvMG-tYzP0ngiI_vQ80Mpn-OIMAQ75nqdu2VC-nJmiiEeBk3nXqOxTAAWYD1ZCByHfxAXulrXHoTD6NI8BOxu4XTYwSRVJ88iHE_hPJNdknYepLzTENm7fvsuMS6ic6B4D5',
        expirationTime: null,
      };
      await appController.subscribe({ subscription });
      expect(appServiceMock.subscribe).toHaveBeenCalledWith(subscription);
    });
  });
});
