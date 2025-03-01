import { IsArray, IsBoolean, IsDecimal, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateProductDto {
  @IsString()
  name: string;

  @IsArray()
  @IsString({ each: true })
  categories: string[];
  @IsString()
  description?: string;
  @IsString()
  color: string;

  @IsNumber()
  sweetness: number; //maximo 1 - 5

  @IsString()
  storageLife: string;
  @IsArray()
  @IsString({ each: true })
  culinaryUses: string[];

  @IsString()
  image: string;
  @IsString()
  origin: string;

  @IsDecimal()
  price: number;

  @IsNumber()
  stock: number;

  @IsOptional()
  @IsString()
  slug?: string;

  @IsBoolean()
  organic: boolean;

  @IsBoolean()
  seasonal: boolean;

  @IsArray()
  @IsString({ each: true })  
  @IsOptional()
  seasonalAvailability?: string[];

  @IsString()
  sku: string;
}
