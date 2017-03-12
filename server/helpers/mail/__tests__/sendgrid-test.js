/* eslint no-undef: "off" */
import SendgridTransport from '../sendgrid';
import { expect } from 'chai';
import request from 'request';
import sinon from 'sinon';

describe('Server test (Mail module -> sendgrid) Helpers', () => {
  let client;
  beforeEach(() => {
    client = new SendgridTransport({ endpoint: 'test', apiKey: '123', defaultFrom: 'test' });
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
        'Authorization': 'Bearer 123',
        'Content-Type': 'application/json'
      }
    };
    expect(client.options).to.deep.equal(op);
  });

  it('should return a new promise ', () => {
    const config = {
      to: 'test',
      from: 'test',
      contentType: 'test',
      content: 'test'
    };
    expect(client.send(config)).to.be.a('Promise');
  });
});
