import { Type } from "class-transformer";
import {
  ArrayNotEmpty,
  IsArray,
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  IsUrl,
  Length,
  ValidateNested
} from "class-validator";
import { PushSubscriptionDto } from "./subscription.dto";

class PushNotificationActionDto {
  @IsString()
  action: string;

  @IsString()
  title: string;

  @IsString()
  icon: string;
}

export class PushNotificationDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  body: string;

  @IsOptional()
  @IsUrl()
  icon?: string;

  @IsOptional()
  @IsUrl()
  badge?: string;

  @IsOptional()
  @IsUrl()
  image?: string;

  @IsOptional()
  @IsArray()
  @ArrayNotEmpty()
  @IsNumber({}, { each: true })
  vibrate?: number[];

  @IsOptional()
  data?: any;

  @IsOptional()
  @IsEnum(["auto", "ltr", "rtl"])
  dir?: string;

  @IsOptional()
  @IsString()
  @Length(2)
  lang?: string;

  @IsOptional()
  @IsBoolean()
  renotify?: boolean;

  @IsOptional()
  @IsBoolean()
  requireInteraction?: boolean;

  @IsOptional()
  @IsString()
  tag?: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PushNotificationActionDto)
  actions?: PushNotificationActionDto[];
}

export class SendPushNotificationDto {
  @IsObject()
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => PushNotificationDto)
  notification: PushNotificationDto;

  @IsObject()
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => PushSubscriptionDto)
  subscription: PushSubscriptionDto;
}
