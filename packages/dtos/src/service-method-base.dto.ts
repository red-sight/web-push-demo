import { FlatObject, IUserSessionData } from "@repo/types";

export class SerializedHttpRequestDto {
  headers: FlatObject;
  method: string;
  url: string;
  query: FlatObject;
  params: FlatObject;
  body: any;
}

export class ServiceMethodBaseDto {
  request: SerializedHttpRequestDto;
  user: IUserSessionData;
  body: any;
  headers: FlatObject;
  method: string;
  url: string;
  query: FlatObject;
  params: FlatObject;
}
