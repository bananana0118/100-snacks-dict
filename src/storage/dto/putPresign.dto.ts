import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class PresignPutDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  fileName!: string;

  @IsString()
  @IsNotEmpty()
  fileType!: string; //image/png
}
