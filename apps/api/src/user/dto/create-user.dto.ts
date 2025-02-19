import { IsEmail, IsOptional, IsString, IsStrongPassword, MinLength } from 'class-validator';
import { Role } from '../interfaces/role.enum';

export class CreateUserDto {
  @IsString()
  firstname: string;
  @IsString()
  lastname: string;
  @IsEmail()
  email: string;
  @MinLength(6)
  @IsStrongPassword({
    minSymbols: 0,
  })
  password: string;
  @IsOptional()
  profile?: string;
  @IsOptional()
  role?: Role;
}
