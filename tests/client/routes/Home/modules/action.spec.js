import {
  setEmail,
  subscribe,
  emailSuccess,
  fieldErrors,
  generalError
} from 'routes/Home/modules/actions';

import {
  SET_EMAIL,
  SUBSCRIBE,
  EMAIL_SUCCESS,
  FIELD_ERRORS,
  GENERAL_ERROR
} from 'routes/Home/modules/constants';

describe('(Action Creator Module) Home', () => {
  it('Should return right type and payload from setEmail ', () => {
    expect(setEmail('email', 'test')).to.deep.equal({ type: SET_EMAIL, key: 'email', payload: 'test' });
  });

  it('Should return right type from subscribe ', () => {
    expect(subscribe()).to.deep.equal({ type: SUBSCRIBE });
  });

  it('Should return right type from emailSuccess', () => {
    expect(emailSuccess()).to.deep.equal({ type: EMAIL_SUCCESS });
  });

  it('should return right type and payload from fieldErrors ', () => {
    expect(fieldErrors([{}])).to.deep.equal({ type: FIELD_ERRORS, payload: [{}] });
  });

  it('should return right type and payload from generalError ', () => {
    const err = { message: 'test' };
    expect(generalError(err)).to.deep.equal({ type: GENERAL_ERROR, payload: err });
  });
});
