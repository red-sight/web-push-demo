import { Request } from 'express';

export interface AppRequest extends Request {
  serviceMethodOptions?: IServiceMethodOptions;
}

export interface IServiceMethodOptions {
  authorized?: boolean;
}
