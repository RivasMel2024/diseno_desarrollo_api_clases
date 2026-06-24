import { TemperatureService } from './temperature.service';

describe('TemperatureService', () => {
  let service: TemperatureService;

  beforeEach(() => {
    service = new TemperatureService();
  });

  describe('celsiusToFahrenheit', () => {
    it('debería convertir 0°C a 32°F', () => {
      expect(service.celsiusToFahrenheit(0)).toBe(32);
    });

    it('debería convertir 100°C a 212°F', () => {
      expect(service.celsiusToFahrenheit(100)).toBe(212);
    });

    it('debería convertir -40°C a -40°F', () => {
      expect(service.celsiusToFahrenheit(-40)).toBe(-40);
    });

    it('debería convertir 37°C a 98.6°F', () => {
      expect(service.celsiusToFahrenheit(37)).toBe(98.6);
    });
  });

  describe('fahrenheitToCelsius', () => {
    it('debería convertir 32°F a 0°C', () => {
      expect(service.fahrenheitToCelsius(32)).toBe(0);
    });

    it('debería convertir 212°F a 100°C', () => {
      expect(service.fahrenheitToCelsius(212)).toBe(100);
    });

    it('debería convertir -40°F a -40°C', () => {
      expect(service.fahrenheitToCelsius(-40)).toBe(-40);
    });

    it('debería convertir 98.6°F a 37°C', () => {
      expect(service.fahrenheitToCelsius(98.6)).toBeCloseTo(37, 1);
    });
  });

  describe('funciones inversas', () => {
    it('convertir Celsius a Fahrenheit y de vuelta debería retornar el valor original', () => {
      const original = 25;
      const fahrenheit = service.celsiusToFahrenheit(original);
      const backToCelsius = service.fahrenheitToCelsius(fahrenheit);
      expect(backToCelsius).toBeCloseTo(original, 1);
    });

    it('convertir Fahrenheit a Celsius y de vuelta debería retornar el valor original', () => {
      const original = 77;
      const celsius = service.fahrenheitToCelsius(original);
      const backToFahrenheit = service.celsiusToFahrenheit(celsius);
      expect(backToFahrenheit).toBeCloseTo(original, 1);
    });
  });
});
