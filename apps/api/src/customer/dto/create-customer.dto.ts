import { IsPhoneNumber, IsString, IsUUID, MinLength } from 'class-validator';

export class CreateCustomerDto {
  @IsUUID('4')
  userId: string;
  @IsString()
  @MinLength(6)
  address: string;

  @IsPhoneNumber()
  phone: string;

  @IsString()
  @MinLength(3)
  departamento: string;

  @IsString()
  @MinLength(4)
  country: string;

  @IsString()
  @MinLength(4)
  zipcode: string;
}
