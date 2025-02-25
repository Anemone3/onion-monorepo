import { IsEmail, IsOptional, IsString, IsStrongPassword } from 'class-validator';

export class RegisterDto {
  @IsString()
  firstname: string;
  @IsString()
  lastname: string;
  @IsEmail()
  email: string;
  @IsStrongPassword({
    minSymbols: 0,
    minLength: 6
  })
  password: string;
  @IsOptional()
  profile?: string;
}
