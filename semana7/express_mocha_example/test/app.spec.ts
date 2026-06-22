import { expect } from 'chai';
import request from 'supertest';
import app from '../src/app';

describe('API Express', () => {
  it('GET /hello debe responder con Hello World', async () => {
    const res = await request(app).get('/hello');
    expect(res.status).to.equal(200);
    expect(res.body).to.deep.equal({ message: 'Hello World!' });
  });

  it('POST /sum debe sumar correctamente', async () => {
    const res = await request(app)
      .post('/sum')
      .send({ a: 5, b: 7 });
    expect(res.status).to.equal(200);
    expect(res.body.result).to.equal(12);
  });

  it('POST /sum debe validar entrada', async () => {
    const res = await request(app)
      .post('/sum')
      .send({ a: 'foo', b: 7 });
    expect(res.status).to.equal(400);
    expect(res.body).to.have.property('error');
  });
});
