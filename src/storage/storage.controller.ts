import { Body, Controller, Post } from '@nestjs/common';
import { StorageService } from './storage.service';
import { PresignPutDto } from './dto/putPresign.dto';

// 공통된 기능을 위한 메서드들

@Controller('storage')
export class StorageController {
  constructor(private readonly storageService: StorageService) {}

  @Post('presign')
  presign(@Body() dto: PresignPutDto) {
    return this.storageService.getPresignedPutUrl(dto.fileName, dto.fileType);
  }
}
