import { ServiceMethodBaseDto, SigninLocalDto } from '@repo/dtos';
import { Type } from 'class-transformer';
import { IsNotEmpty, ValidateNested } from 'class-validator';

export class SigninLocalAuthDto extends ServiceMethodBaseDto {
  @ValidateNested()
  @Type(() => SigninLocalDto)
  @IsNotEmpty()
  body: SigninLocalDto;
}
