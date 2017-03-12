/* eslint no-undef: "off" */
import MailTransport from '../index';
import SendgridTransport from '../sendgrid';
import MailgunTransport from '../mailgun';
import { expect } from 'chai';
import sinonStubPromise from 'sinon-stub-promise';
import sinon from 'sinon';

sinonStubPromise(sinon);

describe('Server test (Mail module -> mail) Helpers', () => {
  let client;
  const setting = {
    sendgrid: {
      endpoint: 'sendgrid',
      apiKey: 'sendgrid',
      defaultFrom: 'sendgrid'
    },
    mailgun: {
      endpoint: 'mailgun',
      apiKey: 'mailgun',
      defaultFrom: 'mailgun'
    }
  };

  beforeEach(() => {
    client = new MailTransport(setting);
  });

  afterEach(() => {
    sinon.restore(client.sendgrid.send);
    sinon.restore(client.mailgun.send);
  });

  it('should initialize concrete class with setting', () => {
    expect(client.sendgrid).to.be.an.instanceOf(SendgridTransport);
    expect(client.mailgun).to.be.an.instanceOf(MailgunTransport);
  });

  it('should send with sendgrid ', (done) => {
    sinon
      .stub(client.sendgrid, 'send')
      .returnsPromise()
      .resolves({ response: { statusCode: 202 } });

    client.send()
      .then(res => {
        expect(res).to.equal('Email successfully sent');
        done();
      });
  });

  it('should send with mailgun if sendgrid return status !== 202', (done) => {
    sinon
      .stub(client.sendgrid, 'send')
      .returnsPromise()
      .resolves({ response: { statusCode: 203 } });

    sinon
      .stub(client.mailgun, 'send')
      .returnsPromise()
      .resolves({ response: { statusCode: 204 }, body: { message: 'Pass' } });

    client.send()
      .then(res => {
        expect(res).to.equal('Pass');
        done();
      });
  });

  it('should send with mailgun if sendgrid has error', (done) => {
    sinon
      .stub(client.sendgrid, 'send')
      .returnsPromise()
      .rejects({ message: 'Fail' });

    sinon
      .stub(client.mailgun, 'send')
      .returnsPromise()
      .resolves({ response: { statusCode: 204 }, body: { message: 'Pass' } });

    client.send()
      .then(res => {
        expect(res).to.equal('Pass');
        done();
      });
  });

  it('should throw error if mailgun fallback return 400', (done) => {
    sinon
      .stub(client.sendgrid, 'send')
      .returnsPromise()
      .rejects({ message: 'Fail' });

    sinon
      .stub(client.mailgun, 'send')
      .returnsPromise()
      .resolves({ response: { statusCode: 400 }, body: { message: 'Fail' } });

    client.send()
      .catch(err => {
        expect(err.message).to.equal('Fail');
        done();
      });
  });

  it('should throw error if could not sent with both sendgrid and mailgun', (done) => {
    sinon
      .stub(client.sendgrid, 'send')
      .returnsPromise()
      .rejects({ message: 'Fail' });

    sinon
      .stub(client.mailgun, 'send')
      .returnsPromise()
      .rejects({ message: 'Fail' });

    client.send()
      .catch(err => {
        expect(err.message).to.equal('Fail');
        done();
      });
  });
});
