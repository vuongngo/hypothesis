import {
  getValue,
  getData,
  getError
} from 'utils/fetch';

describe('(Fetch helper) Utils', () => {
  describe('getValue ', () => {
    const mock = { a: 1, b: { c: 2 } };
    it('Should return default value', () => {
      expect(getValue(mock, ['a', 'c'], 'test')).to.equal('test');
    });

    it('should return nested value ', () => {
      expect(getValue(mock, ['b', 'c'])).to.equal(2);
    });
  });

  describe('getData ', () => {
    const mock = { a: 1, b: 2 };
    it('should return errors finding non existing field ', () => {
      const err = { fieldName: 'wierdField', message: 'Wierd Field is required.' };
      expect(getData(mock, ['wierdField', 'a'])).to.deep.equal({ errors: [err], data: { a: 1 } });
    });

    it('should return data with no error ', () => {
      expect(getData(mock, ['b'])).to.deep.equal({ errors: [], data: { b: 2 } });
    });
  });

  describe('getError ', () => {
    it('should return null if no error match', () => {
      expect(getError(undefined, 'test')).to.equal(null);
    });

    it('should return error message if match', () => {
      const err = [{ fieldName: 'test', message: 'Is required' }];
      expect(getError(err, 'test')).to.equal('Is required');
    });
  });
});
