import {
  SET_EMAIL,
  EMAIL_SUCCESS,
  FIELD_ERRORS,
  GENERAL_ERROR
} from './constants';

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [SET_EMAIL]    : (state, action) => Object.assign({}, state, { [action.key]: action.payload, errors: [], generalError: {} }),
  [EMAIL_SUCCESS]: (state, action) => Object.assign({}, state, { success: true }),
  [FIELD_ERRORS] : setStore('errors'),
  [GENERAL_ERROR] : setStore('generalError')
};

/*
  * Helper function
  *
  * @param {field} string Reducer field
  *
  */
function setStore(field) {
  return (state, action) => Object.assign({}, state, { [field]: action.payload });
}
// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  email: '',
  errors: [],
  generalError: {}
};

export default function emailReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
}
