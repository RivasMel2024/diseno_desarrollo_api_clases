import { DataSource } from 'typeorm';
import { Category } from './categories/entities/category.entity';
import { Product } from './products/entities/product.entity';

async function seed() {
  const dataSource = new DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: '1234',
    database: 'api_graphql',
    entities: [Product, Category],
    synchronize: true,
  });

  await dataSource.initialize();

  const categoryRepo = dataSource.getRepository(Category);
  await categoryRepo.save([
    categoryRepo.create({ name: 'Electrónica' }),
    categoryRepo.create({ name: 'Inalambricos' }),
  ]);

  console.log('Categorías creadas');
  await dataSource.destroy();
}

seed();
