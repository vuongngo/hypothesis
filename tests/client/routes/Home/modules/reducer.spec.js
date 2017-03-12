import emailReducer from 'routes/Home/modules/reducer';

import {
  SET_EMAIL,
  EMAIL_SUCCESS,
  FIELD_ERRORS,
  GENERAL_ERROR
} from 'routes/Home/modules/constants';

describe('(Reducer Module) Home', () => {
  it('should return initial state ', () => {
    const obj = emailReducer(undefined, {});
    expect(obj).to.deep.equal({ email: '', errors: [], generalError: {} });
  });

  it('should return state with new email ', () => {
    const action = { type: SET_EMAIL, payload: 'test' };
    const obj = emailReducer(undefined, action);
    expect(obj).to.deep.equal({ email: 'test', errors: [], generalError: {} });
  });

  it('should return state with new email and remove errors ', () => {
    const action = { type: SET_EMAIL, payload: 'test' };
    const state = { email: 'a', errors: [{}], generalError: { message: 'test' } };
    const obj = emailReducer(state, action);
    expect(obj).to.deep.equal({ email: 'test', errors: [], generalError: {} });
  });

  it('should return state with success set to true ', () => {
    const action = { type: EMAIL_SUCCESS };
    const obj = emailReducer(undefined, action);
    expect(obj).to.have.property('success', true);
  });

  it('should return state with new errors', () => {
    const action = { type: FIELD_ERRORS, payload: [{ fieldName: 'test', message: 'test' }] };
    const obj = emailReducer(undefined, action);
    expect(obj).to.deep.equal({ email: '', errors: action.payload, generalError: {} });
  });

  it('should return state with general error ', () => {
    const action = { type: GENERAL_ERROR, payload: { message: 'test' } };
    const obj = emailReducer(undefined, action);
    expect(obj).to.deep.equal({ email: '', errors: [], generalError: { message: 'test' } });
  });
});
