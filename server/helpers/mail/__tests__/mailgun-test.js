/* eslint no-undef: "off" */
import MailgunTransport from '../mailgun';
import { expect } from 'chai';
import request from 'request';
import sinon from 'sinon';

describe('Server test (Mail module -> mailgun) Helpers', () => {
  let client;
  beforeEach(() => {
    client = new MailgunTransport({ endpoint: 'test', apiKey: '123', defaultFrom: 'test' });
    sinon
      .stub(request, 'post')
      .yields(null, null, null);
  });

  afterEach(() => {
    sinon.restore(request.post);
  });

  it('should have the right options setting', () => {
    const op = {
      uri: 'test',
      headers: {
        'Authorization': 'Basic ' + new Buffer('api:123').toString('base64')
      }
    };
    expect(client.options).to.deep.equal(op);
  });

  it('should return a new promise ', () => {
    const config = {
    };
    expect(client.send(config)).to.be.a('Promise');
  });
});
