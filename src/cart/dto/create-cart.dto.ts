import { IsNumber, IsNotEmpty, IsOptional } from 'class-validator';
export class CreateCartDto {
  @IsOptional()
  @IsNumber()
  user!: number;

  @IsNotEmpty()
  @IsNumber()
  product!: number;

  @IsNotEmpty()
  @IsNumber()
  quantity!: number;
}
