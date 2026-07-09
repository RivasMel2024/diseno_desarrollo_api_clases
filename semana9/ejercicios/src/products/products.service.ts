import { Injectable, NotFoundException } from '@nestjs/common';
import { CacheService } from '../cache/cache.service';

type Product = {
  id: number;
  name: string;
  price: number;
};

type ProductsPayload = {
  products: Product[];
};

export type ProductsResponse = ProductsPayload & {
  cached: boolean;
  source: 'database' | 'redis';
};

export type CreateProductInput = {
  name: string;
  price: number;
};

const PRODUCTS_CACHE_KEY = 'products_all';
const PRODUCTS_CACHE_TTL_SECONDS = 30;

@Injectable()
export class ProductsService {
  private products: Product[] = [
    { id: 1, name: 'Café en grano', price: 12.5 },
    { id: 2, name: 'Cacao en polvo', price: 9.75 },
    { id: 3, name: 'Miel orgánica', price: 15.0 },
  ];

  private nextId = 4;

  public constructor(private readonly cacheService: CacheService) {}

  public async findAll(): Promise<ProductsResponse> {
    console.time('GET /products');

    const cachedProducts = await this.cacheService.get<ProductsPayload>(PRODUCTS_CACHE_KEY);
    if (cachedProducts) {
      console.timeEnd('GET /products');

      return {
        cached: true,
        products: cachedProducts.products,
        source: 'redis',
      };
    }

    const payload = await this.loadProductsFromDatabase();

    await this.cacheService.set(PRODUCTS_CACHE_KEY, payload, PRODUCTS_CACHE_TTL_SECONDS);

    console.timeEnd('GET /products');

    return {
      cached: false,
      products: payload.products,
      source: 'database',
    };
  }

  public async create(input: CreateProductInput): Promise<Product> {
    const product: Product = {
      id: this.nextId++,
      name: input.name,
      price: input.price,
    };

    this.products.push(product);
    await this.cacheService.del(PRODUCTS_CACHE_KEY);

    return product;
  }

  public async remove(id: number): Promise<void> {
    const productExists = this.products.some((product) => product.id === id);
    if (!productExists) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }

    this.products = this.products.filter((product) => product.id !== id);
    await this.cacheService.del(PRODUCTS_CACHE_KEY);
  }

  private async loadProductsFromDatabase(): Promise<ProductsPayload> {
    await new Promise((resolve) => {
      setTimeout(resolve, 2000);
    });

    return {
      products: this.products,
    };
  }
}
