// src/data-source.ts
import 'dotenv/config'; // .env 로드
import * as path from 'path';
import { DataSource } from 'typeorm';

export default new DataSource({
  type: 'postgres',
  url: process.env.URL, // DATABASE_URL 같은 env
  entities: [path.resolve(__dirname, 'entities/*{.ts,.js}')],
  migrations: [path.resolve(__dirname, 'migrations/*{.ts,.js}')],
  synchronize: true, // dev에서만 true, prod에선 false
});
