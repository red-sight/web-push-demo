import { ServiceMethodBaseDto, SignupLocalDto } from '@repo/dtos';
import { Type } from 'class-transformer';
import { IsNotEmpty, ValidateNested } from 'class-validator';

export class SignupLocalAuthDto extends ServiceMethodBaseDto {
  @ValidateNested()
  @Type(() => SignupLocalDto)
  @IsNotEmpty()
  body: SignupLocalDto;
}
