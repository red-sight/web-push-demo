import { Request } from "express";
import { IUserSessionData } from "interfaces";

export type IServiceRequest = Pick<
  Request,
  "headers" | "method" | "url" | "query" | "params" | "body"
>;

export interface IServiceMethodData {
  body: any;
  request: IServiceRequest;
  user?: IUserSessionData;
}
