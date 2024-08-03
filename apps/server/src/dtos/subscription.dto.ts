import { Type } from 'class-transformer';
import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
  IsUrl,
  ValidateNested,
} from 'class-validator';

class KeysDto {
  @IsNotEmpty()
  @IsString()
  auth: string;

  @IsNotEmpty()
  @IsString()
  p256dh: string;
}

export class PushSubscriptionDto {
  @IsUrl()
  @IsNotEmpty()
  endpoint: string;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => KeysDto)
  keys: KeysDto;

  @IsInt()
  @IsPositive()
  @IsOptional()
  expirationTime: number | null;
}
