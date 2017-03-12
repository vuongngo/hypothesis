/* eslint no-useless-escape: "off" */
/*
  * Check if email is valid
  *
  * @param {email} string
  *
  */
export function checkEmail(email = '') {
  if (typeof email !== 'string') return false;
  const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}
