import { Injectable } from '@nestjs/common';

export interface Product {
  id: string;
  name: string;
  price: number;
}

@Injectable()
export class ProductsService {
  private products: Product[] = [
    { id: '1', name: 'Laptop', price: 999.99 },
    { id: '2', name: 'Mouse', price: 29.99 },
    { id: '3', name: 'Keyboard', price: 79.99 },
  ];

  getDiscountedPrice(price: number, discount: number): number {
    if (discount > 100) {
      throw new Error('El descuento no puede ser mayor a 100%');
    }
    return price - price * (discount / 100);
  }

  getIVA(price: number): number {
    return price * 0.13;
  }

  getProduct(productId: string): Product {
    const product = this.products.find((p) => p.id === productId);
    if (!product) {
      throw new Error(`Producto no encontrado: ${productId}`);
    }
    return product;
  }

  getAllProducts(): Product[] {
    return this.products;
  }
}
