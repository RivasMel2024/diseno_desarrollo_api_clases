import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ProductsResolver } from './products.resolver';
import { ProductsService } from './products.service';
import { Product } from './entities/product.entity';

describe('ProductsResolver', () => {
  let resolver: ProductsResolver;

  const productRepositoryMock = {
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    findOneBy: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductsResolver,
        ProductsService,
        {
          provide: getRepositoryToken(Product),
          useValue: productRepositoryMock,
        },
      ],
    }).compile();

    resolver = module.get<ProductsResolver>(ProductsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
