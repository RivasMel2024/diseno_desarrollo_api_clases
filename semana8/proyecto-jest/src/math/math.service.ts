import { Injectable } from '@nestjs/common';

@Injectable()
export class MathService {
    sumar(a: number, b: number): number {
        return a + b;
    }

    dividir(a: number, b: number): number {
        if (b === 0) {
            throw new Error('No se puede dividir entre cero');
        }
        return a / b;
    }
}
