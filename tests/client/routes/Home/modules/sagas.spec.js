import { takeEvery, put, call, select } from 'redux-saga/effects';
import {
  watchSubscribe,
  getEmail,
  emailSubscribe
} from 'routes/Home/modules/sagas';
import { SUBSCRIBE } from 'routes/Home/modules/constants';
import {
  fieldErrors,
  emailSuccess
} from 'routes/Home/modules/actions';
import { fetchPr, jsonConfig } from 'utils/api';

describe('(Sagas Module) Home', () => {
  describe('watchSubscribe ', () => {
    const gen = watchSubscribe();

    it('should watch every SUBSCRIBE ', () => {
      expect(gen.next().value).to.deep.equal(takeEvery(SUBSCRIBE, emailSubscribe));
    });
  });

  describe('getEmail ', () => {
    it('should return error if email is missing from state ', () => {
      const state = { mail: { email: '' } };
      const err = [{
        fieldName: 'email',
        message: 'Email is required.'
      }, {
        fieldName: 'email',
        message: 'Invalid email.'
      }];
      expect(getEmail(state)).to.deep.equal({ errors: err, data: {} });
    });

    it('should return error if email is not valid ', () => {
      const state = { mail: { email: 'test' } };
      const err = [{ fieldName: 'email', message: 'Invalid email.' }];
      expect(getEmail(state)).to.deep.equal({ errors: err, data: { email: 'test' } });
    });

    it('should return empty error and data with email ', () => {
      const state = { mail: { email: 'test@gmail.com' } };
      const err = [];
      expect(getEmail(state)).to.deep.equal({ errors: err, data: { email: 'test@gmail.com' } });
    });
  });

  describe('emailSubscribe ', () => {
    describe('with error ', () => {
      const gen = emailSubscribe();
      it('should getEmail from state ', () => {
        expect(gen.next().value).to.deep.equal(select(getEmail));
      });

      it('should dispatch action to update store with errors ', () => {
        const err = [{ message: 'test' }];
        expect(gen.next({ errors: err, data: {} }).value).to.deep.equal(put(fieldErrors(err)));
      });
    });

    describe('with error ', () => {
      const gen = emailSubscribe();
      it('should getEmail from state ', () => {
        expect(gen.next().value).to.deep.equal(select(getEmail));
      });

      it('should set header configuration ', () => {
        const obj = { errors: [], data: { email: 'test@gmail.com' } };
        expect(gen.next(obj).value).to.deep.equal(call(jsonConfig, 'POST'));
      });

      it('should set call api to send email ', () => {
        const obj = {};
        expect(gen.next(obj).value)
          .to.deep.equal(call(fetchPr, '/api/email', { body: JSON.stringify({ email: 'test@gmail.com' }) }));
      });

      it('should dispatch action to update redux with success ', () => {
        expect(gen.next().value)
          .to.deep.equal(put(emailSuccess()));
      });
    });
  });
});
