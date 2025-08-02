import { faker } from '@faker-js/faker';
import { Brand } from '../entities/brand.entity';
import { SnackType } from '../entities/snack-type.entity';
import { Snack } from '../entities/snack.entity';
import { Store } from '../entities/store.entity';
import { Taste } from '../entities/taste.entity';
import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';

export class MainSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<any> {
    console.log('seeding Snack Types...');

    const snackTypeRepo = dataSource.getRepository(SnackType);
    const snackTypes = await snackTypeRepo.save([
      { code: 'SNK001', name: '봉지과자' },
      { code: 'SNK002', name: '바삭과자(비스킷)' },
      { code: 'SNK003', name: '폭신과자(파이)' },
      { code: 'SNK004', name: '초콜릿' },
      { code: 'SNK005', name: '젤리' },
      { code: 'SNK006', name: '캔디&껌' },
    ]);

    console.log('seeding Brands...');

    const brandRepo = dataSource.getRepository(Brand);
    const brands = await brandRepo.save([
      { code: 'BRD001', name: '롯데제과' },
      { code: 'BRD002', name: '오리온' },
      { code: 'BRD003', name: '크라운' },
      { code: 'BRD004', name: '해태' },
    ]);

    console.log('seeding Stores...');

    const storeRepo = dataSource.getRepository(Store);
    const stores = await storeRepo.save([
      { code: 'STR001', name: 'CU' },
      { code: 'STR002', name: 'GS25' },
      { code: 'STR003', name: '세븐일레븐' },
      { code: 'STR004', name: '이마트24' },
    ]);

    console.log('seeding Tastes...');

    const tasteRepo = dataSource.getRepository(Taste);
    const tastes = await tasteRepo.save([
      { code: 'TST001', name: '달콤' },
      { code: 'TST002', name: '상큼' },
      { code: 'TST003', name: '짭짤' },
      { code: 'TST004', name: '매콤' },
      { code: 'TST005', name: '쌉싸름' },
      { code: 'TST006', name: '느끼함' },
    ]);

    console.log('snacks...');
    const snackFactory = factoryManager.get(Snack);
    const snacks = await Promise.all(
      Array(35)
        .fill('')
        .map(async () => {
          const snack = await snackFactory.make({
            snackType: faker.helpers.arrayElement(snackTypes),
            brand: faker.helpers.arrayElement(brands),
            tastes: faker.helpers.arrayElements(tastes, { min: 1, max: 4 }),
            stores: faker.helpers.arrayElements(stores, { min: 1, max: 4 }),
          });

          return snack;
        }),
    );

    const snackRepo = dataSource.getRepository(Snack);
    await snackRepo.save(snacks);
  }
}
