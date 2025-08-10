import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Snack } from 'src/entities/snack.entity';
import { SnackController } from './snack.controller';
import { SnackService } from './snack.service';
import { MulterModule } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';

@Module({
  imports: [
    TypeOrmModule.forFeature([Snack]),
    MulterModule.register({
      storage: memoryStorage(),
      limits: { fileSize: 5 * 1024 * 1024 }, // 5MB 예시
    }),
  ],
  controllers: [SnackController],
  providers: [SnackService],
})
export class SnackModule {}
