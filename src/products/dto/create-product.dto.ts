import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsBoolean,
  IsOptional,
} from 'class-validator';
export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  productName!: string;

  @IsNumber()
  @IsNotEmpty()
  costPrice!: number;

  @IsNumber()
  @IsNotEmpty()
  sellingPrice!: number;

  @IsNumber()
  @IsNotEmpty()
  quantityAvailable!: number;

  @IsString()
  @IsNotEmpty()
  category!: string;

  @IsString()
  @IsNotEmpty()
  description!: string;

  @IsBoolean()
  isActive!: boolean;

  @IsNumber()
  @IsOptional()
  createdBy!: number;
}
