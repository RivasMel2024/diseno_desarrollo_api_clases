import { expect } from 'chai';
import { paginar } from '../paginator.js';

const lista = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

describe('paginar', () => {
  it('debería retornar la primera página', () => {
    expect(paginar(lista, 1, 3)).to.deep.equal([1, 2, 3]);
  });

  it('debería retornar una página intermedia', () => {
    expect(paginar(lista, 2, 3)).to.deep.equal([4, 5, 6]);
  });

  it('debería retornar la última página con elementos incompletos', () => {
    expect(paginar(lista, 4, 3)).to.deep.equal([10]);
  });

  it('debería lanzar error si la página no existe', () => {
    expect(() => paginar(lista, 5, 3)).to.throw('La página no existe');
  });
});
