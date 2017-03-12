import {
  SET_EMAIL,
  SUBSCRIBE,
  EMAIL_SUCCESS,
  FIELD_ERRORS,
  GENERAL_ERROR
} from './constants';
// ------------------------------------
// Actions
// ------------------------------------

/*
  * Set email in redux store
  *
  * @param {value} string Email
  *
  */
export function setEmail (value = '') {
  return {
    type    : SET_EMAIL,
    payload : value
  };
}

/**
  * Dispatch subscribe action listen by saga
  */
export function subscribe() {
  return {
    type: SUBSCRIBE
  };
};

/**
 * Dispatch emailSuccess action when API return 202
 */
export function emailSuccess() {
  return {
    type: EMAIL_SUCCESS
  };
};

/**
  * Dispatch client error (for field error message)
  *
  * @param {errors} array Error list with {fieldName, message}
  *
  */
export function fieldErrors (errors = []) {
  return {
    type: FIELD_ERRORS,
    payload: errors
  };
}

/**
 * Dispatch server error (general error message)
 *
 * @param {error} object Error catched by throw-catch
 *
 */
export function generalError (error = {}) {
  return {
    type: GENERAL_ERROR,
    payload: error
  };
}

