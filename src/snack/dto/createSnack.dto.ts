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

  //1.봉지과자
  //2.바삭과자(비스킷)
  //3.폭신과자(파이)
  //4.초콜릿
  //5.젤리
  //6.캔디 껌
  @IsInt()
  @IsPositive()
  @IsNotEmpty()
  type: number;

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

  @IsString()
  @IsNotEmpty()
  snackImg: string;
  //1.달콤
  //2.상큼
  //3.짭짤
  //4.매콤
  //5.쌉싸름

  @ArrayNotEmpty()
  @Type(() => Number)
  @IsInt({ each: true })
  tasteIds: number[];

  @IsPositive()
  @IsInt()
  @Type(() => Number)
  storeId: number;

  @IsPositive()
  @IsInt()
  @Type(() => Number)
  brandId: number;
}
