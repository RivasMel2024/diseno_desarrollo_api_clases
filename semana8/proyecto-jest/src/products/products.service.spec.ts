import { ProductsService } from './products.service';

describe('ProductsService', () => {
  let service: ProductsService;

  beforeEach(() => {
    service = new ProductsService();
  });

  it('deberia calcular el precio con descuento', () => {
    expect(service.getDiscountedPrice(100, 20)).toBe(80);
  });

  it('deberia calcular el IVA correctamente', () => {
    expect(service.getIVA(100)).toBe(13);
  });

  it('deberia lanzar error si el descuento es mayor a 100%', () => {
    expect(() => service.getDiscountedPrice(100, 101)).toThrow(
      'El descuento no puede ser mayor a 100%',
    );
  });
});
