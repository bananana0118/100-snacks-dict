import { DataSource, DataSourceOptions } from 'typeorm';
import { runSeeders, SeederOptions } from 'typeorm-extension';
import { MainSeeder } from './main.seeder';
import dbConfig from '../config/db.config';
import { Snackfactory } from './snack.factory';

const options: DataSourceOptions & SeederOptions = {
  ...dbConfig(),
  factories: [Snackfactory],
  seeds: [MainSeeder],
};

const datasource = new DataSource(options);
datasource
  .initialize()
  .then(async () => {
    await datasource.synchronize(true);
    await runSeeders(datasource);
    process.exit();
  })
  .catch((error) => {
    console.error('Error during Data Source initialization:', error);
    process.exit(1);
  });
