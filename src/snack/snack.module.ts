import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Snack } from 'src/entities/snack.entity';
import { SnackController } from './snack.controller';
import { SnackService } from './snack.service';

@Module({
  imports: [TypeOrmModule.forFeature([Snack])],
  controllers: [SnackController],
  providers: [SnackService],
})
export class SnackModule {}
