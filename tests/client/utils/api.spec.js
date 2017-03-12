import sinonStubPromise from 'sinon-stub-promise';
import sinon from 'sinon';
import {
  fetchPr,
  jsonConfig
} from 'utils/api';

sinonStubPromise(sinon);

describe('(API module) Utils', () => {
  describe('fetchPr', () => {
    let stubFetch;
    let stubPr;

    beforeEach(() => {
      stubPr = sinon.stub().returnsPromise().resolves({ message: 'test' });
      stubFetch = sinon.stub(window, 'fetch');
    });

    afterEach(() => {
      sinon.restore(window.fetch);
    });

    it('should throw error ', (done) => {
      stubFetch.returnsPromise().rejects('any error');
      fetchPr('/test', {})
        .catch(err => {
          expect(err).to.equal('any error');
          done();
        });
    });

    it('should also throw error if status >= 300', (done) => {
      stubFetch.returnsPromise().resolves({ status: 300, json: stubPr });
      fetchPr('/test', {})
        .catch(err => {
          expect(err.message).to.equal('test');
          done();
        });
    });

    it('should return json if status < 300', (done) => {
      stubFetch.returnsPromise().resolves({ status: 201, json: stubPr });
      fetchPr('/test', {}).then(json => {
        expect(json.message).to.equal('test');
        done();
      });
    });
  });

  describe('jsonConfig', () => {
    it('should return configuration with medthod', () => {
      const obj = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        mode: 'cors'
      };
      expect(jsonConfig('POST')).to.deep.equal(obj);
    });
  });
});
