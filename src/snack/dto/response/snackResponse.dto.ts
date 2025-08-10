export class GetSnackResponseDto {
  id: number;
  name: string;
  snackTypeCode: string;
  brandCode: string;
  tasteCodes: string[];
  storeCodes: string[];
  price: number;
  snackImg?: string | null;
  kcal: number;
  capacity: number;
  releaseAt: Date;
}

export class CreateSnackResponseDto {
  name: string;
  snackTypeCode: string;
  brandCode: string;
  tasteCodes: string[];
  storeCodes: string[];
  price: number;
  snackImg?: string | null;
  kcal: number;
  capacity: number;
  releaseAt: Date;
}
