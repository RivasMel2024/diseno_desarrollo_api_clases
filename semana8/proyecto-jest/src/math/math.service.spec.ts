import { MathService } from './math.service';

describe('MathService', () => {
  let service: MathService;

  beforeEach(() => {
    service = new MathService();
  });

  it('deberia sumar 2 + 3 = 5', () => {
    expect(service.sumar(2, 3)).toBe(5);
  });

  it('deberia sumar -6 + -6 = -12', () => {
    expect(service.sumar(-6, -6)).toBe(-12);
  });

  it('deberia dividir 10 / 2 = 5', () => {
    expect(service.dividir(10, 2)).toBe(5);
  });

  it('deberia lanzar error al dividir entre 0', () => {
    expect(() => service.dividir(10, 0)).toThrow('No se puede dividir entre cero');
  });
});
