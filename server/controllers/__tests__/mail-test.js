/* eslint no-undef: "off" */
import request from 'supertest';
import express from 'express';
import sinonStubPromise from 'sinon-stub-promise';
import sinon from 'sinon';
import mailRoutes, { emailClient } from '../mail';
import bodyParser from 'body-parser';

sinonStubPromise(sinon);
describe('POST /api/mail', () => {
  let app;
  before(() => {
    app = express();
    const router = express.Router();
    router.use('/api/email', mailRoutes);
    app.use(bodyParser());
    app.use(router);
  });

  afterEach(() => {
    sinon.restore(emailClient, 'send');
  });

  it('response with json', (done) => {
    sinon
      .stub(emailClient, 'send')
      .returnsPromise()
      .resolves('Pass');

    request(app)
      .post('/api/email')
      .set('Accept', 'application/json')
      .send({ email: 'test@test.com' })
      .expect(202, { message: 'Pass' }, done);
  });

  it('response with error', done => {
    sinon
      .stub(emailClient, 'send')
      .returnsPromise()
      .rejects({ message: 'Failed' });

    request(app)
      .post('/api/email')
      .set('Accept', 'application/json')
      .send({ email: 'test@test.com' })
      .expect(500, { error: 'Failed to send email' }, done);
  });

  it('response with bad request', done => {
    request(app)
      .post('/api/email')
      .set('Accept', 'application/json')
      .expect(400, { message: 'Invalid email' }, done);
  });
});
