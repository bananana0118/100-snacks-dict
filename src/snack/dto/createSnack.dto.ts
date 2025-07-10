import { Type } from 'class-transformer';
import {
  ArrayNotEmpty,
  IsInt,
  IsNotEmpty,
  IsPositive,
  IsString,
} from 'class-validator';

export class CreateSnackDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  type: string;

  @IsInt()
  @IsPositive()
  @Type(() => Number)
  price: number;

  @IsInt()
  @IsPositive()
  @Type(() => Number)
  kcal: number;

  @IsInt()
  @IsPositive()
  @Type(() => Number)
  capacity: number;

  @ArrayNotEmpty()
  @Type(() => Number)
  @IsInt({ each: true })
  tasteIds: number[];

  @IsPositive()
  @IsInt()
  @Type(() => Number)
  brandId: number;
}
