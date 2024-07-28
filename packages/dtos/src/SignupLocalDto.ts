import { IsEmail, IsNotEmpty, IsStrongPassword } from "class-validator";

export class SignupLocalDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @IsStrongPassword()
  password: string;
}
