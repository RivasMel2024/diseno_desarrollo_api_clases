import { beforeEach, describe, expect, it, jest } from '@jest/globals';
import { CartService } from './cart.service';
import { ProductsService } from '../products/products.service';

describe('CartService', () => {
  let cartService: CartService;
  let productsService: ProductsService;

  beforeEach(() => {
    // Crear un mock de ProductsService
    productsService = {
      getProduct: jest.fn((productId: string) => {
        const products = {
          '1': { id: '1', name: 'Laptop', price: 1000 },
          '2': { id: '2', name: 'Mouse', price: 50 },
          '3': { id: '3', name: 'Keyboard', price: 100 },
        };
        return products[productId];
      }),
    } as any;

    cartService = new CartService(productsService);
  });

  describe('addItem', () => {
    it('debería agregar un item al carrito', () => {
      cartService.addItem('1', 1);
      expect(cartService.getItems()).toEqual([{ productId: '1', quantity: 1 }]);
    });

    it('debería agregar múltiples items diferentes', () => {
      cartService.addItem('1', 2);
      cartService.addItem('2', 3);
      expect(cartService.getItems()).toEqual([
        { productId: '1', quantity: 2 },
        { productId: '2', quantity: 3 },
      ]);
    });

    it('debería incrementar la cantidad si el producto ya existe', () => {
      cartService.addItem('1', 2);
      cartService.addItem('1', 3);
      expect(cartService.getItems()).toEqual([{ productId: '1', quantity: 5 }]);
    });

    it('debería lanzar error si el producto no existe', () => {
      expect(() => cartService.addItem('999', 1)).toThrow(
        'Producto no encontrado: 999',
      );
    });
    
  });

  describe('getTotal', () => {
    it('debería calcular el total correcto con un item', () => {
      cartService.addItem('1', 1); 
      expect(cartService.getTotal()).toBe(1000);
    });

    it('debería calcular el total correcto con múltiples items', () => {
      cartService.addItem('1', 1); 
      cartService.addItem('2', 2);
      expect(cartService.getTotal()).toBe(1100);
    });

    it('debería calcular el total correcto con cantidades diferentes', () => {
      cartService.addItem('1', 2); 
      cartService.addItem('2', 3); 
      cartService.addItem('3', 1); 
      expect(cartService.getTotal()).toBe(2250);
    });

    it('debería retornar 0 si el carrito está vacío', () => {
      expect(cartService.getTotal()).toBe(0);
    });

    it('debería propagar el error si ProductsService lanza una excepción', () => {
      cartService.addItem('1', 1);
      (productsService.getProduct as jest.Mock).mockImplementation(() => {
        throw new Error('Servicio no disponible');
      });
      expect(() => cartService.getTotal()).toThrow('Servicio no disponible');
    });
  });

  describe('applyGlobalDiscount', () => {
    it('debería aplicar descuento del 10%', () => {
      cartService.addItem('1', 1); 
      const result = cartService.applyGlobalDiscount(10);
      expect(result).toBe(900);
    });

    it('debería aplicar descuento del 20%', () => {
      cartService.addItem('1', 1);
      const result = cartService.applyGlobalDiscount(20);
      expect(result).toBe(800);
    });

    it('debería aplicar descuento correctamente con múltiples items', () => {
      cartService.addItem('1', 1);
      cartService.addItem('2', 2);
      const result = cartService.applyGlobalDiscount(50);
      expect(result).toBe(550);
    });

    it('debería aplicar 0% de descuento (sin descuento)', () => {
      cartService.addItem('1', 1); // 1000
      const result = cartService.applyGlobalDiscount(0);
      expect(result).toBe(1000);
    });

    it('debería mantener precisión decimal', () => {
      cartService.addItem('1', 1);
      const result = cartService.applyGlobalDiscount(15);
      expect(result).toBe(850);
    });

    it('debería lanzar error si el descuento es mayor a 100%', () => {
      cartService.addItem('1', 1);
      const result = cartService.applyGlobalDiscount(100);
      expect(result).toThrow('El descuento no puede ser mayor o igual a 100%');
    });

  });

  describe('clear', () => {
    it('debería limpiar el carrito', () => {
      cartService.addItem('1', 2);
      cartService.addItem('2', 3);
      cartService.clear();
      expect(cartService.getItems()).toEqual([]);
      expect(cartService.getTotal()).toBe(0);
    });
  });

  describe('integración con ProductsService mock', () => {
    it('debería llamar a ProductsService.getProduct para cada item en getTotal', () => {
      cartService.addItem('1', 2);
      cartService.addItem('2', 1);
      cartService.getTotal();

      expect(productsService.getProduct).toHaveBeenCalledWith('1');
      expect(productsService.getProduct).toHaveBeenCalledWith('2');
    });
  });
});
