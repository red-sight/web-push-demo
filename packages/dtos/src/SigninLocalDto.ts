import { IsEmail, IsNotEmpty } from "class-validator";

export class SigninLocalDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}
