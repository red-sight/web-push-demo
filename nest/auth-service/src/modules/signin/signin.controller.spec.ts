import { Test, TestingModule } from '@nestjs/testing';
import { SigninController } from './signin.controller';
import { SigninService } from './signin.service';
import { SigninLocalDto } from '@repo/dtos';

describe('SigninController', () => {
  let controller: SigninController;
  let service: SigninService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SigninController],
      providers: [
        {
          provide: SigninService,
          useValue: {
            signinLocal: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<SigninController>(SigninController);
    service = module.get<SigninService>(SigninService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('signinLocal', () => {
    it('should call signinService.signinLocal with the correct dto', async () => {
      const signinLocalDto: SigninLocalDto = {
        email: 'test@example.com',
        password: 'testpassword',
      };

      const result = {
        accessToken: 'testtoken',
      };

      (service.signinLocal as jest.Mock).mockResolvedValue(result);

      expect(await controller.signinLocal(signinLocalDto)).toBe(result);
      expect(service.signinLocal).toHaveBeenCalledWith(signinLocalDto);
    });
  });
});
