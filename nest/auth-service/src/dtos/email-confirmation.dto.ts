import { EmailConfirmationDto, ServiceMethodBaseDto } from '@repo/dtos';
import { Type } from 'class-transformer';
import { IsNotEmpty, ValidateNested } from 'class-validator';

export class EmailConfirmationAuthDto extends ServiceMethodBaseDto {
  @ValidateNested()
  @IsNotEmpty()
  @Type(() => EmailConfirmationDto)
  query: EmailConfirmationDto;
}
