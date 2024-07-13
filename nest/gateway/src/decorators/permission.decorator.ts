import { SetMetadata } from '@nestjs/common';
import { EPermission } from '@repo/types';

export const PERMISSIONS_KEY = 'permissions';
export const Permissions = (...permissions: EPermission[]) =>
  SetMetadata(PERMISSIONS_KEY, permissions);
