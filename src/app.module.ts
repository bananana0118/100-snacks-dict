import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import dbConfig from './config/db.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SnackModule } from './snack/snack.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '../.env',
      isGlobal: true,
      expandVariables: true,
      load: [dbConfig],
    }),
    TypeOrmModule.forRootAsync({
      useFactory: process.env.NODE_ENV === 'production' ? dbConfig : dbConfig,
    }),
    SnackModule,
  ],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
