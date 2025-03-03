import { IsEmail, IsStrongPassword } from 'class-validator';

export class LoginDto {
  @IsEmail()
  email: string;

  @IsStrongPassword({
    minSymbols: 0,
    minLength: 6,
    minUppercase: 0
  })
  password: string;
}
