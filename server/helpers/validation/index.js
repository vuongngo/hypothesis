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

/*
 * Check if email list is valid
 *
 * @param {email} string
 *
 */
export function checkMultipleEmails(str = '') {
  // Already have missing error
  if (typeof str !== 'string') return false;
  // Split emails by colon
  const emails = str.split(',').map(x => x.trim());
  for (let email of emails) {
    if (!checkEmail(email)) {
      return false;
    }
  }
  return true;
}

/*
 * Check string length
 *
 * @param {email} string
 *
 */
export function checkLength(str = '', min = 20) {
  // Already have missing error
  if (typeof str !== 'string') return false;
  if (str.length < min) return false;
  return true;
}

