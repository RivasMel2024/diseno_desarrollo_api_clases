import { expect } from 'chai';
import { restar, multiplicar, sumar } from '../math.js';

describe('Operaciones matemáticas', () => {
  it('resta correctamente', () => {
    expect(restar(10, 5)).to.equal(5);
  });

  it('multiplica correctamente', () => {
    expect(multiplicar(3, 4)).to.equal(12);
  });

  it('debería sumar 2 + 2 = 4', () => {
    expect(sumar(2, 2)).to.equal(4);
  });

  it('debería sumar números negativos', () => {
    expect(sumar(-2, -3)).to.equal(-5);
  });
});
