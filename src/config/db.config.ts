import 'dotenv/config';
import { registerAs } from '@nestjs/config';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { Snack } from 'src/entities/snack.entity';
import { Brand } from 'src/entities/brand.entity';
import { SnackType } from 'src/entities/snack-type.entity';
import { Store } from 'src/entities/store.entity';
import { Taste } from 'src/entities/taste.entity';
import { SnackReaction } from 'src/entities/snack-reaction.entity';
import { User } from 'src/entities/user.entity';
import { Comment } from 'src/entities/comment.entity';

export default registerAs(
  'dbconfig',
  (): PostgresConnectionOptions => ({
    url: process.env.DATABASE_URL,
    type: 'postgres',
    entities: [
      Snack,
      SnackType,
      Brand,
      Taste,
      Store,
      SnackReaction,
      SnackType,
      User,
      Comment,
    ],
    synchronize: true, //production환경에선 제거
  }),
);
