import { Test, TestingModule } from '@nestjs/testing';
import { RolesService } from './roles.service';
import { PrismaService } from '../../prisma.service'; // Adjust the import path according to your project structure
import Redis from 'ioredis';

const REDIS_TOKEN = 'default_IORedisModuleConnectionToken';

describe('RolesService', () => {
  let service: RolesService;
  let prismaService: PrismaService;
  let redisClient: Redis;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RolesService,
        {
          provide: PrismaService,
          useValue: {
            role: {
              findMany: jest.fn(),
            },
          },
        },
        {
          provide: REDIS_TOKEN,
          useValue: {
            set: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<RolesService>(RolesService);
    prismaService = module.get<PrismaService>(PrismaService);
    redisClient = module.get<Redis>(REDIS_TOKEN);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('loadRolesPermissionsToStore', () => {
    it('should load roles and permissions into Redis store', async () => {
      const roles = [
        {
          name: 'admin',
          Permissions: [{ name: 'create' }, { name: 'delete' }],
        },
        {
          name: 'user',
          Permissions: [{ name: 'read' }],
        },
      ];

      const expectedMappedRoles = [
        {
          name: 'admin',
          permissions: ['create', 'delete'],
        },
        {
          name: 'user',
          permissions: ['read'],
        },
      ];

      (prismaService.role.findMany as jest.Mock).mockResolvedValue(roles);
      (redisClient.set as jest.Mock).mockResolvedValue('OK');

      const result = await service.loadRolesPermissionsToStore();

      expect(prismaService.role.findMany).toHaveBeenCalled();
      expect(redisClient.set).toHaveBeenCalledWith(
        'roles',
        JSON.stringify(expectedMappedRoles),
      );
      expect(result).toEqual(expectedMappedRoles);
    });
  });
});
