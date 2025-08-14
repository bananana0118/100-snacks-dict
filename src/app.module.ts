import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigType } from '@nestjs/config';
import dbConfig from './config/db.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SnackModule } from './snack/snack.module';
import { StorageModule } from './storage/storage.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      expandVariables: true,
      envFilePath: '.env',

      load: [dbConfig],
    }),
    TypeOrmModule.forRootAsync({
      inject: [dbConfig.KEY],
      useFactory: (cfg: ConfigType<typeof dbConfig>) => ({
        ...cfg,
        keepConnectionAlive: true, // Lambda 재사용 최적화
      }),
    }),
    SnackModule,
    StorageModule, //a
  ],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
