export class SnackResponseDto {
  id: number;
  name: string;
  snackTypeCode: string;
  brandCode: string;
  tasteCodes: string[];
  storeCodes: string[];
  price: number;
  snackImg: string;
  kcal: number;
  capacity: number;
  releaseAt: Date;
}
