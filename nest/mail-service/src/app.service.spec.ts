import { Test, TestingModule } from '@nestjs/testing';
import { AppService } from './app.service';
import { MailerService } from '@nestjs-modules/mailer';
import { config } from '@repo/config';

describe('AppService', () => {
  let service: AppService;
  let mailerService: MailerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AppService,
        {
          provide: MailerService,
          useValue: {
            sendMail: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<AppService>(AppService);
    mailerService = module.get<MailerService>(MailerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('sendEmailConfirmationEmail', () => {
    const email = 'test@example.com';

    it('should call mailerService.sendMail with correct parameters', async () => {
      const mockResponse = { messageId: '12345' };
      (mailerService.sendMail as jest.Mock).mockResolvedValue(mockResponse);

      const result = await service.sendEmailConfirmationEmail(email);

      expect(mailerService.sendMail).toHaveBeenCalledWith({
        to: email,
        from: config.emailUser,
        subject: 'Verify your email addess',
        template: 'verify-email',
        context: {
          link: 'https://google.com',
        },
      });
      expect(result).toEqual(mockResponse);
    });

    it('should handle errors gracefully', async () => {
      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
      const mockError = new Error('Test Error');
      (mailerService.sendMail as jest.Mock).mockRejectedValue(mockError);

      await service.sendEmailConfirmationEmail(email);

      expect(consoleErrorSpy).toHaveBeenCalledWith(mockError);
      consoleErrorSpy.mockRestore();
    });
  });
});
