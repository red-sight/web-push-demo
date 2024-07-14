import { IsEmail, IsNotEmpty, IsStrongPassword } from "class-validator";

export class SignupLocalDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsStrongPassword()
  password: string;
}
