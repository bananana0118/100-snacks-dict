import path from 'path';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

export default (): PostgresConnectionOptions => ({
  port: +(process.env.PORT || 5432),
  url: process.env.URL,
  type: 'postgres',
  entities: [path.resolve(__dirname, '..') + '**/*.entity{.ts,.js}'],
  synchronize: true, //production환경에선 제거
});
