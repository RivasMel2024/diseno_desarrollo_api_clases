import { expect } from 'chai';
import { esPrimo } from '../esPrimo.js';

describe('Función esPrimo', () => {
  it('debería retornar true para números primos', () => {
    expect(esPrimo(2)).to.be.true;
    expect(esPrimo(3)).to.be.true;
    expect(esPrimo(7)).to.be.true;
    expect(esPrimo(13)).to.be.true;
  });

  it('debería retornar false para números no primos', () => {
    expect(esPrimo(4)).to.be.false;
    expect(esPrimo(9)).to.be.false;
    expect(esPrimo(15)).to.be.false;
  });

  it('debería retornar false para números menores a 2', () => {
    expect(esPrimo(0)).to.be.false;
    expect(esPrimo(1)).to.be.false;
    expect(esPrimo(-5)).to.be.false;
  });
});
