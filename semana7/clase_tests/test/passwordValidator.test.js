import { expect } from 'chai';
import { validarPassword } from '../passwordValidator.js';

const passwordValida = 'Segura1!';

describe('validarPassword', () => {
  it('debería retornar true cuando cumple todas las reglas', () => {
    expect(validarPassword(passwordValida)).to.be.true;
  });

  it('debería fallar si tiene menos de 8 caracteres', () => {
    expect(validarPassword('Seg1!')).to.be.false;
  });

  it('debería fallar si no tiene letra mayúscula', () => {
    expect(validarPassword('segura1!')).to.be.false;
  });

  it('debería fallar si no tiene número', () => {
    expect(validarPassword('Seguraaa!')).to.be.false;
  });

  it('debería fallar si no tiene carácter especial', () => {
    expect(validarPassword('Segura123')).to.be.false;
  });

  it('debería fallar solo por longitud aunque cumpla el resto', () => {
    expect(validarPassword('Seg1!')).to.be.false;
  });

  it('debería fallar solo por mayúscula aunque cumpla el resto', () => {
    expect(validarPassword('segura1!')).to.be.false;
  });

  it('debería fallar solo por número aunque cumpla el resto', () => {
    expect(validarPassword('Seguraaa!')).to.be.false;
  });

  it('debería fallar solo por carácter especial aunque cumpla el resto', () => {
    expect(validarPassword('Segura123')).to.be.false;
  });
});
