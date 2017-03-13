import { takeEvery, put, call, select } from 'redux-saga/effects';
import { getValue, getData } from '../../../utils/fetch';
import { checkEmail, checkLength } from '../../../utils/validation';
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
  let { errors, data } = getData(mail, ['from', 'to', 'subject', 'body']);
  errors = checkSingleMail(data.from, 'from', errors);
  errors = checkMultipleMails(data.to, 'to', errors);
  errors = checkString(data.subject, 'subject', 10, 50, errors);
  errors = checkString(data.body, 'body', 15, 120, errors);
  if (mail.cc) {
    data.cc = mail.cc;
    errors = checkMultipleMails(data.cc, 'cc', errors);
  }
  if (mail.bcc) {
    data.bcc = mail.bcc;
    errors = checkMultipleMails(data.bcc, 'bcc', errors);
  }
  return { errors, data };
}

// Private error checks
function checkSingleMail(str, key, errors) {
  if (!checkEmail(str)) {
    errors.push({ fieldName: key, message: 'Invalid email.' });
  }
  return errors;
}

function checkMultipleMails(str, key, errors) {
  // Already have missing error
  if (typeof str !== 'string') return errors;
  // Split emails by colon
  const emails = str.split(',').map(x => x.trim());
  for (let email of emails) {
    if (!checkEmail(email)) {
      errors.push({ fieldName: key, message: 'Invalid email.' });
      return errors;
    }
  }
  return errors;
}

function checkString(str, key, min, max, errors) {
  if (!checkLength(str, min, max)) {
    errors.push({ fieldName: key, message: `${key.formalize()} should be between ${min} and ${max} characters.` });
  }
  return errors;
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
