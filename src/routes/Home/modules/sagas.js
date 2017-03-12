import { takeEvery, put, call, select } from 'redux-saga/effects';
import { getValue, getData } from '../../../utils/fetch';
import { checkEmail } from '../../../utils/validation';
import { fetchPr, jsonConfig } from '../../../utils/api';
import { emailSuccess, fieldErrors, generalError } from './actions';
import { SUBSCRIBE } from './constants';

/*
  * Saga watch email subscribe
  */
export function* watchSubscribe() {
  yield takeEvery(SUBSCRIBE, emailSubscribe);
}

/*
  * get email from redux store
  */
export function getEmail(state) {
  const mail = getValue(state, ['mail'], {});
  const { errors, data } = getData(mail, ['email']);
  if (!checkEmail(data.email)) {
    errors.push({ fieldName: 'email', message: 'Invalid email.' });
  }
  return { errors, data };
}

/*
  * Export for testing
  * Subscribe for email
  * Validate email
  */
export function* emailSubscribe() {
  try {
    const { errors, data } = yield select(getEmail);
    if (errors.length > 0) {
      yield put(fieldErrors(errors));
    } else {
      const config = yield call(jsonConfig, 'POST');
      config.body = JSON.stringify(data);
      yield call(fetchPr, '/api/email', config);
      yield put(emailSuccess());
    }
  } catch (err) {
    yield put(generalError(err));
  }
}

export default [
  watchSubscribe
];
