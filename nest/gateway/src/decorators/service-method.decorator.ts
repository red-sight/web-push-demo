import { SetMetadata } from '@nestjs/common';
import { IServiceMethodOptions } from 'types';

export const SERVICE_METHOD_KEY = 'service-method';
export const ServiceMethod = (
  cmd: string,
  serviceMethodOptions: IServiceMethodOptions = {},
) => SetMetadata(SERVICE_METHOD_KEY, { cmd, options: serviceMethodOptions });
