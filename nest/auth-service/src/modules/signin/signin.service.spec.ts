import { Test, TestingModule } from '@nestjs/testing';
import { SigninService } from './signin.service';
import { PrismaService } from '../../prisma.service';
import { SigninLocalDto } from '@repo/dtos';
import { RpcException } from '@nestjs/microservices';
import { Password } from '../../utils/Password';

jest.mock('../../utils/Password'); // Mock the Password utility

describe('SigninService', () => {
  let service: SigninService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SigninService,
        {
          provide: PrismaService,
          useValue: {
            user: {
              findUnique: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    service = module.get<SigninService>(SigninService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('signinLocal', () => {
    const signinLocalDto: SigninLocalDto = {
      email: 'test@example.com',
      password: 'testpassword',
    };

    it('should throw RpcException if user is not found', async () => {
      (prismaService.user.findUnique as jest.Mock).mockResolvedValue(null);

      await expect(service.signinLocal(signinLocalDto)).rejects.toThrow(
        new RpcException({ statusCode: 404, message: 'User not found' }),
      );
    });

    it('should throw RpcException if user signin with password is not allowed', async () => {
      const existingUser = {
        email: 'test@example.com',
        salt: null,
        password: 'hashedpassword',
        Role: { Permissions: [] },
      };
      (prismaService.user.findUnique as jest.Mock).mockResolvedValue(
        existingUser,
      );

      await expect(service.signinLocal(signinLocalDto)).rejects.toThrow(
        new RpcException({
          statusCode: 500,
          message: 'Signin with password is not allowed for the user',
        }),
      );
    });

    it('should throw RpcException if password does not match', async () => {
      const existingUser = {
        email: 'test@example.com',
        salt: 'somesalt',
        password: 'hashedpassword',
        Role: { Permissions: [] },
      };
      (prismaService.user.findUnique as jest.Mock).mockResolvedValue(
        existingUser,
      );

      (Password.prototype.verify as jest.Mock).mockReturnValue(false);

      await expect(service.signinLocal(signinLocalDto)).rejects.toThrow(
        new RpcException({ statusCode: 403, message: 'Unauthorized' }),
      );
    });

    it('should return the user if password matches', async () => {
      const existingUser = {
        email: 'test@example.com',
        salt: 'somesalt',
        password: 'hashedpassword',
        Role: { Permissions: [] },
      };
      (prismaService.user.findUnique as jest.Mock).mockResolvedValue(
        existingUser,
      );

      (Password.prototype.verify as jest.Mock).mockReturnValue(true);

      const result = await service.signinLocal(signinLocalDto);

      expect(result).toEqual(existingUser);
    });
  });
});
