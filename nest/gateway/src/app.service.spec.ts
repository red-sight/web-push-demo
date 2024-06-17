import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {
  ClientProxy,
  ClientsModule,
  ReadPacket,
  WritePacket,
} from '@nestjs/microservices';
import { config } from '@repo/config';
import { firstValueFrom } from 'rxjs';

class TestClient extends ClientProxy {
  async connect(): Promise<any> {
    // console.log('connect');
  }

  async close() {
    // console.log('close');
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async dispatchEvent(packet: ReadPacket<any>): Promise<any> {
    // return console.log('event to dispatch: ', packet);
  }

  publish(
    packet: ReadPacket<any>,
    callback: (packet: WritePacket<any>) => void,
  ) {
    // console.log('message:', packet);

    // In a real-world application, the "callback" function should be executed
    // with payload sent back from the responder. Here, we'll simply simulate (5 seconds delay)
    // that response came through by passing the same "data" as we've originally passed in.
    setTimeout(() => callback({ response: packet.data }), 10);

    return () => {
      // console.log('teardown')
    };
  }
}

describe('AppController', () => {
  let appService: AppService;
  let spy: jest.SpyInstance<
    () => void,
    [packet: ReadPacket<any>, callback: (packet: WritePacket<any>) => void],
    any
  >;

  beforeEach(async () => {
    const microserviceClient = ClientsModule.register([
      {
        ...config.nestMicroserviceClientOptions,
        name: 'MICROSERVICE',
      },
    ]);

    const client = new TestClient();
    spy = jest.spyOn(client, 'publish');

    const app: TestingModule = await Test.createTestingModule({
      imports: [microserviceClient],
      controllers: [AppController],
      providers: [
        AppService,
        {
          provide: 'MICROSERVICE',
          useValue: client,
        },
      ],
    }).compile();

    appService = app.get<AppService>(AppService);
  });

  describe('root', () => {
    it('userAdd service', async () => {
      // const spy = jest.spyOn(client, 'send');
      const res = await firstValueFrom(appService.userAdd('test'));
      expect(spy).toHaveBeenCalledTimes(1);
      expect(res).toEqual('test');
      // expect(spy).toHaveBeenCalledWith({ cmd: 'user-add' }, 'test');
    });
  });
});
