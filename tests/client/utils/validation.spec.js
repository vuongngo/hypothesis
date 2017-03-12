import {
  checkEmail
} from 'utils/validation';

describe('(Check Module) Utils', () => {
  describe('checkEmail', () => {
    it('Should return false if email is invalid', () => {
      expect(checkEmail('test')).to.equal(false);
    });

    it('Should return false if email is not the right type', () => {
      expect(checkEmail(1)).to.equal(false);
    });

    it('should return true if email is valid', () => {
      expect(checkEmail('test@test.com')).to.equal(true);
    });
  });
});
