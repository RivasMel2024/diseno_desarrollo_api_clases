import { expect } from 'chai';
import request from 'supertest';
import app, { resetStudents } from '../src/app';

describe('API Estudiantes', () => {
  beforeEach(() => {
    resetStudents();
  });

  it('registro exitoso', async () => {
    const res = await request(app)
      .post('/students')
      .send({ nombre: 'Ana', edad: 20, email: 'ana@mail.com' });

    expect(res.status).to.equal(201);
    expect(res.body).to.deep.equal({
      nombre: 'Ana',
      edad: 20,
      email: 'ana@mail.com',
    });
  });

  it('registro sin nombre debe fallar', async () => {
    const res = await request(app)
      .post('/students')
      .send({ edad: 20, email: 'ana@mail.com' });

    expect(res.status).to.equal(400);
    expect(res.body).to.have.property('error');
  });

  it('registro con edad inválida debe fallar', async () => {
    const res = await request(app)
      .post('/students')
      .send({ nombre: 'Ana', edad: 0, email: 'ana@mail.com' });

    expect(res.status).to.equal(400);
    expect(res.body).to.have.property('error');
  });

  it('registro con email inválido debe fallar', async () => {
    const res = await request(app)
      .post('/students')
      .send({ nombre: 'Ana', edad: 20, email: 'correo-invalido' });

    expect(res.status).to.equal(400);
    expect(res.body).to.have.property('error');
  });

  it('GET /students debe incluir los estudiantes registrados', async () => {
    await request(app)
      .post('/students')
      .send({ nombre: 'Ana', edad: 20, email: 'ana@mail.com' });

    await request(app)
      .post('/students')
      .send({ nombre: 'Luis', edad: 22, email: 'luis@mail.com' });

    const res = await request(app).get('/students');

    expect(res.status).to.equal(200);
    expect(res.body).to.have.lengthOf(2);
    expect(res.body[0]).to.deep.equal({
      nombre: 'Ana',
      edad: 20,
      email: 'ana@mail.com',
    });
    expect(res.body[1]).to.deep.equal({
      nombre: 'Luis',
      edad: 22,
      email: 'luis@mail.com',
    });
  });
});
