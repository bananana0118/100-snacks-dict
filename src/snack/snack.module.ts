import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Snack } from 'src/entities/snack.entity';
import { SnackController } from './snack.controller';
import { SnackService } from './snack.service';
import { MulterModule } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
import { SnackType } from 'src/entities/snack-type.entity';
import { Brand } from 'src/entities/brand.entity';
import { Taste } from 'src/entities/taste.entity';
import { Store } from 'src/entities/store.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Snack, SnackType, Brand, Taste, Store]),
    MulterModule.register({
      storage: memoryStorage(),
      limits: { fileSize: 5 * 1024 * 1024 }, // 5MB 예시
    }),
  ],
  controllers: [SnackController],
  providers: [SnackService],
})
export class SnackModule {}
