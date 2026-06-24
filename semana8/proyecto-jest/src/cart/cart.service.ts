import { Injectable } from '@nestjs/common';
import { ProductsService } from '../products/products.service';

export interface CartItem {
  productId: string;
  quantity: number;
}

@Injectable()
export class CartService {
  private items: CartItem[] = [];

  constructor(private productsService: ProductsService) {}

  addItem(productId: string, quantity: number): void {
    const existingItem = this.items.find((item) => item.productId === productId);
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      this.items.push({ productId, quantity });
    }
  }

  getTotal(): number {
    return this.items.reduce((total, item) => {
      const product = this.productsService.getProduct(item.productId);
      return total + product.price * item.quantity;
    }, 0);
  }

  applyGlobalDiscount(discountPercent: number): number {
    if (discountPercent > 100) {
      throw new Error('El descuento no puede ser mayor a 100%');
    }

    const total = this.getTotal();
    return parseFloat((total * (1 - discountPercent / 100)).toFixed(2));
  }

  getItems(): CartItem[] {
    return this.items;
  }

  clear(): void {
    this.items = [];
  }
}
