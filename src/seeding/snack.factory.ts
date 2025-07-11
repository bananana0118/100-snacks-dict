import { Faker } from '@faker-js/faker';
import { Snack } from '../entities/snack.entity';
import { setSeederFactory } from 'typeorm-extension';

export const Snackfactory = setSeederFactory(Snack, (faker: Faker) => {
  const snack = new Snack();

  snack.name = faker.commerce.productName();
  snack.price = +faker.commerce.price({ min: 1000, max: 10000 });
  snack.kcal = faker.number.int({ min: 100, max: 500 });
  snack.capacity = faker.number.int({ min: 50, max: 500 });
  snack.snackImg = faker.image.urlLoremFlickr({
    width: 640,
    height: 480,
    category: 'food',
  });
  return snack;
});
