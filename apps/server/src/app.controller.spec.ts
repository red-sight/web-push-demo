import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { WebPushService } from './web-push/web-push.service';

describe('AppController', () => {
  let appController: AppController;

  const webPushServiceMock = {
    getPublicVapidKey: jest.fn(),
    generateVapidKeys: jest.fn(),
    subscribe: jest.fn(),
  };

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        {
          provide: WebPushService,
          useValue: webPushServiceMock,
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
      webPushServiceMock.getPublicVapidKey.mockImplementation(() => {
        return 'pubKey';
      });
      const res = appController.getPublicKey();
      expect(webPushServiceMock.getPublicVapidKey).toHaveBeenCalledTimes(1);
      expect(res).toEqual({ publicKey: 'pubKey' });
    });

    it('generate VAPID keys', () => {
      const response = {
        publicKey: 'pub_key',
        privateKey: 'priv_key',
      };
      webPushServiceMock.generateVapidKeys.mockImplementation(() => response);
      const res = appController.generateVapidKeys();
      expect(res).toEqual(response);
    });
  });
});
