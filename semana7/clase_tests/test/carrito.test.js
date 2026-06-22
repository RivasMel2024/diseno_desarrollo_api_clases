import { expect } from 'chai';
import {
  agregarProducto,
  eliminarProducto,
  calcularTotal,
} from '../carrito.js';

describe('Carrito de compras', () => {
  let carrito;

  beforeEach(() => {
    carrito = [];
  });

  it('debería calcular el total al agregar productos', () => {
    agregarProducto(carrito, { id: 1, nombre: 'Laptop', precio: 1000 });
    agregarProducto(carrito, { id: 2, nombre: 'Mouse', precio: 25 });

    expect(calcularTotal(carrito)).to.equal(1025);
  });

  it('debería recalcular el total al eliminar un producto', () => {
    agregarProducto(carrito, { id: 1, nombre: 'Laptop', precio: 1000 });
    agregarProducto(carrito, { id: 2, nombre: 'Mouse', precio: 25 });

    eliminarProducto(carrito, 1);

    expect(calcularTotal(carrito)).to.equal(25);
    expect(carrito).to.have.lengthOf(1);
  });

  it('debería lanzar error al eliminar un producto inexistente', () => {
    agregarProducto(carrito, { id: 1, nombre: 'Laptop', precio: 1000 });

    expect(() => eliminarProducto(carrito, 99)).to.throw('Producto no encontrado');
  });
});
