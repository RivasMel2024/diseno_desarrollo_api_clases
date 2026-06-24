import { Injectable } from '@nestjs/common';

@Injectable()
export class TemperatureService {
  /**
   * Convierte grados Celsius a Fahrenheit
   * Formula: (C × 9/5) + 32
   */
  celsiusToFahrenheit(celsius: number): number {
    return parseFloat(((celsius * 9) / 5 + 32).toFixed(2));
  }

  /**
   * Convierte grados Fahrenheit a Celsius
   * Formula: (F - 32) × 5/9
   */
  fahrenheitToCelsius(fahrenheit: number): number {
    return parseFloat((((fahrenheit - 32) * 5) / 9).toFixed(2));
  }
}
