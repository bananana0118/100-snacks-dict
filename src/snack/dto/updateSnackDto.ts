import { PartialType } from '@nestjs/mapped-types';
import { CreateSnackDto } from './createSnack.dto';

export class UpdateSnackDto extends PartialType(CreateSnackDto) {}
