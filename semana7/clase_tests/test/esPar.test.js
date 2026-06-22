import { expect } from 'chai';
import { esPar } from '../esPar.js';

describe('Función esPar', () => {
  it('debería retornar true para 4', () => {
    expect(esPar(4)).to.be.true;
  });

  it('debería retornar false para 3', () => {
    expect(esPar(3)).to.be.false;
  });

  it('debería retornar true para 0', () => {
    expect(esPar(0)).to.be.true;
  });
});
