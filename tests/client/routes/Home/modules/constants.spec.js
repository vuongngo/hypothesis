import {
  SET_EMAIL,
  SUBSCRIBE,
  EMAIL_SUCCESS,
  FIELD_ERRORS,
  GENERAL_ERROR
} from 'routes/Home/modules/constants';

describe('(Constants Module) Home', () => {
  it('Should set constants with string value ', () => {
    expect(SET_EMAIL).to.equal('email@SET_EMAIL');
    expect(SUBSCRIBE).to.equal('email@SUBSCRIBE');
    expect(EMAIL_SUCCESS).to.equal('email@EMAIL_SUCCESS');
    expect(FIELD_ERRORS).to.equal('email@FIELD_ERRORS');
    expect(GENERAL_ERROR).to.equal('email@GENERAL_ERROR');
  });
});
