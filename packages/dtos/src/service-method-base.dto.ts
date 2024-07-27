import { IServiceRequest, IUserSessionData } from "@repo/types";
import { IsNotEmpty, IsObject, IsOptional } from "class-validator";

export class ServiceMethodBaseDto {
  @IsNotEmpty()
  @IsObject()
  request: IServiceRequest;

  @IsObject()
  @IsOptional()
  user: IUserSessionData;

  @IsOptional()
  body: any;
}
